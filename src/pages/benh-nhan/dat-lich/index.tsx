import { Page as PageType } from 'src/types/page';
import { Layout } from 'src/layouts/index';
import Map from 'src/sections/appoitment/map-box/map';
import { Stack, Typography} from '@mui/material';
import LayoutPatientProvider from 'src/contexts/layout-patients/layout-patient-context';
import AppointmentProvider from "src/contexts/appointments/appointment-context";


const Page: PageType = () => {
    const destinationLat= 10.859603;
    const destinationLon = 106.779813;
    
    return (
        <Stack 
            spacing={2}
            sx={{
                width: "100%",
                height: "700px",
                overflow: "hidden",
                position: "relative"
            }}
        >
            
            <Stack
                sx = {{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative"
            }}
            >
                <Typography>Đường đi từ Bạn đến phòng khám</Typography>
                <Map destinationLat={destinationLat} destinationLon={destinationLon}/>
            </Stack>
        </Stack>
    )
}

Page.getLayout = (page) => (
    <Layout>
        <AppointmentProvider>
            <LayoutPatientProvider>
                {page}
            </LayoutPatientProvider>
        </AppointmentProvider>
    </Layout>
)

export default Page;
