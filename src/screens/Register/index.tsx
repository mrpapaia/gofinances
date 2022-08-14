import React, { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Container, ContainerForm, Fields, TransactionTypes } from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatorio"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O preço é obrigatorio"),
});

export const Register = (): JSX.Element => {
  const collectionKey = "@gofinances:transactions";
  const { getItem, setItem, removeItem } = useAsyncStorage(collectionKey);

  const [transactionType, setTrasactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTrasactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const clearForm = () => {
    setTrasactionType("");
    setCategory({ key: "category", name: "Categoria" });
    reset();
    navigation.navigate("Listagem");
  };

  const saveData = async (newTransaction: object) => {
    const data = await getItem();
    const currentData = data ? JSON.parse(data) : [];
    const dataFormatted = [...currentData, newTransaction];

    await setItem(JSON.stringify(dataFormatted));
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione uma categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };

    try {
      await saveData(newTransaction);
      clearForm();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  };

  const removeAll = async () => {
    await removeItem();
  };

  const loadData = async () => {
    const data = await getItem();
    console.log(data);
  };
  /*
  useEffect(() => {
    //loadData();
    removeAll();
  }, []);*/

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title={"Cadastro"}></Header>
        <ContainerForm>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder={"Nome"}
              autoCapitalize={"sentences"}
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder={"Preço"}
              keyboardType={"numeric"}
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                isSelected={transactionType === "up"}
                type={"up"}
                text={"Entrada"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                isSelected={transactionType === "down"}
                type={"down"}
                text={"Saída"}
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionTypes>

            <CategorySelectButton
              placeHolder={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button text={"Enviar"} onPress={handleSubmit(handleRegister)} />

          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
        </ContainerForm>
      </Container>
    </TouchableWithoutFeedback>
  );
};
