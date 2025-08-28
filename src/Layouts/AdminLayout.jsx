import { Outlet } from "react-router-dom"
import AdminHeader from "../Components/smart/AdminHeader"
import Footer from "../Components/smart/Footer"
import Aside from "../Components/smart/Aside"

export default function AdminLayout() {
    return (
        <>
            <AdminHeader />
            <Aside />
            <div id="site_main">
                <Outlet />
            </div>
            <Footer />

        </>
    )
}