

import { Stack, Typography } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import CustomDrawer from "src/components/custom-drawer"
import { FileDropzone } from "src/components/file-dropzone"
import {downloadUrl} from "src/utils/url-handler"
import { importXLSX} from "src/utils/xlsx-helper"
import useAppSnackbar from "src/hooks/use-app-snackbar"
import {configExcelPatient, configExcelDoctor,configExcelAdmin} from "src/sections/dashboard/quan-ly-tai-khoan/account-config-excel"
import useFunction from "src/hooks/use-function"
import {Account, initialAccount} from "src/types/account"
import { CardTable } from "src/components/card-table"
import {accountUploadAdminTableConfig, 
    accountUploadDoctorTableConfig, 
    accountUploadPatientConfig} from "src/sections/dashboard/quan-ly-tai-khoan/account-config-upload"
import {useUsersContext } from "src/contexts/users/users-context"
import {useAccount} from "src/contexts/accounts/account-context"
import DoctorApi from "src/api/doctor"
import UnitsApi from "src/api/units"
import usePagination from "src/hooks/use-pagination";

export interface AccountImport {
  id?: string;
  patient_code?: string;
  id_doctor?: string;
  id_manager?: string;
  major?: string;
  name?: string;
  age?: number;
  address?: string;
  role?: string;
  gender?: string;
  phone?: string;
  password?: string;
  status?: string;
}
export const AccountUploadSection = ({
    open,
    onClose,
    type
}:{
    open:boolean,
    onClose:()=>void,
    type:string
}) => {
  // console.log(type)
  const { showSnackbarError } = useAppSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const [fileData, setFileData] = useState<AccountImport[]>([]);
  const {getUsersApi} = useUsersContext();
  const doctorApi = useFunction(DoctorApi.getDoctors);
  const {createAccounts} = useAccount();
  const unitApi = useFunction(UnitsApi.getUnits);
  const units = useMemo(() => {
    return (unitApi.data || []).map(item => {
      return item.id;
    })
  },[unitApi])
  const users = useMemo(() => {
    return (getUsersApi.data?.data || []).map(item => {
      return item.id;
    });
  }, [getUsersApi]);
  const handleDrop = useCallback(
    async (newFiles: File[]) => {
      if (newFiles.length > 0) {
        const file = newFiles[0];
    
        const { data, error } = await importXLSX(
          file,
          type == "patient"
          ? configExcelPatient
          : type == "doctor"
          ? configExcelDoctor
          : configExcelAdmin,
          {
            detectHeader: true,
            raw: false,
            rawNumbers: true,
          }
            );
    
            if (error) {
              showSnackbarError(error);
            }
            setFiles([newFiles[0]]);
            if (type == "advisor") {
              data.forEach((item) => {
                if (item.class_in_charge) {
                  item.class_in_charge = convertStringToArray(item.class_in_charge);
                }
              });
            }
            // console.log(data)
            setFileData(data);
          }
        },
        [showSnackbarError, type]
      );
  const handleDropHelper = useFunction(handleDrop);
  const getErrorString = useCallback(
    (accountImport: AccountImport) => {
      if (type == "patient") {
        return !accountImport.name?
          "Thiếu tên bệnh nhân"
          : !accountImport.age ?
          "Thiếu tuổi bệnh nhân"
          : !accountImport.gender ?
          "Thiếu giới tính bệnh nhân"
          : !accountImport.address
          ? "Thiếu địa chỉ bệnh nhân"
          : !accountImport.phone
          ? "Thiếu hoặc trùng số điện thoại bệnh nhân"
          : !accountImport.password?
          "thiếu mật khẩu bệnh nhân"
          : "";
      }
      if (type == "doctor") {
        return !accountImport.id_manager
          ? "Thiếu hoặc trùng mã quản lý"
          : !accountImport.name
          ? "Thiếu tên bác sĩ"
          : !accountImport.phone
          ? "Thiếu hoặc trùng số điện thoại bác sĩ"
          : !accountImport.gender
          ? "Thiếu giới tính bác sĩ"
          : !accountImport.age
          ? "Thiếu tuổi bác sĩ"
          : (accountImport.password?.length ?? 0) < 6
          ? "Mật khẩu phải lớn hơn 6 ký tự"
          : !accountImport.major?
          "Thiếu chuyên ngành"
          : ""
      }
    },
    [type]
  );
  const handleRemove = useCallback((file: File): void => {
    setFiles([]);
    setFileData([]);
  }, []);
  const handleRemoveAll = useCallback((): void => {
    setFiles([]);
    setFileData([]);
  }, []);
  // console.log(type)
  const accounts = useMemo(() => {
    if (type == "patient") {
      // console.log(fileData)
      return fileData.map((d): Account & AccountImport & { error?: string } => {
        // console.log(getErrorString(d))
        const itemFind = units.find((item) => {
          return (
            item.replace(/\s/g, "").toLowerCase() ==
            d.status?.replace(/\s/g, "").toLowerCase()
          );
        });
        if (itemFind) {
          return {
            ...initialAccount,
            ...d,
            role: "patient" || "",
            patient_code: d.patient_code || "",
            error: getErrorString(d),
            status: itemFind,
          };
        }
        return {
          ...initialAccount,
          ...d,
          role: "patient" || "",
          patient_code: d.patient_code || "",
          error: getErrorString(d),
        };
      });
    } else if (type == "doctor") {
      return fileData.map((d): Account & AccountImport & { error?: string } => {
        return {
          ...initialAccount,
          ...d,
          role: "doctor" || "",
          // error: getErrorString(d),
        };
      });
    }
    return fileData
      .map((d): Account & AccountImport & { error?: string } => {
        return {
          ...initialAccount,
          ...d,
          role: "thuan" || "",
          error: getErrorString(d),
        };
      })
      .map((account) => ({
        ...account,
        password: account.password || account.phone,
      }));
  }, [fileData, type]);
  const handleSubmit = useCallback(
    async ({}) => {
      const filterAccounts = accounts.filter((account) => {
        return account.error == "";
      });
      const importAccounts = filterAccounts.map((account) => {
        const {error, ...rest} = account;
        return rest;
      })
      console.log(importAccounts)
      if (importAccounts.length > 0) {
        await createAccounts(importAccounts);
      }
    },
    [accounts, onClose, type]
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: "Thêm thành công!",
  });
  // getErrorString, listUnits
  const pagination = usePagination({ count: accounts.length });
    return (
      <CustomDrawer
        title="thêm tài khoản mới"
        DrawerProps={{
          open,
          onClose,
          PaperProps: { sx: { width: 640 } },
        }}
        onSubmit={() => {
          handleSubmitHelper.call({});
          onClose();
        }}
      >
        <Stack spacing={2} px = {2}>
            <Stack>
                <Typography variant="body2">
                    File import là file Excel (xlsx hoặc xls) phải theo mẫu
                </Typography>
                <Typography variant="body2">
                    Lưu ý: File không đúng quy định sẽ không thể import.
                </Typography>
            </Stack>
            <Typography
                sx={{
                    color:"text.secondary",
                }}
            >
                Download File mẫu tại&nbsp;
                <Typography
                    component="span"
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => {
                    if (type == "user") {
                        downloadUrl(
                        "/docs/import-student-accounts.xlsx",
                        "Import Tài Khoản sinh viên.xlsx"
                        );
                    } else if (type == "advisor") {
                        downloadUrl(
                        "/docs/import-advisor-accounts.xlsx",
                        "Import Tài Khoản cố vấn.xlsx"
                        );
                    } else if (type == "officer") {
                        downloadUrl(
                        "/docs/import-accounts.xlsx",
                        "Import Tài Khoản cán bộ.xlsx"
                        );
                    } else if (type == "admin") {
                        downloadUrl(
                        "/docs/import-admin-accounts.xlsx",
                        "Import Tài Khoản P.CTSV.xlsx"
                        );
                    }
                    }}
                >
                    Đây 👈
                </Typography>
            </Typography>
            <FileDropzone
                disabled={handleSubmitHelper.loading || handleDropHelper.loading}
                title="Nhấn tải lên file danh sách"
                accept={{ "*/*": [] }}
                caption={"File Excel (.xlsx hoặc .xls)"}
                files={files}
                onDrop={(files) => handleDropHelper.call(files)}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                onUpload={() => {}}
                type="single"
            />
        </Stack>
        {accounts.length > 0 && (
          <CardTable
          rows={accounts}
          configs={
            type == "patient"
              ? accountUploadPatientConfig
              : type == "doctor"
              ? accountUploadDoctorTableConfig
              : accountUploadAdminTableConfig
          }
          indexColumn
          pagination = {pagination}
          />
        )}
      </CustomDrawer>  
    )
}

function convertStringToArray(class_in_charge: any): any {
  throw new Error("Function not implemented.")
}
