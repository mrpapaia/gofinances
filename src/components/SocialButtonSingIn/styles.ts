import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
  flex-direction: row;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: ${RFValue(15)}px;

  border-radius: ${RFValue(5)}px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const verticalSeparator = styled.View``;

export const TextButton = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
