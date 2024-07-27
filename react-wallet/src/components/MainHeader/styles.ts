import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;

  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
  margin-right: 50px;
`;

export const Welcome = styled.h3`
  font-size: 25px;
`;

export const UserName = styled.span`
  font-weight: normal;
`;
