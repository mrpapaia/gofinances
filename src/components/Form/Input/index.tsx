import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

type Props = TextInputProps;

export const Input = ({ ...rest }: Props): JSX.Element => {
  return <Container {...rest}></Container>;
};
