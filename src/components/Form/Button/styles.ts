import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(18)}px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
