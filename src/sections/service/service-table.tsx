import {FC} from 'react';
import { Service } from 'src/types/service';
import {CustomTable} from 'src/components/custom-table';
import getServiceConfigs from './service-table-config';
import usePagination from 'src/hooks/use-pagination';
import { styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps } from '@mui/material';
interface ServiceProf{
    services: Service[];
}
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const ServiceTable: FC<ServiceProf> = ({services}) => {
    const config = getServiceConfigs();
    const pagination = usePagination({ count: 20 });
    return (
    <>
        <CustomTable
            configs={config}
            rows={services.slice(
                pagination.page * pagination.rowsPerPage, 
                pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
            )}
            additionalTopRow={
                <TableRow
                  sx={{
                    ".MuiTableCell-root": {
                      background: (theme) => theme.palette.neutral[100],
                    },
                  }}
                >
      
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    //   value={filter.name}
                    //   onChange={(e) =>
                    //     onChangeFilter({ ...filter, name: e.target.value })
                    //   }
                    ></NoLabelTextField>
                  </TableCell>
      
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
      
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth
                    ></NoLabelTextField>
                  </TableCell>
                  <TableCell align="center">
                    <NoLabelTextField
                      fullWidth            
                    ></NoLabelTextField>
                  </TableCell>
                  <TableCell align="center"/>
                </TableRow>
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
    </>
    )
}