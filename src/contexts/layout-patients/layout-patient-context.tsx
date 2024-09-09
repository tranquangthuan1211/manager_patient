// Code: Layout for patient
import { Box, Stack, TextField, Typography, ClickAwayListener } from "@mui/material";
import { createContext, FC,ReactNode, use, useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Service, handleGetServices, initialService } from "src/types/service";
import useFunction from "src/hooks/use-function";
import ApiService from 'src/api/services';
import { useDebounce } from 'src/hooks/use_debounce';
import { getFormData } from "src/api/api-requests";
import SearchService from "src/sections/appoitment/service/service-search";
import { useDrawer } from "src/hooks/use-drawer";
import ServiceBooking from "src/sections/appoitment/service/service-booking";

interface PageProps {
    imageUser?: string;
    children: ReactNode;
    onSearchService: React.Dispatch<React.SetStateAction<string>>;
    onOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface ContextValue {
    valueSearch: string;
    service: Service ;
}
export const LayoutPatientContext = createContext<ContextValue>({
    valueSearch: '',
    service: initialService
});
const LayoutPatientProvider = ({ children }: { children: ReactNode }) => {
    const [valueSearch, setValueSearch] = useState<string>('');
    const {user} = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [services, setServices] = useState<Service[]>([]);
    const getServiceApi = useFunction(ApiService.getServiceByName)
    const search = useDebounce(valueSearch, 500);
    const drawerChooseService = useDrawer<Service>();
    useEffect(() => {
        const name = getFormData({name: search});
        getServiceApi.call(name);
    },[search])
    useEffect(() => {
        const fetchServices = async () => {
            const services = await handleGetServices(getServiceApi.data || []);
            setServices(services);
        };
    
        if (getServiceApi.data) {
            fetchServices();
        }
    }, [getServiceApi.data]);
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <LayoutPatientContext.Provider
                value={{
                    valueSearch,
                    service: drawerChooseService.data || initialService
                }}
            >
                <Stack 
                    spacing={2} 
                    sx = {{
                        height:"100%",
                        backgroundColor: '#f5f5f5',
                        padding: '10px',
                        position: "relative"
                    }}
                    
                >
                    <Stack
                        direction="row" 
                        spacing={2} 
                        justifyContent="space-between" 
                        alignItems="center"
                    >
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Box>
                                    <TextField
                                        id="outlined-basic" 
                                        placeholder='Tìm kiếm dịch vụ'
                                        variant="outlined" 
                                        onChange={(e) => setValueSearch(e.target.value)}
                                        onClick={() => setOpen(true)}
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
                        </ClickAwayListener>
                        <Box
                            sx = {{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <NotificationsActiveOutlinedIcon style={{fontSize: '30px'}}/>
                            
                                <AccountCircleIcon style={{fontSize: '30px'}}/>
                            <Typography color={"primary"} variant="body1">Bienvenido {user?.name}</Typography>
                        </Box>
                    </Stack>
                    {children}
                    {open && getServiceApi.data?.length && (
                                <Stack
                                    sx = {{
                                        position: "absolute",
                                        top: '60px',
                                    }}
                                >
                                    <SearchService 
                                        chooseService={(service) => {
                                            drawerChooseService.handleOpen(service);
                                        }}
                                        services={services || []}
                                    />
                                </Stack>
                    )}
                    <ServiceBooking
                        open={drawerChooseService.open}
                        onClose={drawerChooseService.handleClose}
                        service={drawerChooseService.data || initialService}
                    />
                </Stack>
            </LayoutPatientContext.Provider>
        </ClickAwayListener>
    )
}
export const useLayoutPatient = () => {
    return use(LayoutPatientContext);
}

export default LayoutPatientProvider;