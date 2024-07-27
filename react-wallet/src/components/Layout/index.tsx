import React from "react";
import { Grid } from './styles'

import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

type Props = {
  children?: React.ReactNode
}
// FC => Function Component
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Grid >
        <MainHeader />
        <Aside />
        <Content>
          { children }
        </Content>
    </Grid>
  );
};

export default Layout;
