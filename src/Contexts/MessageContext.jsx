import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

const MessageContext = createContext()

function MessageProvider({ children }) {
    const [messages, setMessages] = useState({
        state: 'empty',
        getList: []
    });
    const [redirect, setRedirect] = useState(false)

    const timeoutRef = useRef(null);

    useEffect(() => {
        if (messages.state == "expired") {
            setRedirect(true)
        }

    }, [messages.state])

    if (redirect) {
        return <Navigate to={'/login'} replace />
    }

    function throwMessage(state, msgList) {
        setMessages({
            state: state,
            getList: [...msgList]
        })
        if (msgList.state !== 'empty') {
            timeoutRef.current = setTimeout(() => setMessages({
                state: 'empty',
                getList: []
            }), 4000)
        } else if (msgList.state == 'expired') return;
    }

    function closeMessage() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setMessages({ state: 'empty', getList: [] });
    }

    return (
        <MessageContext.Provider value={{ messages, throwMessage, closeMessage }} >
            {children}
        </MessageContext.Provider>
    )
}

function useMessageContext() {
    const context = useContext(MessageContext)
    return context
}

export { MessageProvider, useMessageContext }