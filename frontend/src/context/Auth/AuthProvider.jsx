import { useState } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (email, token) => {
        setEmail(email);
        setToken(token);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
    }

    const logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setEmail(null);
        setToken(null);
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ email, token, login, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;