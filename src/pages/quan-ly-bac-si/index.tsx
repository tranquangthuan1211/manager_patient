import { type Page as PageType } from 'src/types/page';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import PatientProvider, {usePatientsContext} from 'src/contexts/paitient/paitient-context';
import DiseaseProvider, {useDiseaseContext} from 'src/contexts/diseases/disease-context';
import {Layout} from 'src/layouts';
import { Button, Stack, Box, TablePagination } from '@mui/material';
import { Add, UploadFile } from '@mui/icons-material';
import { use, useEffect, useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination'
import DoctorProvider, { useDoctorsContext } from 'src/contexts/doctors/doctor-context';
import {DoctorTable} from  'src/sections/dashboard/quan-ly-bac-si/doctor-table'
const Page:PageType = () => {
    const {getDoctorsApi} = useDoctorsContext()
    const doctors = useMemo(() =>{

      return getDoctorsApi.data || []
    },
    [getDoctorsApi.data]);
    useEffect(() => {
      console.log(getDoctorsApi)
      console.log(doctors)
    }, [doctors]);
    const pagination = usePagination({ count: 20 });
    // console.log(data)
    return (
        <Stack
          spacing={3}
        >
            <ContentHeader
                title="Bác sĩ"
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
            <DoctorTable 
              filter={{}}
              onChangeFilter={() => {}}
              doctors={doctors} 
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
    <DoctorProvider>
      {page}
    </DoctorProvider>
  </Layout>

export default Page;
