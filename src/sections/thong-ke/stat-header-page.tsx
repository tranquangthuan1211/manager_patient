
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
import React from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import {green,warning,error,black} from "src/theme/colors"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
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
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const tabs = [
    {label:"all",number: patients.length, title: "Tổng bệnh nhân",data:data,color: green.dark},
    {label:"đang đợi",number: categorizedPatients.wait.length, title: "cuộc hẹn",data:data,color: warning.main},
    {label:"đã điều trị",number: categorizedPatients.completed.length, title: "đã điều trị", data:data,color: green.main},
    {label:"totalEarn",number: 0, title: "Tổng thu nhập", data:data,color: error.dark},
  ]
    return (
    <Box>
      <Box>
        <Typography variant="h5">Thống kê</Typography>
        <Stack
          flexDirection="row"
          overflow={"hidden"}
        >
          {tabs.map((item) => (
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
                  backgroundColor:filter.status === item.label ? "black" : "white",
                  width: 256,
                  ":hover": {
                    opacity: 0.8,
                  }
                },
              }}
              variant="persistent"
              sx={{ margin: 1}}
              onClick={() => setFilter({status: item.label})}
            >
              <Stack
                sx = {{
                  p: 2,
                }}
              >
                <Box
                  sx = {{
                    display:"flex",
                    width: 200,
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginBottom: 2,
                  }}
                >
                  <PeopleOutlineIcon sx={{ color: item.color.toString() }}/>
                  <Typography 
                    variant="h6"
                    sx = {{
                      color:filter.status === item.label ? "white" : "black",
                    }}
                  >{item.title}</Typography>
                </Box>
                <Box
                  sx = {{
                    display:"flex",
                    width: "90%",
                    height: 100,
                    bgcolor: "secondary.light",
                    borderRadius: 2.5,
                    padding: 1,
                    alignItems: "center",

                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={10} data={data}>
                      <Bar dataKey="uv" fill={item.color.toString()}/>
                    </BarChart>
                  </ResponsiveContainer>
                  <Box
                    sx = {{
                      height: 100,
                      alignItems: "space-between",
                    }}
                  >
                    <Typography variant="h6">{item.number}</Typography>
                    <TrendingDownIcon sx = {{color: item.color.toString() }}/>
                  </Box>
                </Box>
              </Stack>
            </Drawer>
          ))}
        </Stack>
      </Box>
    </Box>
    )
}