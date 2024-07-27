import React, { useEffect, useMemo, useState } from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import { v4 as uuidv4 } from "uuid";
import listOfMonths from "../../utils/months";
// FC => Function Component

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  type: string;
  dateFormatted: string;
  tagColor: string;
}

interface IRequestData {
  description: string;
  amount: string;
  type: string;
  frequency: string;
  date: string;
}

const List: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const balanceType = type;

  const date = new Date();
  const actuallyMonth = date.getMonth() + 1;
  const actuallyYear = date.getFullYear();

  const [monthSelected, setMonthSelected] = useState<number>(actuallyMonth);
  const [yearSelected, setYearSelected] = useState<number>(actuallyYear);
  const [listData, setListData] = useState<IRequestData[]>([]);
  const [filteredListData, setFilteredListdata] = useState<IData[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (balanceType === "entry-balance") {
          response = await axios.get(
            "http://localhost:2500/react-wallet/gains"
          );
        } else {
          response = await axios.get(
            "http://localhost:2500/react-wallet/expenses"
          );
        }

        setListData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [balanceType]);

  useEffect(() => {
    const filteredData = listData.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const res: IData[] = filteredData.map<IData>((item) => ({
      id: uuidv4(),
      description: item.description,
      amountFormatted: formatCurrency(parseFloat(item.amount)),
      frequency: item.frequency,
      type: item.type,
      dateFormatted: formatDate(item.date),
      tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
    }));

    setFilteredListdata(res);
  }, [listData, monthSelected, yearSelected, selectedFrequency]);

  const operation = useMemo(() => {
    if (type === "entry-balance") {
      return {
        title: "Entradas",
        linecolor: "#4E41F0",
      };
    }

    return {
      title: "Saídas",
      linecolor: "#E44C4E",
    };
  }, [type]);

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

  const handleFrequency = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error(
        "Invalid month value. The type difference the required month type"
      );
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error(
        "Invalid year value. The type difference the required year type"
      );
    }
  };

  return (
    <Container>
      <ContentHeader title={operation.title} linecolor={operation.linecolor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            selectedFrequency.includes("recorrente") && "tag-actived"
          }`}
          onClick={() => handleFrequency("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            selectedFrequency.includes("eventual") && "tag-actived"
          }`}
          onClick={() => handleFrequency("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {filteredListData.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
