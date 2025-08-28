import { NavLink } from "react-router-dom"
import { Role } from "../../Js/Roles";

export default function AsideUi({ menuVoices, currentUser }) {

    const roleprefix = currentUser.roles.includes(Role.ADMIN) ? 'admin' : currentUser.roles.includes(Role.EMPLOYEE) ? 'employee' : currentUser.roles.includes(Role.CUSTOMER) ? 'customer' : currentUser.roles.includes(Role.SUPERADMIN) ? 'admin' : ''

    return (
        <>
            <div className="aside_wrapper shadow">
                <aside className="bg-light aside">
                    <div className="d-flex align-items-center justify-content-center"><i class="bi bi-speedometer2 fs-1 aside_icon"></i></div>

                    <h3 className="aside_text">Welcome:</h3>
                    <h4 className="aside_text text-decoration-underline">{currentUser.sub}</h4>
                    <ul className="list-unstyled aside_text">
                        {
                            menuVoices.map(voice =>
                            (
                                <>
                                    <>
                                        <li className="my-3"><NavLink className={voice.style} to={`/${roleprefix}${voice.path}`}>{voice.name}</NavLink></li>
                                    </>
                                </>
                            ))
                        }
                    </ul>

                </aside>
            </div>
        </>
    )
}