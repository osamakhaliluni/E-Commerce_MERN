import { useState } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (username, token) => {
        setUserName(username);
        setToken(token);
        localStorage.setItem('userName', username);
        localStorage.setItem('token', token);
    }

    return (
        <AuthContext.Provider value={{ userName, token, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;