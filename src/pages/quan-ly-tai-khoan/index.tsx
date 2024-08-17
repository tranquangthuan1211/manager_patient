import {FC, useState} from 'react';
import {Layout} from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import {Stack,Box, Button, Tabs, Tab} from '@mui/material';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import { Add, UploadFile } from '@mui/icons-material';
import AccountAdministrator from 'src/sections/dashboard/quan-ly-tai-khoan/account-administrators';
import AccountPatient from 'src/sections/dashboard/quan-ly-tai-khoan/account-patient-management';
import { useDrawer } from 'src/hooks/use-drawer';
import {AccountUploadSection} from 'src/sections/dashboard/quan-ly-tai-khoan/account-upload-section';
import UsersProvider from 'src/contexts/users/users-context';
import AccountProvider from 'src/contexts/accounts/account-context';
import { useAuth } from 'src/hooks/use-auth';
let tabs = [
    {
      label: "Tài khoản bệnh nhân",
      key: "tài khoản bệnh nhân",
    },
    {
      label: "Tài khoản bác sĩ",
      key: "Tài khoản bác sĩ",
    },
    {
      label: "Tài khoản quản trị viên",
      key: "Tài khoản quản trị viên",
    }
];
const Page: PageType = () => {
    const auth = useAuth();
    const [type, setType] = useState("patient");
    const [tab, setTab] = useState(tabs[0].key);
    const uploadDrawer = useDrawer();
    return (
    <Stack>
        <ContentHeader
            title="Quản lý tài khoản"
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
                  onClick={() => {
                    if (tab === tabs[1].key) {
                      setType("doctor");
                    } else if (tabs.length === 3 && tab === tabs[2].key) {
                      setType("admin");
                    }
                    else {
                      setType("user");
                    }
                    uploadDrawer.handleOpen();
                  }}
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
        tabs={
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={tab}
                onChange={(_, value) => setTab(value)}
                sx={{ height: "48px" }}
            >
                {tabs.map((tab) => (
                <Tab key={tab.key} label={tab.label} value={tab.key} />
                ))}
            </Tabs>
        }
        />  
        {tab === tabs[0].key && (
            <AccountPatient
                filter={{}}
                setFilter={() => {}}
            />
        )}  
        <UsersProvider>
          <AccountUploadSection
              open={uploadDrawer.open}
              onClose={uploadDrawer.handleClose}
              type={type}
          /> 
        </UsersProvider>  
    </Stack>
    )
}
Page.getLayout = (page) => (
  <Layout>
    <AccountProvider>
      {page}
    </AccountProvider>
  </Layout>
)
export default Page;