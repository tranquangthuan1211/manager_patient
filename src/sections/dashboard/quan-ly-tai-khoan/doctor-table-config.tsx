import { Account } from "src/types/account";
import { CustomTableConfig } from "src/components/custom-table";
import { IconButton, Stack } from "@mui/material";
import { Clear, Edit } from "@mui/icons-material";

const getDoctorConfigs = ():CustomTableConfig<Account["id"],Account>[] => [
    {
        key: "doctor_code",
        headerLabel: "Mã bác sĩ",
        type: "string",
    },
    {
        key: "name",
        headerLabel: "Tên bác sĩ",
        type: "string",
    },
    {
        key: "age",
        headerLabel: "Tuổi",
        type: "number",
    },
    {
        key: "phone",
        headerLabel: "Số điện thoại",
        type: "string",
    },
    {
        key: "address",
        headerLabel: "Địa chỉ",
        type: "string",
    },
    {
        key: "major",
        headerLabel: "Chuyên môn",
        type: "string",
    },
    {
        key: "edit",
        headerLabel: "Chỉnh sửa",
        type: "string",
        renderCell: (data) => (
            <Stack
                direction="row"
                alignItems="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <IconButton color="warning">
                    <Clear sx={{ height: "20px", width: "20px" }} />
                </IconButton>
                <IconButton color="primary">
                    <Edit
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => console.log(data)}
                    />
                </IconButton>
            </Stack>
        ),
    },
];
export default getDoctorConfigs;