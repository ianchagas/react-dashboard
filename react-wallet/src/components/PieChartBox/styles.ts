import styled, { keyframes } from "styled-components";

interface ILegendProps {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translate(100px);
    opacity: 0;
  }

  50% {
    opacity: .3;
  }

  100% {
    transform: translate(0px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 49%;
  height: 260px;

  margin: 10px 0;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  border-radius: 7px;

  display: flex;

  animation: ${animate} 0.5s;

  @media (max-width: 770px) {
    display: flex;
    width: 100%;
  }
`;

export const SideLeft = styled.aside`
  padding: 50px 20px;

  > h2 {
    margin-bottom: 20px;
  }

  // por questão de gosto pessoal, vou comentar esse media
  // fica um espaçamento muito grande pra parte de baixo conforme a aula
  // sem esse trecho fica mais centralizado, mais visualmente agradável na minha opinião

  /* @media (max-width: 1345px) {
    padding: 0 15px 5px;
    margin-bottom: 7px;

    > h2 {
      margin-top: 15px;
      margin-bottom: 7px;
    }
  }

  @media (max-width: 420px) {
    padding: 15px;
    margin-bottom: 7px;
  } */
`;

export const LegendContainer = styled.ul`
  list-style: none;

  height: 160px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  @media (max-width: 1345px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;

  > div {
    font-size: 18px;

    background-color: ${(props) => props.color};

    width: 60px;
    height: 40px;
    border-radius: 5px;

    line-height: 40px;

    text-align: center;
  }

  > span {
    margin-left: 10px;
    font-size: 18px;
  }

  @media (max-width: 1345px) {
    font-size: 14px;
    margin: 3px 0 > div {
      height: 35px;
      width: 35px;
      line-height: 35px;
    }

    > span {
      margin-left: 7px;
    }
  }
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: 1345px) {
    height: 100%;
  }
`;
