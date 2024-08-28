import {FC} from 'react';
import getDoctorConfigs from './doctor-table-config';
import {Account} from 'src/types/account';
import { CustomTable } from 'src/components/custom-table';
import { styled, TableCell, TableRow, TextField, TextFieldProps } from '@mui/material';
import { useDrawer } from 'src/hooks/use-drawer';
import { useDialog } from 'src/hooks/use-dialog';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import AccountsEditDoctorDrawer from './account-edit-doctor-drawer';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface AccountDoctorTableProps {
    filter: Partial<Omit<Account, "id">>;
    onChangeFilter: React.Dispatch<React.SetStateAction<Partial<Omit<Account, "id">>>>;
    accounts: Account[];
}

export const AccountDoctorTable: FC<AccountDoctorTableProps> = ({
    filter,
    onChangeFilter,
    accounts
}) => {
  const deleteDialog = useDialog<Account>();
  const editDialog = useDrawer<Account>();
  const patientTableConfigs = getDoctorConfigs({
      editDoctor: (data: Account) => editDialog.handleOpen(data),
      deleteDoctor: (data: Account) => deleteDialog.handleOpen(data),
  });
    return (
       <>
        <CustomTable
            configs={patientTableConfigs}
            rows={accounts}
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
        <AccountsEditDoctorDrawer
          open={editDialog.open}
          onClose={editDialog.handleClose}
          account={editDialog.data}
        />
        <ConfirmDialog
          onConfirm={() => {
            deleteDialog.data && deleteDialog.data.id;
            deleteDialog.handleClose();
          }}
          open={deleteDialog.open}
          onCancel={deleteDialog.handleClose}
          title={`Xác nhận xóa bác sĩ ${deleteDialog.data?.name}`}
          color='error'
        />
       </>
    );
}