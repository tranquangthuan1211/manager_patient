import {FC} from 'react';
import getPatientTableConfig  from './patient-table-config';
import {User} from 'src/types/users';
import {Account} from 'src/types/account';
import { CustomTable } from 'src/components/custom-table';
import { Stack, styled, TableCell, TableRow, TextField, TextFieldProps } from '@mui/material';
import { useDrawer } from 'src/hooks/use-drawer';
import CustomDrawer from 'src/components/custom-drawer';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface AccountPatientManagementProps {
    filter: Partial<Omit<User, "id">>;
    onChangeFilter: React.Dispatch<React.SetStateAction<Partial<Omit<User, "id">>>>;
    accounts: Account[];
}

export const AccountPatientManagement: FC<AccountPatientManagementProps> = ({
    filter,
    onChangeFilter,
    accounts
}) => {
  const editDialog = useDrawer<Account>();
  const patientTableConfigs = getPatientTableConfig({
    editPatient: (data: Account) => editDialog.handleOpen(data)
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
                </TableRow>
              }
        />
        <CustomDrawer
            title='Chỉnh sửa bệnh nhân'
            DrawerProps={
              {
                anchor: "right",
                open: editDialog.open,
                onClose: editDialog.handleClose,
                sx: {
                  width: 300,
                },
              }
            }
            onCancel={editDialog.handleClose}
            onSubmit={() => {
              console.log(editDialog.data);
            }}
            children = {
              <Stack>
                <TextField
                  fullWidth
                  label="Tên bệnh nhân"
                  value={editDialog.data?.name}
                  // onChange={(e) =>
                  //   editDialog.setData({
                  //     ...editDialog.data,
                  //     name: e.target.value,
                  //   })
                  // }
                />      
              </Stack>
            }
        />
       </>
    );
}