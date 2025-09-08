import { useNavigate } from "react-router-dom"

export default function Error({ message }) {
    const navigate = useNavigate()
    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center p-4 my-5">
                <h1 className="text-danger">Error</h1>
                <p className="fs-3">The server gave the following error: {message}</p>
                <button onClick={() => navigate(0)} className="btn btn-primary">Retry</button>
            </div>
        </>
    )
}