import { createContext, use, useContext, useEffect } from "react";
import useFunction, { DEFAULT_FUNCTION_RETURN, UseFunctionReturnType } from "src/hooks/use-function";
import { Message } from "src/types/messages";
import MessageApi from "src/api/messages";


interface contextValue {
    getMessagesApi: UseFunctionReturnType<FormData, Message[]>;
    createMessage?: (requests: Omit<Message, "id">) => Promise<void>;
    updateMessage?: (message: Partial<Message>) => Promise<void>;
    deleteMessage?: (id: string) => Promise<void>;
}

export const MessageContext = createContext<contextValue>({
    getMessagesApi: DEFAULT_FUNCTION_RETURN,
    createMessage: async () => {},
    updateMessage: async () => {},
    deleteMessage: async () => {},
});

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const getMessagesApi = useFunction(MessageApi.getMessages);

    useEffect(() => {
        getMessagesApi.call(new FormData());
    }, []);

    return (
        <MessageContext.Provider
            value={{
                getMessagesApi,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
}
export const useMessage = () => useContext(MessageContext);
export default MessageProvider;