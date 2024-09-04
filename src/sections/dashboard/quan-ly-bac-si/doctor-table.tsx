import {Doctor} from "src/types/doctors";
import getDoctorTableConfig from "./doctor-table-config"
import { Box, CircularProgress, Stack, styled, TableCell, TableRow, TextField, TextFieldProps, Typography } from "@mui/material";
import { CustomTable } from "src/components/custom-table";
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
    const doctorTableConfig = getDoctorTableConfig({
        editPatient: () => {},
        deletePatient: () => {}
    })
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
    </>
    )
}