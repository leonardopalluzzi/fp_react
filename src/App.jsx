import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import { AuthProvider } from "./Contexts/AuthContext"
import Logout from "./Pages/Common/Logout"
import RenderRoutes from "./Components/RoutesProtection/RenderRoutes"
import GuestLayout from "./Layouts/GuestLayout"
import { MessageProvider } from "./Contexts/MessageContext"
import MessageHandler from "./Components/smart/MessageHandler"
import { FiltersProvider } from "./Contexts/FiltersContext"
import GlobalLoader from "./Components/smart/GlobalLoader"



function App() {

  return (
    <>

      <BrowserRouter>
        <MessageProvider>
          <AuthProvider>
            <MessageHandler />
            <GlobalLoader />
            <Routes>
              <Route Component={GuestLayout}>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/logout" Component={Logout} />
              </Route>


              <Route path="/*" element={(
                <>
                  <FiltersProvider>
                    {/* renderizzo rotte dinamicamente in base ai ruoli */}
                    <RenderRoutes />
                  </FiltersProvider>
                </>
              )} />



            </Routes>
          </AuthProvider>
        </MessageProvider>
      </BrowserRouter >

    </>
  )
}

export default App
