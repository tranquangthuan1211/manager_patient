import { Avatar, Box, MenuItem, Stack, styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps } from "@mui/material";
import { CustomTable } from "src/components/custom-table";
import {getAppointmentConfigs} from "src/sections/appoitment/appointment-table-config";
import usePagination from "src/hooks/use-pagination";
import { Appointment } from "src/types/appointment";
import { useAppointment } from "src/contexts/appointments/appointment-context";
import { useDialog } from "src/hooks/use-dialog";
import { ConfirmDialog } from "src/components/confirm-dialog";
import useFunction from "src/hooks/use-function";
import DoctorApi from "src/api/doctor";
import { useEffect, useState } from "react";
import { Doctor, initialDoctor } from "src/types/doctors";
import {StatusAppointment} from "src/types/appointment";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
const AppointmentTable = (
    {
        appointments
    }: {
        appointments: Appointment[];
    }
) => {
  const pagination = usePagination({ count: 20 });
  const deleteDialog = useDialog<string>();
  const dialogChooseDoctor = useDialog<Partial<Appointment>>();
  const cancelAppointmentDialog = useDialog<string>();  
  const [doctorId, setDoctorId] = useState<Doctor>(initialDoctor);
  console.log(doctorId);
    const {completeAppointment, updateAppointment, deleteAppointment} = useAppointment();
    const configs = getAppointmentConfigs({
      completeAppointment: (request:Appointment) => completeAppointment(request),
      updateAppointment: (request:Appointment) => updateAppointment(request),
      deleteAppointment: (id:string) => deleteDialog.handleOpen(id),
      confirmAppointment: (appointment:Partial<Appointment>) => dialogChooseDoctor.handleOpen(appointment),
      cancelAppointment: (id:string) => cancelAppointmentDialog.handleOpen(id),
    }
    );
  const getDoctorApi = useFunction(DoctorApi.getDoctors);
  useEffect(() => {
    getDoctorApi.call(new FormData());
  }, []);
  
    return (
        <>
        <CustomTable
            configs = {configs}
            rows={appointments.slice(
                pagination.page * pagination.rowsPerPage,
                pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
            )} // replace with data
            additionalTopRow={
                <TableRow
                  sx={{
                    ".MuiTableCell-root": {
                      background: (theme) => theme.palette.neutral[100],
                    },
                  }}
                >
                 <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    //   value={filter.name}
                    //   onChange={(e) =>
                    //     onChangeFilter({ ...filter, name: e.target.value })
                    //   }
                    ></NoLabelTextField>
                  </TableCell>
      
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
      
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
                  <TableCell align="center"/>
                  <TableCell align="center"/>
                  <TableCell align="center"/>
                </TableRow>
              }
                
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
        <ConfirmDialog
          title="Xác nhận hủy lịch hẹn"
          open={cancelAppointmentDialog.open}
          onConfirm={() => {
            updateAppointment({_id:cancelAppointmentDialog.data as string,status:StatusAppointment.CANCELLED} as Appointment)
            cancelAppointmentDialog.handleClose()
          } }
          onCancel={cancelAppointmentDialog.handleClose}
          color="error"
          />
        <ConfirmDialog
          title="Xác nhận xóa lịch hẹn"
          open={deleteDialog.open}
          onConfirm={() => {deleteAppointment(deleteDialog.data as string)} }
          onCancel={deleteDialog.handleClose}
          color="error"
          />
        <ConfirmDialog
          title="Xác nhận hoàn thành lịch hẹn"
          open={dialogChooseDoctor.open}
          onConfirm={() => {
            updateAppointment({...dialogChooseDoctor.data,doctor_id:doctorId.id,doctor_name:doctorId.name,status:StatusAppointment.WAITING} as Appointment)
            dialogChooseDoctor.handleClose()
          }}
          onCancel={dialogChooseDoctor.handleClose}
          color="success"
          children={
            <Stack
              flexDirection={"row"}
              spacing={2}
            >
              <NoLabelTextField
                fullWidth
                // label={doctorId.id ? "Bac si" : "Chọn bác sĩ"}
                select
                value={doctorId.id}
                onChange={(e) => {
                  const selectedDoctor = (getDoctorApi?.data || []).find(
                    (doctor) => doctor.id === e.target.value
                  );
                  if (selectedDoctor) {
                    setDoctorId(selectedDoctor); // Lưu toàn bộ object Doctor vào state
                  }
                }}
              >
                {(getDoctorApi?.data || []).map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}
                  >
                    <Stack direction="row" alignItems="center"
                      spacing={2}
                     sx = {{
                      
                     }}
                    >
                        <Avatar src="" alt="A" />
                        <Box>
                          {doctor.name}
                        </Box>
                    </Stack>
                  </MenuItem>
                ))}
              </NoLabelTextField>
            </Stack>
          }
          />
    </>
    )
}

export default AppointmentTable;