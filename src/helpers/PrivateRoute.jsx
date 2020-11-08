import React from "react";
import { AuthContext } from "../providers/AuthProvider";
export default (WrappedComponent) =>
  class extends React.Component {
    static contextType = AuthContext;
    render = () => {
      const { user = null } = this.context;
      console.log(this.context);
      return user ? (
        <WrappedComponent />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>You are not Logged in</h1>
        </div>
      );
    };
  };
