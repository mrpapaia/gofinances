import React from "react";
import { categories } from "../../utils/categories";
import { Amount, Container, Text } from "./styles";

interface DataProps {
  categoryKey: string;
  amount: string;
}

interface Props {
  data: DataProps;
}

export const HistoryCard = ({ data }: Props): JSX.Element => {
  const category = categories.filter(
    (item) => item.key === data.categoryKey
  )[0];
  return (
    <Container color={category.color}>
      <Text>{category.name}</Text>
      <Amount>{data.amount}</Amount>
    </Container>
  );
};
