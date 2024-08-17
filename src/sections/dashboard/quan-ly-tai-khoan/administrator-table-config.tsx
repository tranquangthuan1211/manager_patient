import { CustomTableConfig } from "src/components/custom-table";
import { User } from "src/types/users";

const getAdministatorTableConfig = ({
    onClickEdit
}:
{
    onClickEdit: (data:User) => void
}    
):CustomTableConfig<User["id"], User>[] => [
    {
        key: "name",
        headerLabel: "Tên",
    },
    {
        key: "age",
        headerLabel: "Tuổi",
    },
    {
        key: "address",
        headerLabel: "Địa chỉ",
    },
    {
        key:"phone",
        headerLabel: "Số điện thoại",
    },
    {
        key: "password",
        headerLabel: "Mật khẩu",
    }
]
export default getAdministatorTableConfig;