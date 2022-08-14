import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";


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
  signInWithGoogle():Promise<AuthSession.AuthSessionResult>;
  signInWithApple():Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

WebBrowser.maybeCompleteAuthSession();
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);

  //Bloco singIn Google ->
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

  const signInWithGoogle=()=>promptAsync();

  const getGoogleUser = async (accessToken: string) => {
    try{ 
        const response = await fetchUserInfo(accessToken)
          response.json().then(async (data)=>{
            const userLogged={id:String(data.id),email:data.email,name:data.name,photo:data.picture}

            setUser(userLogged)      
            await AsyncStorage.setItem('@gofinances:user',JSON.stringify(userLogged))     
        });      
      }
      catch(error){
        console.log('GoogleUserReq error: ', error);
        throw new Error(error);
      }
  }
  const  fetchUserInfo = async (token:string) =>{
   
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { 
      headers: {
        Authorization: `Bearer ${token}`,        
      },
    });
   
  
    return await response;
  }
  //<- Bloco singIn Google

  const signInWithApple = async ()=>{
    try {
      const credential= await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME]
      })

      if(credential){
        const userLogged={id:String(credential.user), email:credential.email!, name:credential.fullName?.givenName!, photo:undefined}

        setUser(userLogged)    
        await AsyncStorage.setItem('@gofinances:user',JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }



  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
