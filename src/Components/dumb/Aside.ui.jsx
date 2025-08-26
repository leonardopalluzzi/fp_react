import { useNavigate, Link, NavLink } from "react-router-dom"
export default function AsideUi({ menuVoices, currentUser }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="aside_wrapper">
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
                                        <li className="my-3"><NavLink className={voice.style} to={voice.path}>{voice.name}</NavLink></li>
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