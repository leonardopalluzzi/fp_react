import { useNavigate } from "react-router-dom"
import AsideUi from "../dumb/Aside.ui";
import { useAuthContext } from "../../Contexts/AuthContext";

export default function Aside() {
    const { currentUser } = useAuthContext()

    const menuVoices = [

    ]

    return (
        <>
            <AsideUi menuVoices={menuVoices} currentUser={currentUser.details} />
        </>
    )
}