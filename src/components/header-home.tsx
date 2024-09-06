import {Stack, Typography, TextField, Box, Drawer, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import dynamic from 'next/dynamic';
const StatPageContainer = dynamic(
    () =>
      import(
        "src/sections/thong-ke/stat-page-container"
      ).then((module) => module.StatPageContainer),
    { ssr: false, loading: () => <CircularProgress sx={{ m: 2 }} /> }
  );
interface HeaderHomeProps {
    nameUser: string;
    imageUser?: string;
    setSerVices: (name: string) => void;    
}

const HeaderHome = ({
    imageUser,
    nameUser,
    setSerVices}:HeaderHomeProps) => {
    return (
    <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="space-between" 
            alignItems="center"
            sx = {{
                height:"100%",
                backgroundColor: '#f5f5f5',
            }}
        >
            <TextField
                id="outlined-basic" 
                placeholder='Tìm kiếm dịch vụ'
                variant="outlined" 
                onChange={(e) => setSerVices(e.target.value)}
            />
            <Box
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                {imageUser ? (
                    <img src={imageUser} alt="user" style={{width: '30px', height: '30px'}}/>
                ) : (
                    <AccountCircleIcon style={{fontSize: '30px'}}
                    />
                )}
                <Typography variant="h6">Bienvenido {nameUser}</Typography>
            </Box>
    </Stack>
    );
}
export default HeaderHome;
