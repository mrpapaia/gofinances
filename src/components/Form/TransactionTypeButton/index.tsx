import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Text, Icon, Button } from "./styles";

interface Props extends RectButtonProps {
  text: string;
  type: "up" | "down";
  isSelected: boolean;
}

const icons = { up: "arrow-up-circle", down: "arrow-down-circle" };
export const TransactionTypeButton = ({
  text,
  type,
  isSelected,
  ...rest
}: Props): JSX.Element => {
  return (
    <Button {...rest}>
      <Container type={type} isSelected={isSelected} {...rest}>
        <Icon name={icons[type]} type={type} />
        <Text>{text}</Text>
      </Container>
    </Button>
  );
};
