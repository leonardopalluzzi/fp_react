import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Role } from "../Js/Roles";

const AuthContext = createContext()

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({
        state: 'loading'
    })

    const navigate = useNavigate();

    useEffect(() => {
        checkForToken()
    }, [])

    function login(user) {
        if (!checkForToken()) {
            fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(jwtDecode(data.token));
                    const decoded = jwtDecode(data.token)

                    setCurrentUser({
                        state: 'success',
                        token: data.token,
                        details: jwtDecode(data.token)
                    })

                    localStorage.setItem("token", data.token);

                    if (decoded != null) {
                        if (decoded.roles.includes(Role.SUPERADMIN)) {
                            navigate('/admin/dashboard')
                        } else if (decoded.roles.includes(Role.ADMIN)) {
                            navigate('/admin/dashboard')
                        } else if (decoded.roles.includes(Role.EMPLOYEE)) {
                            navigate('/employee/dashboard')
                        } else if (decoded.roles.includes(Role.CUSTOMER)) {
                            navigate('/customer/dashboard')
                        }
                    }

                })
                .catch(err => {
                    setCurrentUser({
                        state: 'error',
                        message: err.message
                    })
                })
        } else {
            return;
        }

    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function register(user) {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                console.log(jwtDecode(data.token));
                setCurrentUser({
                    state: 'success',
                    token: data.token,
                    details: jwtDecode(data.token)
                })
                localStorage.setItem("token", data.token);

            })
            .catch(err => {
                setCurrentUser({
                    state: 'error',
                    message: err.message
                })
            })

    }

    function checkForToken() {
        let isAuthenticated = false;
        const checkForToken = localStorage.getItem('token')

        if (checkForToken && checkForToken != undefined) {
            setCurrentUser({
                state: 'success',
                token: checkForToken,
                details: jwtDecode(checkForToken)
            })
            isAuthenticated = true
        } else {
            setCurrentUser({
                state: "error",
                message: "User Not Logged"
            })
        }
        return isAuthenticated;
    }

    return (
        <>
            <AuthContext.Provider value={{ currentUser, login, logout, register }}>
                {children}
            </AuthContext.Provider>
        </>

    )

}

function useAuthContext() {
    const context = useContext(AuthContext);
    return context
}

export { AuthProvider, useAuthContext }