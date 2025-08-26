import AsideUi from "../dumb/Aside.ui";
import { useAuthContext } from "../../Contexts/AuthContext";
import { menuVoices } from "../../Js/MenuVoices";

export default function Aside() {
    const { currentUser } = useAuthContext()

    const filteredMenu = menuVoices.filter(menuItem => menuItem.roles.some(role => currentUser.details.roles.includes(role)))


    return (
        <>
            <AsideUi menuVoices={filteredMenu} currentUser={currentUser.details} />
        </>
    )
}