// contexts/SocketContext.tsx
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id?: string;
  content: string;
  sender: string;
  receiver: string;
  timestamp: string;
}

interface ServerToClientEvents {
  'chat message': (message: Message) => void;
  'load messages': (messages: Message[]) => void;
}

interface ClientToServerEvents {
  'chat message': (message: Message) => void;
}

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  messages: Message[];
  connected: boolean;
  sendMessage: (message: Message) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvidee:FC<{children: ReactNode}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');

    newSocket.on('connect', () => {
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    newSocket.on('chat message', (msg: Message) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on('load messages', (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: Message) => {
    if (message.content.trim() && connected && socket) {
      socket.emit('chat message', message);
    }
  };

  const value = {
    socket,
    messages,
    connected,
    sendMessage,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
  }

export default SocketProvidee;