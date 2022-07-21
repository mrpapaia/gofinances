import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface Props {
  type: "up" | "down";
  isSelected: boolean;
}

export const Container = styled(View)<Props>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: ${({ isSelected }) => (isSelected ? 0 : 1.5)}px solid
    ${({ theme }) => theme.colors.text};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(16)}px ${RFValue(35)}px;

  ${({ theme, isSelected, type }) =>
    isSelected &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `};

  ${({ theme, isSelected, type }) =>
    isSelected &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)<Props>``;

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(22)}px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
  margin-right: ${RFValue(12)}px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
