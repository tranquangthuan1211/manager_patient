import { useMemo } from 'react';
import { Layout } from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import ComplaintProvider, {useComplaintContext} from 'src/contexts/complaints/complaint-context';
import { Box, Stack, Typography } from '@mui/material';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import {ComplaintTable} from 'src/sections/complaint/complaint-table';

const Page:PageType = () => {
    const {getComplaintsApi} = useComplaintContext()
    console.log(getComplaintsApi)
    const listComplaints = useMemo(() => {
        return getComplaintsApi.data || []
    },[getComplaintsApi])
    return (
        <Stack spacing = {3}> 
            <ContentHeader
                title="Khiếu nại bệnh nhân"
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
            <Typography variant="body1">Số lượng khiếu nại {listComplaints?.length || 0}</Typography>
            <ComplaintTable
                complaints = {listComplaints}
            />
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    <ComplaintProvider>
        {page}
    </ComplaintProvider>
</Layout>

export default Page;