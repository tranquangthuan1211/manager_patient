import { Avatar, IconButton, Stack } from "@mui/material";
import { Edit, Clear, Restore } from '@mui/icons-material';
import {CustomTableConfig} from "src/components/custom-table";
import {Service} from "src/types/service";

const getServiceConfigs = ():CustomTableConfig<Service["id"],Service>[] => [
    {
        key:"image",
        headerLabel:"Ảnh",
        renderCell: (row) => {
            if(row.image){
                return <img src={row.image} alt="service" style={{width: "50px", height: "50px"}}/>
            }
            return (
                <Avatar sx={{ width: 72, height: 72, borderRadius: 2 }}>A</Avatar>
            )
        } 
    },
    {
        key: "name",
        headerLabel: "Tên dịch vụ",
        type: "string",
    },
    {
        key: "description",
        headerLabel: "Mô tả",
        type: "string",
    },
    {
        key: "price",
        headerLabel: "Giá",
        type: "number",
    },
    {
        key: "address",
        headerLabel: "Địa chỉ",
        type: "string",
    },
    {
        key:"edit",
        headerLabel:"Chỉnh sửa",
        type:"string",
        renderCell: () => (
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
                //    onClick={() => deletePatient(data)}
                />
             </IconButton>
              
            <IconButton color="primary">
              <Edit 
                sx={{ height: "20px", width: "20px" }} 
                // onClick={() => editPatient(data)}
              />
            </IconButton>
          </Stack>
         ),
     }
];
export default getServiceConfigs;