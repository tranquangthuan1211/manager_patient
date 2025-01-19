import { type Page as PageType } from 'src/types/page';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import PatientProvider, {usePatientsContext} from 'src/contexts/paitient/paitient-context';
import DiseaseProvider, {useDiseaseContext} from 'src/contexts/diseases/disease-context';
import {Layout} from 'src/layouts';
import { Button, Stack, Box, TablePagination } from '@mui/material';
import { Add, UploadFile } from '@mui/icons-material';
import { useMemo } from 'react';
import {PatientTableDetail} from 'src/sections/dashboard/chi-tiet-benh-nhan/patient-table-detail';
import usePagination from 'src/hooks/use-pagination'
const Page:PageType = () => {
    // const {getPatientsApi} = usePatientsContext()
    const {getDiseasesApi} = useDiseaseContext()
    const {getPatientsApi} = usePatientsContext()
    const patients = useMemo(() => {
      return getPatientsApi.data?.data || [];
    },[getPatientsApi])
    const data = useMemo(() => {
        return getDiseasesApi.data?.data || [];
    },[getDiseasesApi])
    const pagination = usePagination({ count: 20 });
    // console.log(data)
    return (
        <Stack
          spacing={3}
        >
            <ContentHeader
                title="Bệnh nhân"
                rightSection={
                <Box
                    sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    height: "40px",
                    }}
                >
                {
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<UploadFile />}
                      // onClick={() => {
                      //   if (tab === tabs[1].key) {
                      //     setType("doctor");
                      //   }
                      //   else {
                      //     setType("user");
                      //   }
                      //   uploadDrawer.handleOpen();
                      // }}
                    >
                      Import danh sách TK
                    </Button>
    
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={() => {
                        // accountsAddDrawer.handleOpen();
                      }}
                    >
                      Thêm tài khoản
                    </Button>
                  </>
                }
                </Box>
              }
            />
            <PatientTableDetail
                patients={patients}
                filter={{}}
                onChangeFilter={() => {}}
            />
            
            <TablePagination
              component="div"
              {...pagination}
              rowsPerPageOptions={[5, 10, 25, 100]}
              sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
                bgcolor: "secondary.lightest",
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            />
        </Stack>
    )
}
Page.getLayout = (page) => 
  <Layout>
    <PatientProvider>
      <DiseaseProvider>
        {page}
      </DiseaseProvider>
    </PatientProvider>
  </Layout>

export default Page;
