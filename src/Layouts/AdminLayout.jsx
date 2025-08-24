import { Outlet } from "react-router-dom"
import AdminHeader from "../Components/smart/AdminHeader"
import Footer from "../Components/smart/Footer"

export default function AdminLayout() {
    return (
        <>
            <AdminHeader />
            <Outlet />
            <Footer />

        </>
    )
}