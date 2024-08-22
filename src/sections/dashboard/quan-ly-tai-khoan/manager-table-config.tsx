import { Clear, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CustomTableConfig } from "src/components/custom-table";
import { Account } from "src/types/account";


const getMangerConfigs = (): CustomTableConfig<Account["id"], Account>[] => [
    {
        key: "manager_code",
        headerLabel: "Mã quản lý",
        type: "string",
    },
    {
        key: "name",
        headerLabel: "Tên Phòng khám",
        type: "string",
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
    }
]
export default getMangerConfigs;