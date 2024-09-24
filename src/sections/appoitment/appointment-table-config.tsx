import { Clear, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography,Tooltip } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Appointment } from 'src/types/appointment';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React from 'react';
interface StatusOption {
  name: string;
  variant: 'error' | 'success' | 'warning' | 'info';
}

const listStatusUI: StatusOption[] = [
  {
    name: "Đã hủy",
    variant: "error",
  },
  {
    name: "Đã Khám xong",
    variant: "success",
  },
  {
    name: "Đang chờ để điều trị",
    variant: "warning",
  },
  {
    name: "Đang điều trị",
    variant: "info"
  }
];

interface CustomStatusUIProps {
  status: string;
}

export const CustomStatusUI: React.FC<CustomStatusUIProps> = ({ status }) => {
  const statusOption = listStatusUI.find(item => item.name === status);

  if (!statusOption) {
    return null;
  }

  const { name, variant } = statusOption;

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: `${variant}.lightest`,
        borderRadius: "10px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: `${variant}.main`,
        padding: "2px 0px",
      }}
    >
      <Box>
        <Typography variant="body2" fontWeight={600} color={`${variant}.main`}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
export const getAppointmentConfigs = (
  {
    updateAppointment,
    completeAppointment,
    deleteAppointment,
  }: {
    updateAppointment: (request: Appointment) => void
    completeAppointment: (request: Appointment) => void
    deleteAppointment: (id: string) => void
  }
):CustomTableConfig<Appointment["id"],Appointment>[] => [
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
        renderCell: (data:Appointment) => <CustomStatusUI status={data.status} />,
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
                        onClick={() => deleteAppointment(data._id)}
                    />
                </IconButton>
                <IconButton color="primary">
                    <Edit
                        sx={{ height: "20px", width: "20px" }}
                        // onClick={() => updateAppointment(data)}
                    />
                </IconButton>
                <Tooltip title="Đã hoàn thành">
                  <IconButton>
                    <ArrowCircleRightIcon
                      sx={{
                        color: `success.main`,
                        fontSize: "20px",
                      }}
                      onClick={() => completeAppointment({...data, status: "Đã Khám xong"})}
                    />
                  </IconButton>
              </Tooltip>
            </Stack>
        ),
    },
];