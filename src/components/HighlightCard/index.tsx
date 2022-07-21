import React from "react";
import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Ammount,
  LastTransaction,
} from "./styles";

interface Props {
  title: string;
  ammount: string;
  lastTrasnsaction: string;
  type: "up" | "down" | "total";
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard = ({
  title,
  ammount,
  lastTrasnsaction,
  type,
}: Props): JSX.Element => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Ammount type={type}>{ammount}</Ammount>
        <LastTransaction type={type}>{lastTrasnsaction}</LastTransaction>
      </Footer>
    </Container>
  );
};
