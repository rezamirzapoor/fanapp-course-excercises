import React from "react";
import TopBar from "./TopBar";
import { Grid } from "@material-ui/core";
export default ({ children }) => {
  return (
    <>
      <TopBar />
      <Grid container style={{ marginTop: "1em" }}>
        {children}
      </Grid>
    </>
  );
};
