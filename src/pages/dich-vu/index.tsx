import { useMemo } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import {Layout} from 'src/layouts';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import { type Page as PageType } from 'src/types/page';
import ServiceProvider, {useService} from 'src/contexts/services/service-context';
import {ServiceTable} from 'src/sections/service/service-table';
import { useDrawer } from 'src/hooks/use-drawer';
import ServiceEditDrawer from 'src/sections/service/service-drawer';
import AccountProvider from 'src/contexts/accounts/account-context';

const Page: PageType = () => {
  const {getServiceClinicApi} = useService();
  const listServiceClinic = useMemo(() => getServiceClinicApi.data?.data || [], [getServiceClinicApi.data?.data]);
  console.log(listServiceClinic);
  const creatDrawer = useDrawer();
  return (
        <Stack spacing={3}>
            <ContentHeader
                title="Dịch vụ khám bệnh"
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
                        <Button
                            color="inherit"
                            variant="contained"
                            onClick={() => creatDrawer.handleOpen()}
                        >
                            Thêm dịch vụ
                        </Button>
                    </Box>
                }
            />
            <Typography variant="body1">Số lượng dịch vụ {listServiceClinic?.length}</Typography>
            <ServiceTable services={listServiceClinic || []}/>
            <ServiceEditDrawer 
                open={creatDrawer.open}
                onClose={creatDrawer.handleClose}
            />
        </Stack>
  )
}

Page.getLayout = (page) => 
<Layout>
    <AccountProvider>
        <ServiceProvider>
            {page}
        </ServiceProvider>
    </AccountProvider>
</Layout>

export default Page;