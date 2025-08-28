import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Guestheader() {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <>
            <div id="site_header">
                <nav
                    className="navbar navbar-expand-sm navbar-light bg-light"
                >
                    <div className="container">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button
                            className="navbar-toggler d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId"
                            aria-controls="collapsibleNavId"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex align-items-center justify-content-end" id="collapsibleNavId">
                            {
                                location.pathname == '/login' ?
                                    <button onClick={() => navigate('/register')} className="btn btn-primary">Register</button>
                                    :
                                    <button onClick={() => navigate('/login')} className="btn btn-primary">Login</button>
                            }

                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}