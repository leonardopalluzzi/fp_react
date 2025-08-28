import AsideUi from "../dumb/Aside.ui";
import { useAuthContext } from "../../Contexts/AuthContext";
import { menuVoices } from "../../Js/MenuVoices";
import LoaderUi from "../dumb/Loader.ui";

export default function Aside() {
    const { currentUser } = useAuthContext()

    const filteredMenu = menuVoices.filter(menuItem => menuItem.roles.some(role => currentUser.details.roles.includes(role)))

    switch (currentUser.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            return (
                <>

                </>
            )
        case 'success':
            return (
                <>
                    <AsideUi menuVoices={filteredMenu} currentUser={currentUser.details} />
                </>
            )
    }
}