import { useMessageContext } from "../../Contexts/MessageContext"
import ToastUi from "../dumb/Toast.ui"

export default function ErrorHandler() {
    const { messages, closeMessage } = useMessageContext()
    console.log(messages);





    switch (messages.state) {
        case 'empty':
            return null;
        default:



            const textColor = messages.state === 'error'
                ? 'text-danger'
                : messages.state === 'success'
                    ? 'text-success'
                    : messages.state === 'warning'
                        ? 'text-warning'
                        : '';

            const imgPath = messages.state === 'error'
                ? 'path/to/error.png'
                : messages.state === 'success'
                    ? 'path/to/success.png'
                    : messages.state === 'warning'
                        ? 'path/to/warning.png'
                        : '';



            return (
                <>
                    <ToastUi
                        state={messages.state}
                        messages={messages.getList ?? []}
                        closeMessage={closeMessage}
                        textColor={textColor}
                        imgPath={imgPath}
                    />
                </>
            )
    }
}