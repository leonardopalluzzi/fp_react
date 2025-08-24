import { useAuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
    const { token } = useAuthContext();

    console.log(token);


    if (token.state != "success") {
        return <Navigate to="/login" replace />
    }

    return children
}