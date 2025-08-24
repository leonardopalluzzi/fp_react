import { Outlet } from "react-router-dom";
import CustomerHeader from "../Components/smart/CustomerHeader";
import Footer from "../Components/smart/Footer";

export default function CustomerLayout() {
    return (
        <>
            <CustomerHeader />
            <Outlet />
            <Footer />

        </>
    )
}