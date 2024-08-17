
import {FC, useMemo} from 'react';
import {Patient} from 'src/types/patients';
import getPaitientconfigs from './paitient-table-configs';
import {CustomTable} from 'src/components/custom-table';
import usePagination from 'src/hooks/use-pagination';
import {usePatientsContext} from 'src/contexts/paitient/paitient-context';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import CustomDrawer from 'src/components/custom-drawer';
import { useDrawer } from 'src/hooks/use-drawer';
interface PaitientProps {
    patients: Patient[];
}
import { Box, Stack, TablePagination, TextField } from '@mui/material';
export const PaitientTable: FC<PaitientProps> = 
(
    {
        patients,
    }
) => {
    const deleteDialog = useDialog();
    const editDrawer = useDrawer<Patient>();
    const {deletePatient} = usePatientsContext();
    const configs = getPaitientconfigs({
        editPatient: (data:Patient) => editDrawer.handleOpen(data),
        deletePatient: (data:Patient) => deleteDialog.handleOpen(data) 
    });
    const pagination = usePagination({ count: 20 });
    return (
    <>
        <CustomTable
            configs = {configs}
            rows={patients.slice(
                pagination.page * pagination.rowsPerPage, 
                pagination.page * pagination.rowsPerPage + pagination.rowsPerPage)
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
            title={`Xác nhận xóa bệnh nhân`}
            onCancel={deleteDialog.handleClose} 
            open={deleteDialog.open} 
            onConfirm={async () => {
                if (deleteDialog.data) {
                const {id} = deleteDialog.data as Patient;
                await deletePatient(id);
                deleteDialog.handleClose()
                }}
            }   
            color='error'   
        />
        <CustomDrawer
            DrawerProps={{
                open: editDrawer.open,
                onClose: editDrawer.handleClose,
                // PaperProps: { sx: { width: 640 } },
            }}
            title="Chỉnh sửa bệnh nhân"
            subtitle="Vui lòng điền thông tin bệnh nhân"
            onCancel={editDrawer.handleClose}
            onSubmit={() => {}}
            children={
                <Stack 
                    spacing={2}
                    sx = {{
                        p: 2,
                    }}
                
                >
                    <Box 
                        sx={{
                            display: "flex",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField   
                            label="Mã bệnh nhân" 
                            value={editDrawer.data?.patient_code}
                        />
                        <TextField 
                            label="Tên bệnh nhân" 
                            value={editDrawer.data?.name}
                        />
                    </Box>
                    <Box 
                        sx={{
                            display: "flex",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField   
                            label="Tuổi bệnh nhân" 
                            value={editDrawer.data?.age}
                        />
                        <TextField 
                            label="Số điện thoại" 
                            value={editDrawer.data?.phone}
                        />
                    </Box>
                    <TextField 
                        label="Địa chỉ" 
                        value={editDrawer.data?.address}
                        fullWidth
                    />
                </Stack>
            }
            submitText="Lưu"
        />
    </>
    )
}
