import { Outlet } from "react-router-dom";
import CustomerHeader from "../Components/smart/CustomerHeader";
import Footer from "../Components/smart/Footer";
import Aside from "../Components/smart/Aside";

export default function CustomerLayout() {
    return (
        <>
            <CustomerHeader />
            <Aside />
            <div id="site_main">
                <Outlet />
            </div>
            <Footer />

        </>
    )
}