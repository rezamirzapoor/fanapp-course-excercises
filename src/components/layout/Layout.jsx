import React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
};
