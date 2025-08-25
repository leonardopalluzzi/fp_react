import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./Layouts/AdminLayout"
import EmployeeLayout from "./Layouts/EmployeeLayout"
import CustomerLayout from "./Layouts/CustomerLayout"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard"
import CustomerDashboard from "./Pages/Customer/CustomerDashboard"
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import { AuthProvider } from "./Contexts/AuthContext"
import { Navigate } from "react-router-dom";
import RouteProtectionLayout from "./Layouts/RouteProtectionLayout"
import Logout from "./Pages/Common/Logout"
import RenderRoutes from "./Components/RoutesProtection/RenderRoutes"



function App() {

  return (
    <>

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/logout" Component={Logout} />

            {/* Qui inseriamo le rotte dinamiche protette */}
            <Route path="/*" Component={RenderRoutes} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter >

    </>
  )
}

export default App
