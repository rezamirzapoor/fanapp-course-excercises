import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { Grid } from "@material-ui/core";
import UserForm from "./user.form";
import UserInfo from "./user.info";

export default () => {
  const [initialData, setInitialData] = useState({
    avatar: undefined,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    title: "",
    displayEmail: false,
    gender: "",
    address: "",
  });
  return (
    <Layout>
      <Grid container style={{ padding: ".5em" }}>
        <Grid
          container
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <UserInfo initialData={initialData} />
        </Grid>
        <Grid container xs={8}>
          <UserForm setInitialData={setInitialData} />
        </Grid>
      </Grid>
    </Layout>
  );
};
