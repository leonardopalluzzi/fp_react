import { useNavigate, Link, NavLink } from "react-router-dom"
export default function AsideUi({ menuVoices, currentUser }) {
    const navigate = useNavigate();
    return (
        <>
            <aside>
                <h3>Welcome {currentUser.usename}</h3>
                <ul className="list-unstyled">
                    {
                        menuVoices.map(voice => (
                            <>
                                <>
                                    <li><NavLink to={voice.path}>{voice.name}</NavLink></li>
                                </></>
                        ))
                    }
                </ul>

            </aside>
        </>
    )
}