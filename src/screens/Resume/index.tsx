import React, { useCallback, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { VictoryPie } from "victory-native";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";

import {
  ChartContainer,
  Container,
  Content,
  MonthSelect,
  MonthSelectButtom,
  MonthSelectIcon,
  Month,
  style,
} from "./styles";

import { categories } from "../../utils/categories";

interface TransactionData {
  name: string;
  amount: string;
  category: string;
  type: "up" | "down";
  date: string;
}

interface ExpensiveProps {
  categoryKey: string;
  amount: string;
  total: number;
  percent?: string;
}

export const Resume = (): JSX.Element => {
  const collectionKey = "@gofinance:transactions";
  const { getItem } = useAsyncStorage(collectionKey);
  const [expensiveResumeList, setExpensiveResumeList] = useState<
    ExpensiveProps[]
  >([] as ExpensiveProps[]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleActionPrev = () => {
    const newDate = subMonths(selectedDate, 1);

    setSelectedDate(newDate);
  };
  const handleActionNext = () => {
    const newDate = addMonths(selectedDate, 1);

    setSelectedDate(newDate);
  };

  const handleChangeDate = (action: "next" | "prev") => {
    setExpensiveResumeList([]);
    if (action === "next") {
      handleActionNext();
    } else {
      handleActionPrev();
    }
  };

  const getTotalExpensives = (list: ExpensiveProps[]) => {
    return list.reduce((total, expensive) => total + expensive.total, 0);
  };

  const getPercentageByCategory = (value: number, total: number) => {
    return `${((value / total) * 100).toFixed(1)}`;
  };

  const getExpensiveResume = async (expensives: TransactionData[]) => {
    const tempList: ExpensiveProps[] = [];
    categories.forEach((category) => {
      const expensivesByCategory = expensives.filter(
        (expensive) => expensive.category === category.key
      );

      const sumExpensivesByCategory = expensivesByCategory.reduce(
        (previousValue, currentTransaction) => {
          return Number(previousValue) + Number(currentTransaction.amount);
        },
        0
      );

      sumExpensivesByCategory > 0 &&
        tempList.push({
          categoryKey: category.key,
          amount: sumExpensivesByCategory.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          total: sumExpensivesByCategory,
        });
    });

    let total = getTotalExpensives(tempList);

    tempList.forEach(
      (item) => (item.percent = getPercentageByCategory(item.total, total))
    );

    setExpensiveResumeList(tempList);
    setLoading(false);
  };

  const loadTransactions = async () => {
    setLoading(true);

    const response = await getItem();
    const transactions = response ? JSON.parse(response) : [];

    const expensives: TransactionData[] = transactions.filter(
      (expensive: TransactionData) =>
        expensive.type === "down" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );
    setExpensiveResumeList(expensiveResumeList);

    await getExpensiveResume(expensives);
  };

  const getColors = () => {
    return expensiveResumeList.map(
      (expensive) =>
        categories.filter(
          (category) => category.key === expensive.categoryKey
        )[0].color
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header title="Resumo por categoria"></Header>

      <Content
        scrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButtom onPress={() => handleChangeDate("prev")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButtom>
          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>
          <MonthSelectButtom onPress={() => handleChangeDate("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButtom>
        </MonthSelect>

        {loading ? (
          <Loading />
        ) : (
          <>
            <ChartContainer>
              <VictoryPie
                data={expensiveResumeList}
                style={style.chart}
                labelRadius={50}
                x={"percent"}
                y={"total"}
                colorScale={getColors()}
              />
            </ChartContainer>
            {expensiveResumeList.map((item) => (
              <HistoryCard key={item.categoryKey} data={item}></HistoryCard>
            ))}
          </>
        )}
      </Content>
    </Container>
  );
};
