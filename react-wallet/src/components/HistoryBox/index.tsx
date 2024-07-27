import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import {
  Container,
  ChartContainer,
  Header,
  LegendContainer,
  Legend,
} from "./styles";

import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmoutEntry: string;
  lineColorAmountOutput: string;
}

const Content: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmoutEntry,
  lineColorAmountOutput,
}) => (
  <Container>
    <Header>
      <h2>Histórico de saldo</h2>
      <LegendContainer>
        <Legend color={lineColorAmoutEntry}>
          <div>{}</div>
          <span>Entradas</span>
        </Legend>
        <Legend color={lineColorAmountOutput}>
          <div>{}</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </Header>
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" />
          <XAxis dataKey="month" stroke="#CECECE" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Line
            type="monotone"
            dataKey="amountEntry"
            name="Entradas"
            stroke={lineColorAmoutEntry}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="amountOutput"
            name="Saídas"
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default Content;
