import {FC} from 'react';
import {Patient} from "src/types/patients";
import { Account } from 'src/types/account';
import { CustomTableConfig } from 'src/components/custom-table';
import { Stack, IconButton } from '@mui/material';
import { Edit, Clear, Restore } from '@mui/icons-material';
const getPaitientconfigs = (
   {
      editPatient, 
      deletePatient
   }:{
      editPatient: (data:any) => void,
      deletePatient: (data:Patient) => void
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
      key:"edit",
      headerLabel:"Chỉnh sửa",
      type:"string",
      renderCell: (data:Patient) => (
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
                  onClick={() => deletePatient(data)}
               />
            </IconButton>
             
           <IconButton color="primary">
             <Edit 
               sx={{ height: "20px", width: "20px" }} 
               onClick={() => editPatient(data)}
             />
           </IconButton>
         </Stack>
       ),
   }
];
export default getPaitientconfigs
  