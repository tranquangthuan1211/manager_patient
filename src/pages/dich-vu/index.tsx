import { Box, Stack, Typography } from '@mui/material';
import {Layout} from 'src/layouts';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import { type Page as PageType } from 'src/types/page';

const Page: PageType = () => {
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
                    </Box>
                }
            />
            <Typography variant="body1">Số lượng dịch vụ</Typography>
        </Stack>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page;