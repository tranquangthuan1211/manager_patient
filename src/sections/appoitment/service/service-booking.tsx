import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Paper,
  Typography,
  Button,
  TextField,
  TextFieldProps,
  Tabs,
  Tab,
  MenuItem,
} from "@mui/material";
import { Stack, spacing, styled } from "@mui/system";
import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AppointmentApi from "src/api/appointments";
import useFunction from "src/hooks/use-function";
import { Service } from "src/types/service";
import {Calendar} from "./date-picker"
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {useFormik} from 'formik';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "8px",
  },
}));

function ServiceBooking({
  open,
  onClose: onCloseParam,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service: Service;
}) {
  const onClose = () => {
    onCloseParam();
  };
  const [timeBooking, setTime] = useState<string | "">("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const createAppointment = useFunction(AppointmentApi.createAppointment);
  const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      time: "",
    },
    onSubmit: async (values) => {
      try {
        // console.log({clinic_id:service.clinic_id,timeBooking, selectedDate});
        const response = await AppointmentApi.createAppointment({clinic_id:service.clinic_id,time:timeBooking, date:selectedDate, status:"Đang Đợi Khám"})
        if(response) {
          showSnackbarSuccess("Đặt lịch thành công")
        }
        onClose();
      }
      catch (error) {
        showSnackbarError(error);
      }
    },
  });
  // console.log(service);
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: 500,
          },
        }}
        onClose={onClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <ArrowBack
                      fontSize="small"
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Quay lại
                  </Typography>
                </Box>
                <Typography variant="h6">
                  Đặt dịch hẹn
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Button color="inherit" variant="contained" onClick={onClose}>
                  Hủy bỏ
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Đặt lịch
                </Button>
              </Box>
            </Box>
          </Paper>

          <Stack spacing={2} direction={"column"} p={"24px"}>
              <Box
                sx = {{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  padding: "8px",
                }}
              >
                <CalendarTodayIcon/>
                <Typography variant="h6">Chọn ngày</Typography>
              </Box>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
              <Box>
                <WatchLaterIcon/>
                <Typography variant="h6">Chọn giờ</Typography>
              </Box>
              <Stack direction="row" spacing={2}>
              {['09:00', '11:00', '13:00', '15:00', '17:00'].map((time) => (
                <Button 
                  key={time} variant="outlined"
                  onClick={() => setTime(time)}
                  sx={{
                    bgcolor: timeBooking === time ? 'primary.main' : 'background.paper',
                    color: timeBooking === time ? 'common.white' : 'text.primary',
                    "&:hover": {
                      color: 'white',
                      backgroundColor:"blue"
                    }
                  }}
                >
                  {time}
                </Button>
              ))}
            </Stack>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default ServiceBooking;
