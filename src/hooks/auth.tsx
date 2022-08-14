import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { Use } from "react-native-svg";


interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface IAuthContextData {
  user: User;
  promptAsync():Promise<AuthSession.AuthSessionResult>;
}

const AuthContext = createContext({} as IAuthContextData);
WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser]=useState({} as User);

  const [request, response, promptAsync,] = Google.useAuthRequest({
    expoClientId:'993146365994-kajq7gsb1mk5mgl75gr489p44qfsufij.apps.googleusercontent.com',
    iosClientId:"993146365994-g4os9vpoleaidlkgaecpcbsl1ht9mfbk.apps.googleusercontent.com",
    androidClientId:'993146365994-0f77voqtsvia8g23tjjou57il6lm6nvt.apps.googleusercontent.com',   
    scopes:['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  });

  useEffect(() => {    
    if (response?.type === 'success') {
      const { authentication } = response;   
      getGoogleUser(authentication!.accessToken)
    }
  }, [response]);

  const getGoogleUser = async (accessToken: string) => {
    try{ 
          const response = await fetchUserInfo(accessToken)
          response.json().then((data)=>{
            setUser({id:data.id,email:data.email,name:data.name,photo:data.picture})           
          });      
      }
      catch(error){
          console.log('GoogleUserReq error: ', error);
      }
  }
  async function fetchUserInfo(token:string) {
   
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { 
      headers: {
        Authorization: `Bearer ${token}`,        
      },
    });
   
  
    return await response;
  }

  return (
    <AuthContext.Provider value={{ user, promptAsync}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
