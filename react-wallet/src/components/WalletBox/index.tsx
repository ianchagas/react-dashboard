/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Container } from "./styles";

import dollarImg from "../../assets/dollar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";
import CountUp from "react-countup";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerlabel: string;
  icon: "dollar" | "arrowUp" | "arrowDown";
  color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerlabel,
  icon,
  color,
}) => {
  const iconSelected = () => {
    switch (icon) {
      case "dollar":
        return dollarImg;
      case "arrowUp":
        return arrowUpImg;
      case "arrowDown":
        return arrowDownImg;
      default:
        return "";
    }
  };
  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp
          end={amount}
          separator="."
          decimal=","
          decimals={2}
          preserveValue={true}
          duration={2}
        />
      </h1>
      <small>{footerlabel}</small>
      <img src={iconSelected()} alt={title} />
    </Container>
  );
};

export default WalletBox;
