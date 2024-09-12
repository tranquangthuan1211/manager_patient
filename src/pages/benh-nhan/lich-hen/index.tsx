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


const Page: PageType = () => {
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

                    {/* Ngày và Thời gian */}
                    <Stack spacing={1} sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarTodayIcon />
                        <Typography variant="body2">22 October, 2023</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon />
                        <Typography variant="body2">08:00 AM - 10:30 AM</Typography>
                    </Stack>
                    </Stack>
                </CardContent>
        {/* Thông tin Bác sĩ */}
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
            {/* trangj thai */}
            <OrderProgress />
        </Stack>
    )
}

Page.getLayout = (page) => (
    <Layout>
        <LayoutPatientProvider>
            {page}
        </LayoutPatientProvider>
    </Layout>
)

export default Page;
