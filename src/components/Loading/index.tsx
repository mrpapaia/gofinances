import React from "react";
import { ActivityIndicator } from "react-native";
import { LoadContainer } from "./styles";
import { useTheme } from "styled-components/native";
export const Loading = (): JSX.Element => {
  const theme = useTheme();
  return (
    <LoadContainer>
      <ActivityIndicator color={theme.colors.primary} size={"large"} />
    </LoadContainer>
  );
};
