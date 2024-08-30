import {FC, ReactNode} from 'react';
import {Patient} from 'src/types/patients';
import {getTablePatientDetailConfigs} from './patient-table-detail-config';
import { CustomTable } from 'src/components/custom-table';
import { styled, TableCell, TableRow, TextField, TextFieldProps } from '@mui/material';
import {DiseasePatientDrawer} from './disease-patient-drawer';
import { useDrawer } from 'src/hooks/use-drawer';
import { Disease } from 'src/types/diseases';
import PatientEditDrawer from './patient-table-detail-drawer';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import { useDialog } from 'src/hooks/use-dialog';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface PatientDetailProps {
    patients: Patient[];
    filter: Partial<Omit<Patient, "id">>;
    onChangeFilter: React.Dispatch<React.SetStateAction<Partial<Omit<Patient, "id">>>>;
}

export const PatientTableDetail: FC<PatientDetailProps> = ({
    patients,
    filter,
    onChangeFilter
}) => {
    const editDrawer = useDrawer<Patient>();
    const deleteDialog = useDialog<Patient>();
    const patientTableDetailConfigs = getTablePatientDetailConfigs(
        {
            editDrawer: (data:Patient) => editDrawer.handleOpen(data),
            deleteDialog: (data:Patient) => deleteDialog.handleOpen(data)
        }
    );
    // console.log(editDrawer.data);
    return (
        <>
            <CustomTable
                configs={patientTableDetailConfigs}
                rows={patients}
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
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                }
            />
            <PatientEditDrawer
                open={editDrawer.open}
                onClose={editDrawer.handleClose}
                patient = {editDrawer.data}
            />
            <ConfirmDialog
                onCancel={deleteDialog.handleClose}
                onConfirm={() => {
                    deleteDialog.data && console.log(deleteDialog.data)
                }}
                open={deleteDialog.open}
                title={`Xác nhận xóa bệnh nhân ${deleteDialog.data?.name}`}
                content={`Bạn có chắc chắn muốn xóa bệnh nhân ${
                    deleteDialog.data?.name
                }`}
                color='error'
            />
            {/* <DiseasePatientDrawer
                open={diseaseDrawer.open}
                onClose={diseaseDrawer.handleClose}
                disease = {diseaseDrawer.data}
            /> */}
       </>
    )
}