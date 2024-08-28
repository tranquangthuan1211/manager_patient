import { useEffect, useMemo } from 'react';
import { Box, CircularProgress, Stack, Typography ,TablePagination} from '@mui/material';
import {User} from 'src/types/users';
import { useAccount } from 'src/contexts/accounts/account-context';
import usePagination from 'src/hooks/use-pagination';
import {AccountDoctorTable} from './account-doctor-table';
interface AccountDoctorProps {
    filter: Partial<Omit<User,"id">>;
    setFilter: React.Dispatch<
    React.SetStateAction<Partial<Omit<User, "ID">>>
  >;
}

const AccountDoctor = ({
    filter,
    setFilter
}: AccountDoctorProps) => {
    const {getAccountDoctors} = useAccount();
    const listAccountsDoctor = useMemo(() => {
        return getAccountDoctors.data?.data || [];
    },[getAccountDoctors.data])
    useEffect(() => {
      console.log(getAccountDoctors)
    },[listAccountsDoctor])
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
            <Stack flex={1} spacing={listAccountsDoctor.length}>
            <Typography variant="h6" sx={{ flex: 1 }}>
                Danh sách tài khoản: {listAccountsDoctor.length} 
            </Typography>
            </Stack>
        </Box>
      <Stack sx={{ flex: 1 }} minHeight={"0"} minWidth={"0"}>
        {getAccountDoctors.loading ? (
          <CircularProgress sx={{ m: 2 }} />
        ) : (
          <AccountDoctorTable
            accounts={listAccountsDoctor.slice(
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
export default AccountDoctor;