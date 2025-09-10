import { useMessageContext } from "../../Contexts/MessageContext"
import ToastUi from "../dumb/Toast.ui"

export default function ErrorHandler() {
    const { messages, closeMessage } = useMessageContext()

    function getTextColor() {
        switch (messages.state) {
            case 'error':
                return 'text-danger'
            case 'success':
                return 'text-success'
            case 'warning':
                return 'text-warning'
            case 'expired':
                return 'text-danger'
        }

    }

    switch (messages.state) {
        case 'empty':
            return null;
        default:
            return (
                <>
                    <ToastUi
                        state={messages.state}
                        messages={messages.getList ?? []}
                        closeMessage={closeMessage}
                        textColor={getTextColor()}
                    />
                </>
            )
    }
}