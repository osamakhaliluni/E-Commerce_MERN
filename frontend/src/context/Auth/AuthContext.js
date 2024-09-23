import { createContext, useContext } from "react";

export const AuthContext = createContext({
  email: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
