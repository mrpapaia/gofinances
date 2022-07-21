import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View``;

export const Content = styled.ScrollView`
  margin-bottom: ${RFValue(110)}px;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: ${RFValue(24)}px;
`;

export const MonthSelectButtom = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.black};
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const style = StyleSheet.create({
  chart: {
    labels: {
      fontSize: RFValue(18),
      fontWight: "bold",
      fill: "#ffff",
    },
  },
});
