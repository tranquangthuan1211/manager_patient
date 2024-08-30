
import { Clear, Edit } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Patient } from 'src/types/patients';
import {downloadUrl} from 'src/utils/url-handler';
import DownloadIcon from '@mui/icons-material/Download';
export const getTablePatientDetailConfigs = (
    {
        editDrawer,
        deleteDialog
    }: {
        editDrawer: (data:Patient) => void;
        deleteDialog: (data:Patient) => void;
    }
):CustomTableConfig<Patient["id"],Patient>[] => [
    {
        key: "patient_code",
        headerLabel: "Mã bệnh nhân",
        type: "string",
    },
    {
        key:'name',
        headerLabel:'Tên bệnh nhân',
        type:'string'
    },
    {
          key:"doctor_name",
          headerLabel:"Tên bác sĩ",
          type:"string"
    },
    {
        key:'age',
        headerLabel:'Tuổi',
        type:'number'
    },
    {
        key:'phone',
        headerLabel:'Số điện thoại',
        type:'string'
    },
    {
        key:'address',
        headerLabel:'Địa chỉ',
        type:'string'
    },
    {
        key:"diseases_detail",
        headerLabel: "Chi tiết bệnh",
        renderCell:(data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <IconButton color="primary">
                    <DownloadIcon
                        sx={{ height: "30px", width: "30px" }}
                        onClick={() => downloadUrl(
                            "https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/hinh-nen-ngau-1.jpg",
                            `chi-tiet-benh-${data.name}.jpg`
                        )}
                    />
                </IconButton>
            </Stack>
        )
    },
    {
        key:'edit',
        headerLabel:'Chỉnh sửa',
        renderCell:(data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <IconButton color="primary">
                    <Edit
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => editDrawer(data)}
                    />
                </IconButton>
                <IconButton color="warning">
                    <Clear  
                        sx={{ height: "20px", width: "20px" }} 
                        onClick={() => deleteDialog(data)}
                    />
                </IconButton>
                    
            </Stack>
        )
    }

]