import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({
        state: 'loading'
    })
    const [token, setToken] = useState({
        state: 'loading'
    });

    useEffect(() => {
        localStorage.getItem("token")
        if (token) {
            setToken({
                state: 'success',
                response: token
            })
        }
    }, [])

    function login(user) {
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

                setCurrentUser({
                    state: 'success',
                    details: jwtDecode(data.token)
                })

                setToken({
                    state: "success",
                    response: data.token
                })
                localStorage.setItem("token", data.token);
            })
            .catch(err => {
                setCurrentUser({
                    state: 'error',
                    message: err.message
                })
                setToken({
                    state: 'error',
                    message: err.message
                })
            })
    }

    return (
        <>
            <AuthContext.Provider value={{ token, login }}>
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