import { renderToString } from "react-dom/server";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
    const { token } = useAuthContext();

    console.log(token);

    switch(token.state){
        case "loading":
            return(
                <>
                <h1>Loading</h1>
                </>
            )
        case "error":
            return <Navigate to="/login" replace />

        case "success":
            return children
    }
}