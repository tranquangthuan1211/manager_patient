import { Box, CircularProgress, Stack, Typography ,TablePagination} from '@mui/material';
import {User} from 'src/types/users';
import { useAccount } from 'src/contexts/accounts/account-context';
import getPatientTableConfig from 'src/sections/dashboard/quan-ly-tai-khoan/patient-table-config';
import {AccountPatientManagement} from './account-patients-table';
import usePagination from 'src/hooks/use-pagination';
import { use, useEffect, useMemo } from 'react';
interface AccountPatientProps {
    filter: Partial<Omit<User,"id">>;
    setFilter: React.Dispatch<
    React.SetStateAction<Partial<Omit<User, "ID">>>
  >;
}

const AccountPatient = ({
    filter,
    setFilter
}: AccountPatientProps) => {
    const {getAccountPatients} = useAccount();
    const listAccountsPatient = useMemo(() => {
      return (getAccountPatients.data?.data || []);
    },[getAccountPatients])
    // useEffect(() => {
    //   console.log(getAccountPatients.data)
    //   console.log(getAccountPatients.loading)
    // },[listAccountsPatient])
    // useEffect(() => {
    //   console.log(getAccountPatients)
    // },[listAccountsPatient])
    const pagination = usePagination({ count: 20 });
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
            <Stack flex={1} spacing={listAccountsPatient.length}>
            <Typography variant="h6" sx={{ flex: 1 }}>
                Danh sách tài khoản: {6}
            </Typography>
            </Stack>
        </Box>
      <Stack sx={{ flex: 1 }} minHeight={"0"} minWidth={"0"}>
        {getAccountPatients.loading ? (
          <CircularProgress sx={{ m: 2 }} />
        ) : (
          <AccountPatientManagement
            accounts={listAccountsPatient.slice(
              pagination.rowsPerPage * pagination.page,
              pagination.rowsPerPage * (pagination.page + 1)
            )}
            filter={filter}
            onChangeFilter={setFilter}
          />
        )}
      </Stack>

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
    </>
    )
}
export default AccountPatient;