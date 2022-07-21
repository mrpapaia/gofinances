import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Container, Text } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

export const Button = ({ text, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container {...rest}>
      <Text>{text}</Text>
    </Container>
  );
};
