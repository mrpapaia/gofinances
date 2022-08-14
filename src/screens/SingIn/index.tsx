import React, { useContext } from "react";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SingInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import AppleSvg from "../../assets/apple-icon.svg";
import GoogleSvg from "../../assets/google-icon.svg";
import LogoSvg from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";
import { SocialButtonSingIn } from "../../components/SocialButtonSingIn";
import { useAuth } from "../../hooks/auth";
import { Alert, Platform } from "react-native";

export const SingIn = (): JSX.Element => {
  const { user, signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async ()=>{
    
    try{
     await  signInWithGoogle()
   
    }catch(error){
      console.log(error);
      Alert.alert('Não foi possível conectar com a conta Google')
    }
  }
  const handleSignInWithApple = async ()=>{
    try {
      await  signInWithApple()
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar com a conta Apple')
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SingInTitle>
          Faça seu login com{"\n"}
          uma das contas abaixo
        </SingInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SocialButtonSingIn text={"Entrar com Google"} svg={GoogleSvg}  onPress={handleSignInWithGoogle}/>

          {Platform.OS==='ios' && <SocialButtonSingIn text={"Entrar com Apple"} svg={AppleSvg} onPress={handleSignInWithApple}/>}
         
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
