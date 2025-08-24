import { useAuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
    const { token } = useAuthContext();

    if (!token.response) {
        return <Navigate to="/login" replace />
    }

    return children
}