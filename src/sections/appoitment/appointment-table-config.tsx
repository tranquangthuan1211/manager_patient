import { Clear, Edit } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Appointment } from 'src/types/appointment';

export const getAppointmentConfigs = ():CustomTableConfig<Appointment["id"],Appointment>[] => [
    {
        key: "patient_name",
        headerLabel: "Tên bệnh nhân",
        type: "string",
    },
    {
        key: "doctor_name",
        headerLabel: "Tên bác sĩ",
        type: "string",
    },
    {
        key:"status",
        headerLabel: "Trạng thái",
        type: "string",
    },
    {
        key: "date",
        headerLabel: "Ngày hẹn",
        type: "string",
    },
    {
        key: "time",
        headerLabel: "Giờ hẹn",
        type: "string",
    },
    {
        key: "edit",
        headerLabel: "Chỉnh sửa",
        type: "string",
        renderCell: (data:Appointment) => (
            <Stack
                direction="row"
                alignItems="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <IconButton color="warning">
                    <Clear
                        sx={{ height: "20px", width: "20px" }}
                        // onClick={() => deleteAppointment(data)}
                    />
                </IconButton>
                <IconButton color="primary">
                    <Edit
                        sx={{ height: "20px", width: "20px" }}
                        // onClick={() => editAppointment(data)}
                    />
                </IconButton>
            </Stack>
        ),
    },
];