import React from 'react';
import { 
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  AvatarGroup,
  Paper
} from '@mui/material';
import { Users, Link, Image, PenSquare } from 'lucide-react';

const chatGroups = [
  {
    id: 1,
    name: 'Nhóm Nhập môn Công nghệ...',
    lastMessage: 'Bạn: ời lm tới đâu để tôi bk code thêm...',
    time: '1 giờ',
    avatar: <Image />,
  },
  {
    id: 2,
    name: 'Cloud của tôi',
    lastMessage: 'Bạn: https://leetcode.com/proble...',
    time: '2 giờ',
    avatar: '☁️',
  },
  {
    id: 3,
    name: 'TOMCI43 - TUE + THUR (1...',
    lastMessage: 'Nguyễn Minh Hà Anh July: @All Các b...',
    time: '3 giờ',
    avatar: 'T',
  },
  {
    id: 4,
    name: 'The Anh English Revival 5',
    lastMessage: 'Nguyễn Thế Anh: Lớp mình vào xe...',
    time: '4 giờ',
    avatar: 'E',
    isGroupChat: true,
  },
  {
    id: 5,
    name: 'ghét HTTT',
    lastMessage: 'Bạn: Tin nhắn đã được thu hồi',
    time: '5 giờ',
    isGroupChat: true,
    memberCount: 5,
  },
  {
    id: 6,
    name: 'PTUDMobile_22/31',
    lastMessage: 'My Trương: @All Proposal 15/10 n...',
    time: '6 giờ',
    isGroupChat: true,
    memberCount: 5,
  },
  {
    id: 7,
    name: 'Tổng Đài 1022 Đà Nẵng',
    lastMessage: 'Nhận Giải thưởng Chuyển đổi số Việt ...',
    time: '6 giờ',
    avatar: '📞',
    verified: true,
  },
  {
    id: 8,
    name: '23. Reactjs Việt Nam',
    lastMessage: 'Minh Thu Do: Siêu combo 41+ kho...',
    time: '6 giờ',
    avatar: '⚛️',
    isGroupChat: true,
  },
];

export default function ChatList() {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: '100%', 
        maxWidth: 360,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <List sx={{ p: 0 }}>
        {chatGroups.map((chat) => (
          <ListItem
            key={chat.id}
            alignItems="flex-start"
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
                cursor: 'pointer',
              },
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              px: 2,
              py: 1,
            }}
          >
            <ListItemAvatar>
              {chat.isGroupChat ? (
                <AvatarGroup max={2} sx={{ width: 40, height: 40 }}>
                  <Avatar>{chat.avatar}</Avatar>
                  {/* {chat.memberCount && <Avatar>{chat.memberCount}</Avatar>} */}
                </AvatarGroup>
              ) : (
                <Avatar sx={{ bgcolor: chat.avatar ? 'primary.main' : 'secondary.main' }}>
                  {typeof chat.avatar === 'string' ? chat.avatar : chat.avatar || chat.name[0]}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography component="span" variant="subtitle1">
                    {chat.name}
                    {chat.verified && ' ✓'}
                  </Typography>
                  <Typography component="span" variant="caption" color="text.secondary">
                    {chat.time}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chat.lastMessage.startsWith('http') ? <Link size={16} /> : 
                   chat.lastMessage.includes('đã được thu hồi') ? <PenSquare size={16} /> : null}
                  {chat.lastMessage}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}