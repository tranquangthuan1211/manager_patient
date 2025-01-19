
import dynamic from "next/dynamic";
import { useState, useRef, useMemo, use, useEffect } from "react";
import { Layout } from "src/layouts/index";
import { type Page as PageType } from "../types/page";
import { 
  Stack, 
  Box,
  MenuItem, 
  TextField,CircularProgress, Button } from "@mui/material";
import { PiFunnelBold,PiMicrosoftExcelLogoBold } from "react-icons/pi";
import {StatHeaderPage} from "src/sections/thong-ke/stat-header-page";
import {Patient} from "src/types/patients";
import CustomDrawer from "src/components/custom-drawer";
import {PaitientTable} from "src/sections/benh-nhan/patients-table";
import PaitientProvider from "src/contexts/paitient/paitient-context";
import {patientFilterFunction} from "src/types/patients";
import {usePatientsContext} from "src/contexts/paitient/paitient-context";
import {categorizedPatientsByYear} from "src/types/patients";
const StatCustomerSummary = dynamic(
  () =>
    import(
      "src/sections/thong-ke/stat-customer-summary"
    ).then((module) => module.StatCustomerSummary),
  { ssr: false, loading: () => <CircularProgress sx={{ m: 2 }} /> }
);
const StatPageContainer = dynamic(
  () =>
    import(
      "src/sections/thong-ke/stat-page-container"
    ).then((module) => module.StatPageContainer),
  { ssr: false, loading: () => <CircularProgress sx={{ m: 2 }} /> }
);
const Page: PageType = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const paitienYear = [
    {value: 2021, label: 2021},
    {value: 2022, label: 2022},
    {value: 2024, label: 2024},
    {value: 2025, label: 2025},
  ]
  const patientMonth = [
    {value: 1, label: "Tháng 1"},
    {value: 2, label: "Tháng 2"},
    {value: 3, label: "Tháng 3"},
    {value: 4, label: "Tháng 4"},
    {value: 5, label: "Tháng 5"},
    {value: 6, label: "Tháng 6"},
    {value: 7, label: "Tháng 7"},
    {value: 8, label: "Tháng 8"},
    {value: 9, label: "Tháng 9"},
    {value: 10, label: "Tháng 10"},
    {value: 11, label: "Tháng 11"},
    {value: 12, label: "Tháng 12"},
  ]
  const [filter, setFilter] = useState<Partial<Patient>>({
    status: "all",
    consulting_day: "",
  });
  const [open,setOpen] = useState<boolean>(false)
  const [consultingDay, setConsultingDay] = useState<string>("");
  const {getPatientsApi} = usePatientsContext()
  const patients:Patient[] = useMemo(() => {
    return getPatientsApi.data?.data || [];
  },[getPatientsApi.data])
  console.log(patients)
  const patientFilter:Patient[] = useMemo(() => {
    return patients.filter((patient) => patientFilterFunction(patient,filter));
  },[filter,patients])
  const categorizedPatientByMonth = categorizedPatientsByYear(patientFilter);
// useEffect(() => {
//   console.log(patientFilter)
// },[patientFilter])
  return (
    <>
      <StatPageContainer open = {true}>
        <StatHeaderPage
          patients = {patients || []}
          filter = {filter}
          setFilter = {setFilter}
        />
      </StatPageContainer>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            right: 0,
            top: 0,
            overflow: "hidden",
          }}
        >
          <StatPageContainer open={true}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="secondary"
                    onClick={() => setOpen(!open)}
                    variant="contained"
                    startIcon={<PiFunnelBold />}
                  >
                    Bộ lọc
                  </Button>
                  <Button
                    color="success"
                    // onClick={handleExport}
                    variant="contained"
                    startIcon={<PiMicrosoftExcelLogoBold />}
                  >
                    Xuất Excel
                  </Button>
                  <TextField
                    label="Tìm kiếm bệnh nhân"
                    variant="outlined"
                    sx={{
                      width: "600px",
                      float: "right",
                    }}
                  />
                </Stack>
              </Stack>
              <StatCustomerSummary
                chartSeries={[
                  {
                    name: `Bệnh nhân ngày ${consultingDay}`,
                    data: [
                      categorizedPatientByMonth.january.length,
                      categorizedPatientByMonth.february.length,
                      categorizedPatientByMonth.march.length,
                      categorizedPatientByMonth.april.length,
                      categorizedPatientByMonth.may.length,
                      categorizedPatientByMonth.june.length,
                      categorizedPatientByMonth.july.length,
                      categorizedPatientByMonth.august.length,
                      categorizedPatientByMonth.september.length,
                      categorizedPatientByMonth.october.length,
                      categorizedPatientByMonth.november.length,
                      categorizedPatientByMonth.december.length,
                    ],
                  },
                ]}
              />
                <PaitientTable
                  patients = {patientFilter || []}
                />
            </Stack>
          </StatPageContainer>
          <CustomDrawer
            DrawerProps={
              {
                anchor: "right",
                open: open,
                onClose: () => setOpen(false),
                sx: {
                  width: 300,
                },
              }
            }
            title="Bộ lọc"
            subtitle="Lọc dữ liệu báo cáo theo điều kiện"
            children = {
              <Box
                sx = {{
                  width: "360px",
                  px: 2,
                }}
              >
                <TextField
                  label="chọn năm"
                  select
                  sx = {{
                    width:"100%",
                    margin:'4px'
                  }}
                  onChange={(e) => setConsultingDay(e.target.value)}
                >
                {paitienYear.map((item) => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
                </TextField>
                <TextField
                  label="Chọn tháng "
                  select
                  sx = {{
                    width:"100%",
                    margin:'4px'
                  }}
                  onChange={(e) => setConsultingDay(`${e.target.value}/${consultingDay}`)}
                >
                  {patientMonth.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                  ))}
                </TextField>
              </Box>
            }
            onSubmit={() => {
              setFilter({status: filter.status, consulting_day: consultingDay});
              setConsultingDay("")
              setOpen(false)
            }}
          />
        </Box>
      </Box>
    </>
    );
}

Page.getLayout = (page) => 
  <Layout>
    <PaitientProvider>
      {page}
    </PaitientProvider>
  </Layout>

export default Page;