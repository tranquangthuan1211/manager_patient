import {FC} from 'react';
import {Complaint} from "src/types/complaint";
import { CustomTableConfig } from 'src/components/custom-table';
import { Stack, IconButton } from '@mui/material';
import { Edit, Clear, Restore } from '@mui/icons-material';
const getComplaintconfigs = (
   {
      editPatient, 
      deletePatient
   }:{
      editPatient?: (data:any) => void,
      deletePatient?: (data:Complaint) => void
   }
):CustomTableConfig<Complaint["id"],Complaint>[] => [
   {
    key: "patient_name",
    headerLabel: "Tên bệnh nhân",
    type: "string",
   },
   {
    key:'doctor_name',
    headerLabel:'Tên bác sĩ',
    type:'string'
   },
   {
      key:"description",
      headerLabel:"Mô tả",
      type:"string"
   },
   {
    key:'createdAt',
    headerLabel:'Thời gian',
    type:'string'
   },
   {
      key:"edit",
      headerLabel:"Chỉnh sửa",
      type:"string",
      renderCell: (data:Complaint) => (
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
               />
            </IconButton>
             
           <IconButton color="primary">
             <Edit 
               sx={{ height: "20px", width: "20px" }} 
             />
           </IconButton>
         </Stack>
       ),
   }
];
export default getComplaintconfigs
  