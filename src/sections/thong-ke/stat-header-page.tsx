
import { use, useEffect, useMemo } from "react";
import {format} from "date-fns";
import {
    Box,
    Drawer,
    Stack,
    Typography
} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Patient } from "src/types/patients";
import {patientFilterFunction, categorizePatientsByStatus} from "src/types/patients";
interface StatHeaderPageProps {
  patients: Patient[];
  filter: Partial<Patient>;
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
}
export const StatHeaderPage = (
  {
    patients,
    filter,
    setFilter
  }: StatHeaderPageProps
) => {
  const categorizedPatients = useMemo(() => categorizePatientsByStatus(patients), [patients]);
  useEffect(() => {
    console.log(categorizedPatients);
  }, [categorizedPatients]);
  const tab = [
    {label:"all",number: patients.length, title: "Tổng bệnh nhân"},
    {label:"Đã khám",number: categorizedPatients.completed.length, title: "Đã khám"},
    {label:"đang điều trị",number: categorizedPatients.inTreatment.length, title: "đang điều trị"},
    {label:"Điều trị tại nhà",number: categorizedPatients.homeTreatment.length, title: "Điều trị tại nhà"},
  ]
    return (
    <Box>
      <Box>
        <Typography variant="h5">Thống kê</Typography>
        <Stack
          flexDirection="row"
          overflow={"hidden"}
        >
          {tab.map((item) => (
            <Drawer
              key={item.label}
              anchor="left"
              open={true}
              PaperProps={{
                elevation: 16,
                sx: {
                  border: "none",
                  borderRadius: 2.5,
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor:filter.status === item.label ? "primary.main" : "white",
                  width: 240,
                  height:100,
                  ":hover": {
                    opacity: 0.8,
                  }
                },
              }}
              variant="persistent"
              sx={{ p: 2}}
              onClick={() => setFilter({status: item.label})}
            >
              <Box
                sx = {{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-around',
                  padding: '18px',
                }}
              >
                <Box>
                  <PersonOutlineIcon
                    sx = {{
                      fontSize: '40px',
                      color: filter.status?.toLowerCase() === item.label.toLowerCase() ? "white" : "primary.main",
                    }}
                  />
                </Box>
                <Box>
                  <Typography 
                    variant="h5"
                    color= {filter.status?.toLowerCase() === item.label.toLowerCase() ? "white" : "primary.main"}
                  >{item.number}</Typography>
                  <Typography variant="h6">{item.title}</Typography>
                </Box>
              </Box>
            </Drawer>
          ))}
        </Stack>
      </Box>
    </Box>
    )
}