import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import { AuthProvider } from "./Contexts/AuthContext"
import Logout from "./Pages/Common/Logout"
import RenderRoutes from "./Components/RoutesProtection/RenderRoutes"
import GuestLayout from "./Layouts/GuestLayout"
import { MessageProvider } from "./Contexts/MessageContext"
import MessageHandler from "./Components/smart/MessageHandler"



function App() {

  return (
    <>

      <BrowserRouter>
        <MessageProvider>
          <AuthProvider>
            <MessageHandler />
            <Routes>
              <Route Component={GuestLayout}>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/logout" Component={Logout} />
              </Route>

              {/* renderizzo rotte dinamicamente in base ai ruoli */}
              <Route path="/*" Component={RenderRoutes} />

            </Routes>
          </AuthProvider>
        </MessageProvider>
      </BrowserRouter >

    </>
  )
}

export default App
