import { createContext, useContext, useState, useRef } from "react";

const MessageContext = createContext()

function MessageProvider({ children }) {
    const [messages, setMessages] = useState({
        state: 'empty',
        getList: []
    });

    const timeoutRef = useRef(null);

    function throwMessage(state, messages) {
        setMessages({
            state: state,
            getList: [...messages]
        })
        if (messages.state !== 'empty') {
            timeoutRef.current = setTimeout(() => setMessages({
                state: 'empty',
                getList: []
            }), 4000)
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