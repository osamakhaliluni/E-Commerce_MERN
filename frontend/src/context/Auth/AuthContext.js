import { createContext, useContext } from "react";

export const AuthContext = createContext({
  userName: null,
  token: null,
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);
