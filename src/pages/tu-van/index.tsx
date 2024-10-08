import { AttachFile, EmojiEmotions, Send } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Layout } from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import { io, Socket } from 'socket.io-client';
import ChatList from 'src/sections/chat/chat-list';

interface ServerToClientEvents {
    'chat message': (message: string) => void;
}
interface ClientToServerEvents {
    'chat message': (message: string) => void;
}
  
  // Khai báo biến socket với type đúng
let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
const Page:PageType = () => {
    const [messages, setMessages] = useState([
      { id: 1, text: "Tuần sau học onl", sender: "user", timestamp: "16:20" },
      { id: 2, text: "Tuần sau nữa ktra", sender: "user", timestamp: "16:20" },
      { id: 3, text: "Phần httt", sender: "user", timestamp: "16:20" },
      { id: 4, text: "Kiểm tra giữa kì hả", sender: "other", timestamp: "16:20" },
      { id: 5, text: "À OK", sender: "other", timestamp: "16:20" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState<string>('');
    const [messagess, setMessagess] = useState<string[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    useEffect(() => {
        // Khởi tạo socket connection với type
        socket = io('http://localhost:3001');
        
        socket.on('connect', () => {
          setConnected(true);
        });
    
        socket.on('chat message', (msg: string) => {
          setMessagess((prevMessages) => [...prevMessages, msg]);
        });
    
        return () => {
          socket?.close();
        };
    }, []);
    useEffect(() => {
        console.log(connected);
    }, [connected]);
    const handleSend = () => {
      if (newMessage.trim()) {
        setMessages([...messages, {
          id: messages.length + 1,
          text: newMessage,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage("");
      }
    };
  
    return (
    <Stack
        flexDirection="row"
    >
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', width:"70%"}}>
            {/* Header */}
            <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>NT</Avatar>
            <Typography variant="h6">Nguyễn Văn Tài</Typography>
            </Paper>
    
            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
                {messages.map((message) => (
                <ListItem
                    key={message.id}
                    sx={{
                    justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end',
                    mb: 1
                    }}
                >
                    {message.sender === 'user' && (
                    <ListItemAvatar>
                        <Avatar>NT</Avatar>
                    </ListItemAvatar>
                    )}
                    <Paper
                    elevation={1}
                    sx={{
                        p: 1,
                        backgroundColor: message.sender === 'user' ? 'grey.100' : 'primary.light',
                        maxWidth: '70%'
                    }}
                    >
                    <ListItemText 
                        primary={message.text}
                        secondary={message.timestamp}
                    />
                    </Paper>
                </ListItem>
                ))}
            </List>
            </Box>
    
            {/* Input area */}
            <Paper 
            elevation={3} 
            sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                borderTop: 1,
                borderColor: 'divider'
            }}
            >
            <IconButton size="small" sx={{ mr: 1 }}>
                <EmojiEmotions />
            </IconButton>
            <IconButton size="small" sx={{ mr: 1 }}>
                <AttachFile />
            </IconButton>
            <IconButton size="small" sx={{ mr: 1 }}>
                {/* <Image /> */}
            </IconButton>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập @, tin nhắn tới Nguyễn Văn Tài"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                size="small"
                sx={{ mx: 1 }}
            />
            <IconButton color="primary" onClick={handleSend}>
                <Send />
            </IconButton>
            </Paper>
        </Box>
        <ChatList/>
    </Stack>
    );
  }
Page.getLayout = (page) => <Layout>{page}</Layout>;
export default Page;