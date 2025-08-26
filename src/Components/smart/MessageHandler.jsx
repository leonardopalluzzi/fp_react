import { useMessageContext } from "../../Contexts/MessageContext"
import ToastUi from "../dumb/Toast.ui"

export default function ErrorHandler() {
    const { messages, closeMessage } = useMessageContext()
    console.log(messages);



    switch (messages.state) {
        case 'empty':
            return null;
        default:
            return (
                <>
                    <ToastUi state={messages.state} messages={messages.getList ?? []} closeMessage={closeMessage} />
                </>
            )
    }
}