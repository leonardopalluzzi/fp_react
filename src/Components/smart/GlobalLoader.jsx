import LoaderUi from "../dumb/Loader.ui";
import { useMessageContext } from "../../Contexts/MessageContext";

export default function GlobalLoader() {
    const { loader } = useMessageContext()
    return (
        <>{
            loader && (
                <>
                    <div className="global_loader_container">
                        <LoaderUi />
                    </div>
                </>
            )
        }

        </>
    )
}