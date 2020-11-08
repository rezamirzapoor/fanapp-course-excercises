import React, { createContext, useContext, useState } from "react";
const initialState = {
  user: null,
};
export const AuthContext = createContext();
export const AuthUpdaterContext = createContext();

AuthContext.displayName = "AuthContext";
AuthUpdaterContext.displayName = "AuthUpdatedContext";

export default ({ children }) => {
  const [state, setState] = useState(initialState);
  const signout = () => setState((state) => ({ ...state, user: null }));
  const signin = (user) => setState((state) => ({ ...state, user }));
  const signup = (user) => setState((state) => ({ ...state, user }));
  return (
    <AuthContext.Provider value={{ ...state, signin, signup, signout }}>
      <AuthUpdaterContext.Provider value={setState}>
        {children}
      </AuthUpdaterContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useAuthUpdaterContext = () => useContext(AuthUpdaterContext);
