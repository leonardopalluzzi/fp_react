import { useAuthContext } from "../../Contexts/AuthContext"

export default function Logout() {

    const { logout } = useAuthContext()

    return (
        <>
            <div className="container d-flex flex-column gap-4 align-items-center justify-content-center my-5">
                <h1>Are you sure you want to logout?</h1>
                <button onClick={() => logout()} className="btn btn-warning fs-3">Logout</button>
            </div>

        </>
    )
}