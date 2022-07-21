import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";

import { Header } from "../../components/Header";

import { categories } from "../../utils/categories";

import { Container, Category, Icon, Name, Separator, Footer } from "./styles";

interface Category {
  key: string;
  name: string;
  icon?: string;
  color?: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: Props): JSX.Element => {
  const handleCatecorySelect = (category: Category) => {
    setCategory(category);
  };

  const renderItem = ({ item }) => {
    return (
      <Category
        isActive={category.key === item.key}
        onPress={() => handleCatecorySelect(item)}
      >
        <Icon name={item.icon} />
        <Name>{item.name}</Name>
      </Category>
    );
  };

  return (
    <Container>
      <Header title={"Categoria"}></Header>

      <FlatList
        keyExtractor={(item) => item.key}
        data={categories}
        style={{ flex: 1, width: "100%" }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button text={"Selecionar"} onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};
