import { createContext, useContext } from "react";

export const AuthContext = createContext({
  email: null,
  token: null,
  isAuthenticated: false,
  myOrders: [null],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
