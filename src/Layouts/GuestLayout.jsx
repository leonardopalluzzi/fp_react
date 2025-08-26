import { Outlet } from "react-router-dom";
import Guestheader from "../Components/smart/GuestHeader";


export default function GuestLayout() {
    return (
        <>
            <Guestheader />
            <Outlet />
        </>
    )
}