import { createContext, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MessageContext = createContext()

function MessageProvider({ children }) {
    const [messages, setMessages] = useState({
        state: 'empty',
        getList: []
    });
    const [loader, setLoader] = useState(false)

    const timeoutRef = useRef(null);
    const navigate = useNavigate()

    function throwMessage(state, msgList) {
        setMessages({
            state: state,
            getList: [...msgList]
        })
        if (state !== 'empty') {
            timeoutRef.current = setTimeout(() => setMessages({
                state: 'empty',
                getList: []
            }), 4000)
        } else if (state.includes('expired')) {
            navigate('/login')
        }
    }

    function closeMessage() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setMessages({ state: 'empty', getList: [] });
    }

    return (
        <MessageContext.Provider value={{ messages, throwMessage, closeMessage, loader, setLoader }} >
            {children}
        </MessageContext.Provider>
    )
}

function useMessageContext() {
    const context = useContext(MessageContext)
    return context
}

export { MessageProvider, useMessageContext }