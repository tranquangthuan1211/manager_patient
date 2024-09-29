import {Doctor} from "src/types/doctors";
import getDoctorTableConfig from "./doctor-table-config"
import { Box, CircularProgress, Stack, styled, TableCell, TableRow, TextField, TextFieldProps, Typography } from "@mui/material";
import { CustomTable } from "src/components/custom-table";
import { useDrawer } from "src/hooks/use-drawer";
import {DoctorUpdateDrawer} from "./doctor-drawer";
import { useDialog } from "src/hooks/use-dialog";
import { ConfirmDialog } from "src/components/confirm-dialog";
import { useDoctorsContext } from "src/contexts/doctors/doctor-context";
import { de } from "date-fns/locale";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface DoctorTableProps {
    doctors: Doctor[];
    filter: Partial<Omit<Doctor,"id">>;
    onChangeFilter: React.Dispatch<React.SetStateAction<Partial<Omit<Doctor, "ID">>>>;
}

export const DoctorTable = ({
    doctors,
    filter,
    onChangeFilter
}: DoctorTableProps) => {
    const updateDoctorDrawer = useDrawer<Doctor>();
    const deleteDialog = useDialog<string>();
    const doctorTableConfig = getDoctorTableConfig({
        editPatient: (data:Doctor) => updateDoctorDrawer.handleOpen(data),
        deletePatient: (id:string) => deleteDialog.handleOpen(id)
    })
    const {deleteDoctor} = useDoctorsContext();
    console.log(updateDoctorDrawer.data);
    return (
    <>
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            my: 3,
            mx: 3,
            height: "20px",
            }}
        >
            <Stack flex={1} spacing={doctors.length}>
            <Typography variant="h6" sx={{ flex: 1 }}>
                Danh sách tài khoản: {6}
            </Typography>
            </Stack>
        </Box>
        <>
            <CustomTable
                configs={doctorTableConfig}
                rows={doctors}
                additionalTopRow={
                    <TableRow
                    sx={{
                        ".MuiTableCell-root": {
                        background: (theme) => theme.palette.neutral[100],
                        },
                    }}
                    >
                    <TableCell />
        
                    <TableCell align="center">
                        <NoLabelTextField
                        fullWidth
                        value={filter.name}
                        onChange={(e) =>
                            onChangeFilter({ ...filter, name: e.target.value })
                        }
                        ></NoLabelTextField>
                    </TableCell>
        
                    <TableCell align="center">
                        <NoLabelTextField
                        fullWidth
                        value={filter.address}
                        onChange={(e) =>
                            onChangeFilter({
                            ...filter,
                            address: e.target.value,
                            })
                        }
                        ></NoLabelTextField>
                    </TableCell>
        
                    <TableCell align="center">
                        <NoLabelTextField
                        fullWidth
                        value={filter.address}
                        onChange={(e) =>
                            onChangeFilter({
                            ...filter,
                            address: e.target.value,
                            })
                        }
                        ></NoLabelTextField>
                    </TableCell>
                    <TableCell align="center">
                        <NoLabelTextField
                        fullWidth
                        value={filter.address}
                        onChange={(e) =>
                            onChangeFilter({
                            ...filter,
                            address: e.target.value,
                            })
                        }
                        ></NoLabelTextField>
                    </TableCell>
                    <TableCell align="center">
                        <NoLabelTextField
                        fullWidth
                        value={filter.address}
                        onChange={(e) =>
                            onChangeFilter({
                            ...filter,
                            address: e.target.value,
                            })
                        }
                        ></NoLabelTextField>
                    </TableCell>
                    </TableRow>
                }
            /> 
        </>
        <DoctorUpdateDrawer
            open={updateDoctorDrawer.open}
            onClose={updateDoctorDrawer.handleClose}
            doctor={updateDoctorDrawer.data}
        />
        <ConfirmDialog
            onConfirm={() => {
                if (deleteDialog.data) {
                    deleteDoctor(deleteDialog.data);
                    deleteDialog.handleClose();
                }
            }}
            onCancel={deleteDialog.handleClose}
            open={deleteDialog.open}
            title="Xác nhận xóa"
            content="Bạn có chắc chắn muốn xóa bác sĩ này?"
        />
    </>
    )
}