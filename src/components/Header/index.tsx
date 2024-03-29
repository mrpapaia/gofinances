import React from "react";

import { Container, Title } from "./styles";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};
