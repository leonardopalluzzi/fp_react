import { useAuthContext } from "../../Contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { routes } from '../../Js/Routes';
import { Navigate } from "react-router-dom";
import LoaderUi from "../dumb/Loader.ui";

export default function RenderRoutes() {

    const { currentUser } = useAuthContext()

    switch (currentUser.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            if (!currentUser.token) {
                return <Navigate to={'/login'} />
            }
            return (
                <>
                    <h1>Error</h1>
                    <p>{currentUser.message}</p>
                </>
            )
        case 'success':
            const allowedRoutes = routes.filter(route => route.roles.some(role => currentUser.details.roles.includes(role)))
            return (
                <Routes>
                    {
                        allowedRoutes.map((route, i) => {

                            return (

                                <Route key={i} path={route.path} Component={route.layout}>
                                    {
                                        route.children?.map((children, j) => (
                                            <Route key={j} path={children.path} Component={children.component} />
                                        ))
                                    }
                                </Route>
                            )
                        })
                    }
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            )
    }
}