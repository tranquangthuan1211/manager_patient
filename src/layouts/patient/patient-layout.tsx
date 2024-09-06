// Code: Layout for patient
import { Box, Stack, TextField, Typography } from "@mui/material";
import { FC,ReactNode, use } from "react";
import { useAuth } from "src/hooks/use-auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
interface PageProps {
    imageUser?: string;
    children: ReactNode;
}
export const LayoutPatient:FC<PageProps> = (props) => {
    const {children, imageUser} = props;
    const {user} = useAuth();
    return (
        <>
            <Stack 
                spacing={2} 
                sx = {{
                    height:"100%",
                    backgroundColor: '#f5f5f5',
                    padding: '10px'
                }}
            >
                <Stack
                    direction="row" 
                    spacing={2} 
                    justifyContent="space-between" 
                    alignItems="center"
                    
                >
                    <Box>
                        <TextField
                            id="outlined-basic" 
                            placeholder='Tìm kiếm dịch vụ'
                            variant="outlined" 
                            // onChange={(e) => setSerVices(e.target.value)}
                            sx = {{
                                width: '500px'
                            }}
                            InputProps={{
                                endAdornment: (
                                    <SearchOutlinedIcon style={{fontSize: '30px'}}/>
                                )
                            }}
                        />
                    </Box>
                    <Box
                        sx = {{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <NotificationsActiveOutlinedIcon style={{fontSize: '30px'}}/>
                        {imageUser ? (
                            <img src={imageUser} alt="user" style={{width: '30px', height: '30px'}}/>
                        ) : (
                            <AccountCircleIcon style={{fontSize: '30px'}}
                            />
                        )}
                        <Typography color={"primary"} variant="body1">Bienvenido {user?.name}</Typography>
                    </Box>
                </Stack>
                {children}
            </Stack>
    </>
    )
}