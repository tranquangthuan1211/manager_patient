import { FC } from 'react';
import {CustomTable} from 'src/components/custom-table';
import { Complaint } from 'src/types/complaint';
import getComplaintconfigs from './complaint-table-config';
import { TablePagination } from '@mui/material';
import usePagination from 'src/hooks/use-pagination';


interface ComplaintProps {
    complaints: Complaint[];
}

export const ComplaintTable: FC<ComplaintProps> = 
(
    {
        complaints,
    }
) => {
    const config = getComplaintconfigs({
        editPatient: () => {},
        deletePatient: () => {},
    });
    const pagination = usePagination({ count: 20 });
    console.log(complaints)
    return (
        <>
            <CustomTable
                configs = {config}
                rows={complaints.slice(
                    pagination.page * pagination.rowsPerPage, 
                    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage)}
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