import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./Layouts/AdminLayout"
import EmployeeLayout from "./Layouts/EmployeeLayout"
import CustomerLayout from "./Layouts/CustomerLayout"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import EmployeeDashboard from "./Pages/Employee/EmployeeDashboard"
import CustomerDashboard from "./Pages/Customer/CustomerDashboard"
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import RouteProtection from "./Components/smart/RouteProtection"
import { AuthProvider } from "./Contexts/AuthContext"
import { Navigate } from "react-router-dom";



function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />

            {/* admin layout */}
            <Route Component={AdminLayout}>
              <Route path="/admindashboard" element={
                <>
                  <RouteProtection>
                    <AdminDashboard />
                  </RouteProtection>
                </>
              } />

            </Route>

            {/* employee layout */}
            <Route Component={EmployeeLayout}>
              <Route path="/employeedashboard" element={
                <>
                  <RouteProtection>
                    <EmployeeDashboard />
                  </RouteProtection>
                </>
              } />


            </Route>

            {/* customer layout */}
            <Route Component={CustomerLayout}>
              <Route path="/customerdashboard" element={
                <>
                  <RouteProtection>
                    <CustomerDashboard />
                  </RouteProtection>
                </>
              } />


            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
