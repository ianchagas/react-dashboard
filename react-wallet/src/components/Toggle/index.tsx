import React from "react";
import { Container, ToggleLabel, SwitchSelector } from "./styles";

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
  labelLeft,
  labelRight,
  checked,
  onChange,
}) => {
  return (
    <Container>
      <ToggleLabel>{labelLeft}</ToggleLabel>
      <SwitchSelector
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
      />
      <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
  );
};

export default Toggle;
