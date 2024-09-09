import { Page as PageType } from 'src/types/page';
import { Layout } from 'src/layouts/index';
import { LayoutPatient } from 'src/layouts/patient/patient-layout';
import Map from 'src/sections/appoitment/map-box/map';
import { Stack, useMediaQuery } from '@mui/material';
import SearchService from 'src/sections/appoitment/service/service-search';
import { useDrawer } from 'src/hooks/use-drawer';
import { useEffect, useMemo, useState } from 'react';
import ServiceBooking from 'src/sections/appoitment/service/service-booking';
import useFunction from 'src/hooks/use-function';
import ApiService from 'src/api/services';
import {useDebounce} from 'src/hooks/use_debounce';
import { Service } from 'src/types/service';
import { getFormData } from 'src/api/api-requests';
import {handleGetServices} from 'src/types/service';
import {ClickAwayListener} from '@mui/material';
const Page: PageType = () => {
    const destinationLat= 10.859603;
    const destinationLon = 106.779813;
    const [searchService, setSearchService] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const drawerChooseService = useDrawer<Service>();
    const valueSearch = useDebounce(searchService, 500);
    const getServiceApi = useFunction(ApiService.getServiceByName);
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const name = getFormData({name: valueSearch});
        getServiceApi.call(name);
    },[valueSearch])
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
            <LayoutPatient onSearchService={setSearchService} onOpen={setOpen}>
                <Stack 
                    spacing={2}
                    sx={{
                        width: "100%",
                        height: "700px",
                        overflow: "hidden",
                        position: "relative"
                    }}
                    onClick = {() => setOpen(false)}
                    overflow="hidden"
                >
            
                    <Stack
                        sx = {{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            position: "relative"
                        }}
                    >
                        <h1>Đường đi từ Bạn đến phòng khám</h1>
                        <Map destinationLat={destinationLat} destinationLon={destinationLon}/>
                    </Stack>
                    {open && getServiceApi.data?.length && (
                        <Stack
                            sx = {{
                                position: "absolute",
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
                </Stack>
                <ServiceBooking
                    open={drawerChooseService.open}
                    onClose={drawerChooseService.handleClose}
                    service={drawerChooseService.data}
                />
            </LayoutPatient>
        </ClickAwayListener>
    )
}

Page.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Page;
