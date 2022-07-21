import React from "react";

import { TouchableOpacityProps } from "react-native";
import { Container, Category, Icon } from "./styles";

interface Props extends TouchableOpacityProps {
  placeHolder: string;
}

export const CategorySelectButton = ({
  placeHolder,
  ...rest
}: Props): JSX.Element => {
  return (
    <Container {...rest}>
      <Category>{placeHolder}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
