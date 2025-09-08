import { Outlet } from "react-router-dom";
import Header from "../Components/smart/Header";
import Footer from "../Components/smart/Footer";
import Aside from "../Components/smart/Aside";

export default function CustomerLayout() {
    return (
        <>
            <Header />
            <Aside />
            <div id="site_main">
                <Outlet />
            </div>
            <Footer />

        </>
    )
}