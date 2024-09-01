import {useState} from 'react';
import {Layout} from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import {Stack,Box, Button, Tabs, Tab} from '@mui/material';
import ContentHeader from 'src/sections/dashboard/quan-ly-tai-khoan/content-header';
import { Add, UploadFile } from '@mui/icons-material';
import AccountPatient from 'src/sections/dashboard/quan-ly-tai-khoan/account-patient-management';
import { useDrawer } from 'src/hooks/use-drawer';
import {AccountUploadSection} from 'src/sections/dashboard/quan-ly-tai-khoan/account-upload-section';
import AccountDoctor from 'src/sections/dashboard/quan-ly-tai-khoan/account-doctor-management';
import AccountProvider from 'src/contexts/accounts/account-context';
import  AccountManager from "src/sections/dashboard/quan-ly-tai-khoan/account-manager-management"
import { useAuth } from 'src/hooks/use-auth';
import PermissionPage from 'src/components/permision-page';
import {AccountAddDrawer} from 'src/sections/dashboard/quan-ly-tai-khoan/account-add-drawer';
let tabs = [
    {
      label: "Tài khoản bệnh nhân",
      key: "tài khoản bệnh nhân",
    },
    {
      label: "Tài khoản bác sĩ",
      key: "Tài khoản bác sĩ",
    },
];
const Page: PageType = () => {
    const {user} = useAuth();
    const [type, setType] = useState("patient");
    const [tab, setTab] = useState(tabs[0].key);
    const uploadDrawer = useDrawer();
    const accountsAddDrawer = useDrawer();
    if(user?.role !== "admin"){
      return (
        <PermissionPage/>
      )
    }
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
                    }
                    else {
                      setType("patient");
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
                    accountsAddDrawer.handleOpen();
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
                {user?.role === "admin" && (
                  <Tab key="admin" label="Tài khoản quản trị" value="admin" />
                )}
            </Tabs>
        }
        />  
        {tab === tabs[0].key && (
            <AccountPatient
                filter={{}}
                setFilter={() => {}}
            />
        )}  
        {tab === tabs[1].key && (
            <AccountDoctor
                filter={{}}
                setFilter={() => {}}
            />
        )}
        {user?.role === "admin" && tab === "admin" &&(
            <AccountManager
              filter = {{}}
              setFilter={() => {}}
            />
        )} 

        <AccountUploadSection
              open={uploadDrawer.open}
              onClose={uploadDrawer.handleClose}
              type={type}
        />
        <AccountAddDrawer
            open={accountsAddDrawer.open}
            onClose={accountsAddDrawer.handleClose}
        />  
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