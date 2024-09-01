import {CardTableEditCellTextfield} from 'src/components/card-table';
import { Account } from 'src/types/account';
import { CardTableConfig } from 'src/components/card-table';

export const accountUploadAdminTableConfig: CardTableConfig<Account["id"], Account>[] = [
    {
      key: "name",
      headerLabel: "Họ tên",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "id_doctor",
      headerLabel: "Bác sĩ",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "id_manager",
      headerLabel: "Quản trị viên",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "address",
      headerLabel: "Địa chỉ",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "phone",
      headerLabel: "Điện thoại",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "password",
      headerLabel: "Mật khẩu",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
  ];

export const accountUploadDoctorTableConfig: CardTableConfig<Account["id"], Account>[] = [
    {
      key: "name",
      headerLabel: "Họ tên",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "major",
      headerLabel: "Chuyên ngành",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "phone",
      headerLabel: "Điện thoại",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "email",
      headerLabel: "Email",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "password",
      headerLabel: "Mật khẩu",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
];
export const accountUploadPatientConfig: CardTableConfig<Account["id"], Account>[] = [
    {
      key: "patient_code",
      headerLabel: "Mã bệnh nhân",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "name",
      headerLabel: "Họ tên",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "phone",
      headerLabel: "Điện thoại",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "id_doctor",
      headerLabel: "Bác sĩ",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key:"address",
      headerLabel:"Địa chỉ",
      type:"string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key:"age",
      headerLabel:"Tuổi",
      type:"string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "email",
      headerLabel: "Email",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
    {
      key: "password",
      headerLabel: "Mật khẩu",
      type: "string",
      renderEditingCell: CardTableEditCellTextfield,
    },
  ];