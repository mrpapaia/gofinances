import React, { useCallback, useEffect, useState } from "react";

import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  UserInfo,
  UserPhoto,
  User,
  UserGreeting,
  UserName,
  UserContainer,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";
import { Loading } from "../../components/Loading";

export interface TransactionProps extends TransactionCardProps {
  id: string;
}

interface HighLightAmount {
  amount: string;
  dateInfo: string;
}

interface HighLightData {
  entries: HighLightAmount;
  expensive: HighLightAmount;
  total: HighLightAmount;
}

export const Dashboard = (): JSX.Element => {
  const collectionKey = "@gofinance:transactions";
  const theme = useTheme();
  const { getItem } = useAsyncStorage(collectionKey);
  const [loading, setLoading] = useState(true);
  const [transactionsList, setSetTransactionsList] =
    useState<TransactionProps[]>();
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );
  const isFocused = useIsFocused();
  let entriesTotal = 0;
  let expensiveTotal = 0;

  const renderItem = ({ item }) => {
    return <TransactionCard data={item} />;
  };

  const sumEntries = (value: number) => {
    entriesTotal += value;
  };

  const sumExpensive = (value: number) => {
    expensiveTotal += value;
  };

  const setHighLithCardData = () => {
    const total = entriesTotal - expensiveTotal;
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        dateInfo: `Última entrada ${getLastDateTransaction("up")}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        dateInfo: `Última entrada ${getLastDateTransaction("down")}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        dateInfo: `01 à  ${Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        }).format(new Date())}`,
      },
    });
  };

  const formattedTransaction = (transaction: TransactionProps) => {
    if (transaction.type === "up") {
      sumEntries(Number(transaction.amount));
    } else {
      sumExpensive(Number(transaction.amount));
    }

    const amount = Number(transaction.amount).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const date = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(transaction.date));

    return {
      id: transaction.id,
      name: transaction.name,
      type: transaction.type,
      category: transaction.category,
      amount,
      date,
    };
  };

  const getLastDateTransaction = (filterParam: string) => {
    const date = transactionsList!
      .filter(
        (trasanction: TransactionProps) => trasanction.type === filterParam
      )
      .slice()
      .reverse()[0].date;
    const [day, month, year] = date.split("/");

    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    }).format(new Date(month + "/" + day + "/" + year));
  };

  const loadTransactions = async () => {
    entriesTotal = 0;
    expensiveTotal = 0;
    const response = await getItem();
    const transactions = response ? JSON.parse(response) : [];

    const dataList: TransactionProps[] = transactions.map(
      (transaction: TransactionProps) => formattedTransaction(transaction)
    );

    setSetTransactionsList(dataList);
    setHighLithCardData();
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [transactionsList === undefined])
  );

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <UserPhoto
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/43225982?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Diogo</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>
          <HighlightCards>
            <HighlightCard
              title={"Entradas"}
              type={"up"}
              ammount={highLightData.entries.amount}
              lastTrasnsaction={highLightData.entries.dateInfo}
            />
            <HighlightCard
              title={"Saídas"}
              type={"down"}
              ammount={highLightData.expensive.amount}
              lastTrasnsaction={highLightData.expensive.dateInfo}
            />
            <HighlightCard
              title={"Total"}
              type={"total"}
              ammount={highLightData.total.amount}
              lastTrasnsaction={highLightData.total.dateInfo}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              keyExtractior={(item) => item.id}
              data={transactionsList?.slice().reverse()}
              renderItem={renderItem}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
