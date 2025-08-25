import { Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Role } from '../Js/Roles'


export default function RouteProtectionLayout() {
    const { currentUser } = useAuthContext();

    console.log(currentUser);

    switch (currentUser.state) {
        case "loading":
            return (
                <>
                    <h1>Loading</h1>
                </>
            )
        case "error":
            return <Navigate to="/login" replace />

        case "success":
            switch (currentUser.details.roles) {
                case Role.ADMIN:
            }
            return <Outlet />
    }
}