import { Box, CircularProgress, Stack, TablePagination, Typography } from '@mui/material';
import {FC, useEffect, useMemo} from 'react';
import { useAccount } from 'src/contexts/accounts/account-context';
import usePagination from 'src/hooks/use-pagination';
import {User} from 'src/types/users';
import {AccountManagerTable} from './account-manager-table';
interface AccountManagerProps {
    filter?: Partial<Omit<User,"id">>;
    setFilter?: React.Dispatch<
    React.SetStateAction<Partial<Omit<User, "ID">>>
  >;
}

const AccountManager = ({
    filter,
    setFilter
}: AccountManagerProps) => {
    const {getAccountManagers} = useAccount();

    const listAccountManagers = useMemo(() => {
      return getAccountManagers.data?.data || [];
    },[getAccountManagers.data]);
    useEffect(() => {
      console.log(getAccountManagers)
    },[listAccountManagers])
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
            <Stack flex={1} spacing={2}>
            <Typography variant="h6" sx={{ flex: 1 }}>
                Danh sách tài khoản: {6}
            </Typography>
            </Stack>
        </Box>
      <Stack sx={{ flex: 1 }} minHeight={"0"} minWidth={"0"}>
        {getAccountManagers.loading ? (
          <CircularProgress sx={{ m: 2 }} />
        ) : (
          <AccountManagerTable
            accounts={listAccountManagers.slice(
              pagination.rowsPerPage * pagination.page,
              pagination.rowsPerPage * (pagination.page + 1)
            )}
            filter={filter || {}}
            onChangeFilter={setFilter || (() => {})}
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
export default AccountManager;