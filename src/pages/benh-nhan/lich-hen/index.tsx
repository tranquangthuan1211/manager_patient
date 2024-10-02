import { Page as PageType } from 'src/types/page';
import { Layout } from 'src/layouts/index';
import Map from 'src/sections/appoitment/map-box/map';
import { Avatar, Card, CardContent, IconButton, Stack, Step, StepIconProps, StepLabel, Stepper, Typography} from '@mui/material';
import LayoutPatientProvider from 'src/contexts/layout-patients/layout-patient-context';
import { EditIcon } from 'lucide-react';
import { Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OrderProgress from 'src/sections/appoitment/process/process';
import AppointmentProvider, {useAppointment} from 'src/contexts/appointments/appointment-context';
import { useEffect, useMemo } from 'react';
import { format, compareAsc } from "date-fns";
import { Appointment } from 'src/types/appointment';
import App from 'next/app';

const Page: PageType = () => {
    const {getAppointment} = useAppointment();
    const appointment = useMemo(() => getAppointment.data, [getAppointment]) as Appointment;
    console.log(appointment);
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
            <Card sx={{ borderRadius: 4, p: 2, backgroundColor: '#6D4FCE', color: '#fff', maxWidth: "100%" }}>
                <CardContent>
                    {/* Thông tin Lịch hẹn */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Appointment</Typography>
                    <IconButton sx={{ color: '#fff' }}>
                        <EditIcon />
                    </IconButton>
                    </Stack>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarTodayIcon />
                        <Typography variant="body2"></Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon />
                        <Typography variant="body2">{appointment?.time}</Typography>
                    </Stack>
                    </Stack>
                </CardContent>
                <Box sx={{ backgroundColor: '#fff', color: '#000', borderRadius: 3, p: 2, mt: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        alt="Doctor Avatar"
                        src="https://via.placeholder.com/150"
                        sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Dr. Richar Kandowen</Typography>
                        <Typography variant="body2" color="textSecondary">Child Specialist</Typography>
                    </Box>
                    <IconButton sx={{ color: '#000', ml: 'auto' }}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    </Stack>
                </Box>
            </Card>
            <OrderProgress />
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
