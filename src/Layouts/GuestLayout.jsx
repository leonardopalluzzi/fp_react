import { Outlet } from "react-router-dom";
import Guestheader from "../Components/smart/GuestHeader";


export default function GuestLayout() {
    return (
        <>
            <Guestheader />
            <div id="site_main">
                <Outlet />
            </div>
        </>
    )
}