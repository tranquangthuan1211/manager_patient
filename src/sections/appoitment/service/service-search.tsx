import React, { useState } from 'react';
import { Box, TextField, Typography, Avatar, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Service } from 'src/types/service';
interface RecentItem {
  name: string;
  avatarUrl: string;
  newMessages: number | null;
  online: boolean;
}

const recentSearches: RecentItem[] = [
  { name: 'Trúc Trần', avatarUrl: '', newMessages: null, online: true },
  { name: 'Phạm Việt Anh', avatarUrl: '', newMessages: null, online: true },
  { name: 'Kim Ánh', avatarUrl: '', newMessages: 2, online: true },
  { name: 'Mãng Cầu', avatarUrl: '', newMessages: 1, online: true },
  { name: 'Nguyễn Ngọc Trân Châu', avatarUrl: '', newMessages: 1, online: true },
  { name: 'IT Intern - Fresher', avatarUrl: '', newMessages: 9, online: false },
  { name: 'Laravel Việt Nam', avatarUrl: '', newMessages: 6, online: true },
  { name: 'hqsoft tuyển dụng', avatarUrl: '', newMessages: null, online: false },
];

const SearchService = ({
  chooseService,
  services,
}:{
  chooseService?: (service: Service) => void;
  services: Service[];
}
) => {
  const [searchITerm, setSearchITerm] = useState('');

  return (
    <Box sx={{ width: "140%", p: 2, backgroundColor: 'white', borderRadius: 2, zIndex: 1 }}>
      {services
        .filter((item) => item.name.toLowerCase().includes(searchITerm.toLowerCase()))
        .map((item, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1, p: 1, backgroundColor: 'white', borderRadius: 1 }}
            onClick={() => chooseService && chooseService(item)}
          >
            <Stack direction="row" alignItems="center">
              <Avatar src={""} alt={item.name} /> 
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ color: 'black' }}>{item.name}</Typography>
                {item.description && (
                  <Typography sx={{ color: 'lightblue', fontSize: 12 }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Stack>

            <IconButton>
              <CloseIcon sx={{ color: 'gray' }} />
            </IconButton>
          </Stack>
        ))}
    </Box>
  );
};

export default SearchService;
