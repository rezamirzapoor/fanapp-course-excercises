import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Main from "./Main";
import AuthProvider from "../providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route component={Main} />
          </Switch>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </React.Fragment>
  );
}
