import { Outlet } from "react-router-dom";
import EmployeeHeader from "../Components/smart/EmployeeHeader";
import Footer from "../Components/smart/Footer";
import Aside from "../Components/smart/Aside";

export default function EmployeeLayout() {
    return (
        <>
            <EmployeeHeader />
            <Aside />
            <Outlet />
            <Footer />
        </>
    )
}