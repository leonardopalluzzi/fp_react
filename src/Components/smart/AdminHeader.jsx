import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function AdminHeader() {
    const navigate = useNavigate()
    return (
        <>
            <nav
                className="navbar navbar-expand-sm navbar-light bg-light"
            >
                <div className="container">

                    <Link className="navbar-brand" to={'/admin/dashboard'}><img src="/logo.svg" alt="" /></Link>
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
                                <NavLink className="nav-link active" to={'/admin/dashboard '} aria-current="page"
                                >
                                    DashBoard
                                    <span className="visually-hidden">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="#">Link</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to={'/admin/profile'} className="fs-1 btn btn-trasparent">
                            <i class="bi bi-person-circle"></i>
                        </Link>
                    </div>
                </div>
            </nav>


        </>
    )
}