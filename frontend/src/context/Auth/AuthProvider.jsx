import { useState } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [myOrders, setMyOrders] = useState([]);
    const isAuthenticated = !!token;


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

    const getMyOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/my-orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (!response.ok) {
                const e = await response.json();
                throw new Error(`Failed to fetch orders:${e.message}`);
            }
            const data = await response.json();
            setMyOrders(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <AuthContext.Provider value={{ email, token, myOrders, isAuthenticated, login, logout, getMyOrders }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;