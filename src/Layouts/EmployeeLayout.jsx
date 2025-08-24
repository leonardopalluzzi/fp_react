import { Outlet } from "react-router-dom";
import EmployeeHeader from "../Components/smart/EmployeeHeader";
import Footer from "../Components/smart/Footer";

export default function EmployeeLayout() {
    return (
        <>
            <EmployeeHeader />
            <Outlet />
            <Footer />
        </>
    )
}