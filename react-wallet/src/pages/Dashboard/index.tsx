/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content } from "./styles";

import listOfMonths from "../../utils/months";
import axios from "axios";
import WalletBox from "../../components/WalletBox";
import { v4 as uuidv4 } from "uuid";
import MessageBox from "../../components/MessageBox";
import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import opsImg from "../../assets/ops.svg";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarCharBox from "../../components/BarCharBox";

interface IRequestData {
  description: string;
  amount: string;
  type: string;
  frequency: string;
  date: string;
}

// FC => Function Component
const Dashboard: React.FC = () => {
  const date = new Date();
  const actuallyMonth = date.getMonth() + 1;
  const actuallyYear = date.getFullYear();

  const [monthSelected, setMonthSelected] = useState<number>(actuallyMonth);
  const [yearSelected, setYearSelected] = useState<number>(actuallyYear);
  const [listData, setListData] = useState<IRequestData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2500/react-wallet/all"
        );
        setListData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const years = useMemo(() => {
    let uniqueYear: number[] = [];

    listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYear.includes(year)) {
        uniqueYear.push(year);
      }
    });

    return uniqueYear.map((year) => ({
      label: year,
      value: year,
    }));
  }, [listData]);

  const months = useMemo(() => {
    const months = listOfMonths.map((month, index) => {
      return {
        label: month,
        value: index + 1,
      };
    });

    return months;
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;
    let lastTransactionDate: Date | null = null;

    listData.forEach((item) => {
      if (item.type === "saída") {
        const date = new Date(item.date);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if (month === monthSelected && year === yearSelected) {
          total += Number(item.amount);
        }
      }
    });

    return {
      total,
      lastTransactionDate,
    };
  }, [listData, monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    listData.forEach((item) => {
      if (item.type === "entrada") {
        const date = new Date(item.date);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if (month === monthSelected && year === yearSelected) {
          total += Number(item.amount);
        }
      }
    });

    return {
      total,
    };
  }, [listData, monthSelected, yearSelected]);

  const balance = useMemo(() => {
    return Number(totalGains.total - totalExpenses.total);
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (balance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    }

    if (totalExpenses.total === 0 && totalGains.total === 0) {
      return {
        title: "Ops!",
        description: "Neste mês, não há registros de entradas ou saídas!",
        footerText:
          "Parece que você não fez nenhum registro no mês selecionado",
        icon: opsImg,
      };
    }

    if (balance === 0) {
      return {
        title: "Ufa!",
        description: "Neste mês, você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    }

    return {
      title: "Muito bem!",
      description: "Sua carteira está positiva!",
      footerText: "Continue assim. Considere investir seu saldo",
      icon: happyImg,
    };
  }, [balance, totalExpenses.total, totalGains.total]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains.total + totalExpenses.total;

    const gainsPercent = Number(((totalGains.total / total) * 100).toFixed(1));
    const expensesPercent = Number(
      ((totalExpenses.total / total) * 100).toFixed(1)
    );

    const data = [
      {
        name: "Entradas",
        value: totalGains.total,
        percent: gainsPercent ? gainsPercent : 0,
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses.total,
        percent: expensesPercent ? gainsPercent : 0,
        color: "#E44C4E",
      },
    ];
    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    const history = listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        let amountOutput = 0;

        listData.forEach((item) => {
          if (item.type === "entrada") {
            const date = new Date(item.date);
            const gainMonth = date.getMonth();

            const gainYear = date.getFullYear();

            if (gainMonth === month && gainYear === yearSelected) {
              amountEntry += Number(item.amount);
            }
          }
        });

        listData.forEach((item) => {
          if (item.type === "saída") {
            const date = new Date(item.date);
            const expenseMonth = date.getMonth();

            const expenseYear = date.getFullYear();

            if (expenseMonth === month && expenseYear === yearSelected) {
              amountOutput += Number(item.amount);
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substring(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const filteredMonths =
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear;

        return filteredMonths;
      });

    return history;
  }, [listData, yearSelected]);

  const relationExpensivesRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    listData
      .filter((item) => {
        if (item.type === "saída") {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;

          return month === monthSelected && year === yearSelected;
        }
      })
      .forEach((item) => {
        if (item.frequency === "recorrente") {
          return (amountRecurrent += Number(item.amount));
        }

        if (item.frequency === "eventual") {
          return (amountEventual += Number(item.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );

    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E",
      },
    ];
  }, [listData, monthSelected, yearSelected]);

  const relationGainsRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    listData
      .filter((item) => {
        if (item.type === "entrada") {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;

          return month === monthSelected && year === yearSelected;
        }
      })
      .forEach((item) => {
        if (item.frequency === "recorrente") {
          return (amountRecurrent += Number(item.amount));
        }

        if (item.frequency === "eventual") {
          return (amountEventual += Number(item.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );

    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E",
      },
    ];
  }, [listData, monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error(
        "Invalid month value. The type difference the required month type"
      );
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error(
        "Invalid year value. The type difference the required year type"
      );
    }
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" linecolor="#F7931B">
        <SelectInput
          options={months}
          onChange={(event) => handleMonthSelected(event.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(event) => handleYearSelected(event.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          key={uuidv4()}
          title="saldo"
          amount={balance}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox
          key={uuidv4()}
          title="entradas"
          amount={totalGains.total}
          footerlabel="última movimentação em 18/07/2020 às 11h40"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox
          key={uuidv4()}
          title="saídas"
          amount={totalExpenses.total}
          footerlabel="última movimentação em 18/07/2020 às 11h40"
          icon="arrowDown"
          color="#E44C4E"
        />
        <MessageBox
          key={uuidv4()}
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox key={uuidv4()} data={relationExpensesVersusGains} />

        <HistoryBox
          key={uuidv4()}
          data={historyData}
          lineColorAmountOutput="#E44C4E"
          lineColorAmoutEntry="#F7931B"
        />

        <BarCharBox
          key={uuidv4()}
          data={relationExpensivesRecurrentVsEventual}
          title="Saídas"
        />

        <BarCharBox
          key={uuidv4()}
          data={relationGainsRecurrentVsEventual}
          title="Entradas"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
