import {FC} from 'react';
import getPatientTableConfig  from './patient-table-config';
import {Account} from 'src/types/account';
import { CustomTable } from 'src/components/custom-table';
import {styled, TableCell, TableRow, TextField, TextFieldProps } from '@mui/material';
import { useDrawer } from 'src/hooks/use-drawer';
import { useDialog } from 'src/hooks/use-dialog';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import AccountsEditPaitientDrawer from './account-edit-paitient-drawer';
import { useAccount } from 'src/contexts/accounts/account-context';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface AccountPatientManagementProps {
    filter: Partial<Omit<Account, "id">>;
    onChangeFilter: React.Dispatch<React.SetStateAction<Partial<Omit<Account, "id">>>>;
    accounts: Account[];
}

export const AccountPatientManagement: FC<AccountPatientManagementProps> = ({
    filter,
    onChangeFilter,
    accounts
}) => {
  const editDialog = useDrawer<Account>();
  const deleteDialog = useDialog<Account>();
  const patientTableConfigs = getPatientTableConfig({
    editPatient: (data: Account) => editDialog.handleOpen(data),
    detelePatient: (data: Account) => deleteDialog.handleOpen(data),
  });
  const {deleteAccount} = useAccount();
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
                </TableRow>
              }
        />
        <AccountsEditPaitientDrawer
            open={editDialog.open}
            onClose={editDialog.handleClose}
            account={editDialog.data}
        />
        
        <ConfirmDialog
            title={`Xác nhận xóa bệnh nhân ${deleteDialog.data?.name}`}
            onCancel={deleteDialog.handleClose} 
            open={deleteDialog.open} 
            onConfirm={async () => {
                if(deleteDialog.data){
                    await deleteAccount(deleteDialog.data.id, "patient");
                    deleteDialog.handleClose();
                }
            }}   
            color='error'    
        />
       </>
    );
}