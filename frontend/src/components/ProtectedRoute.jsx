import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        console.log("Authentication is required to access this page ");
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;