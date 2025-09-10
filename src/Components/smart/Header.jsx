import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../Contexts/AuthContext"

export default function Header() {
    const navigate = useNavigate()
    const { prefix } = useAuthContext()
    return (
        <>
            <div id="site_header">
                <nav
                    className="navbar navbar-expand-sm navbar-light bg-light h-100 w-100"
                >
                    <div className="container">

                        <Link className="navbar-brand" to={`/${prefix}/dashboard`}>
                            <img className="site_logo" src="/logo.svg" alt="Site Logo" />
                        </Link>
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
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" to={`/${prefix}/dashboard `} aria-current="page"
                                    >
                                        DashBoard
                                        <span className="visually-hidden">(current)</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Link to={`/${prefix}/profile`} className="fs-1 btn btn-trasparent">
                                <i className="bi bi-person-circle"></i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}