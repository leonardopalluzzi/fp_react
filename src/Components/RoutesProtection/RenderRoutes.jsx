import { useAuthContext } from "../../Contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { routes } from '../../Js/Routes';

export default function RenderRoutes() {



    const { currentUser } = useAuthContext()

    let allowedRoutes;

    if (currentUser.state == 'success') {
        allowedRoutes = routes.filter(route => route.roles.some(role => currentUser.details.roles.includes(role)))
    }


    switch (currentUser.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>Error</h1>
                    <p>{currentUser.message}</p>
                </>
            )
        case 'success':


            return (

                <Routes>
                    <Route element={<h1>cacca</h1>} />

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
                </Routes>
            )
    }
}