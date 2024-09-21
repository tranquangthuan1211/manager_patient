import { useMemo } from "react";
import {type Page as PageType} from "src/types/page";
import { Layout } from "src/layouts";
import AppointmentProvider, {useAppointment} from "src/contexts/appointments/appointment-context";
import ContentHeader from "src/sections/dashboard/quan-ly-tai-khoan/content-header";
import { Box, Button, Stack, Typography } from "@mui/material";
import AppointmentTable from "src/sections/appoitment/appointment-table";
import { downloadUrlOut } from "src/utils/url-handler";

const Page: PageType = () => {
    const { getAppointments } = useAppointment();
    const listAppointments = useMemo(() => getAppointments.data?.data || [], [getAppointments]);
    return (
        <Stack spacing = {2}>
            <ContentHeader
                title="Lịch hẹn"
                rightSection={
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                            height: "40px",
                            padding: "0 16px",
                        }}
                    >
                    </Box>
                }
            />
            <Button
             onClick={() => downloadUrlOut("https://pethouse.com.vn/wp-content/uploads/2023/10/smile.jpg", "anh.jpg")}
            >
                Tai anh ve
            </Button>
            <Typography variant="body1">Số lượng lịch hẹn {listAppointments?.length || 0}</Typography>
            <AppointmentTable appointments={listAppointments} />
        </Stack>
    )
}
Page.getLayout = (page) => 
<Layout>
    <AppointmentProvider>
        {page}
    </AppointmentProvider>
</Layout>
export default Page;