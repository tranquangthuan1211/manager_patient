import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Paper,
  Typography,
  Button,
  TextField,
  TextFieldProps,
  Tabs,
  Tab,
  MenuItem,
} from "@mui/material";
import { Stack, spacing, styled } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useFunction from "src/hooks/use-function";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { Account, initialAccount } from "src/types/account";
// import { useCategoriesContext } from "src/contexts/danh-muc/categories-context";
// import { useAccountContext } from "src/contexts/tai-khoan/accounts-context";
// import { UploadArea } from "./upload-area";
import { useAccount } from "src/contexts/accounts/account-context";
import { getFormData } from "src/api/api-requests";

const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "8px",
  },
}));

const tabs = [
  {
    label: "Thêm 1 tài khoản",
    key: "Thêm 1 tài khoản",
  },
  {
    label: "Thêm nhiều tài khoản",
    key: "Thêm nhiều tài khoản",
  },
];

function AccountsEditDoctorDrawer({
  open,
  onClose: onCloseParam,
  account,
}: {
  open: boolean;
  onClose: () => void;
  account?: Account;
}) {
//   const { getUnitsApi } = useCategoriesContext();

  const [tab, setTab] = useState(tabs[0].key);
  const {updateAccount} = useAccount();
  const onClose = () => {
    onCloseParam();
    setTab(tabs[0].key);
  };

//   const { createAccount, updateAccount, getAccountsOfficerApi } =
//     useAccountContext();

  const handleSubmit = useCallback(
    async (values: Account) => {
      if (values?.id) {
        await updateAccount({ ...values });
      } 
      // else {
      //   await createAccount({
      //     name: values.name,
      //     password: values.password,
      //     role: "officer",
      //     unit_id: values.unit_id,
      //     username: values.officer_id,
      //     phone: values.phone,
      //     officer_id: values.officer_id,
      //     position: values.position,
      //     email: values.email,
      //   });
      //   const userRoleOfficer = getFormData({
      //     role: "officer",
      //   });
      //   getAccountsOfficerApi.call(userRoleOfficer);
      // }
    },
    [updateAccount]
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: account ? "Cập nhật thành công!" : "Thêm thành công!",
  });

  const formik = useFormik<Account>({
    initialValues: account || initialAccount,
    onSubmit: async (values) => {
        const { error } = await handleSubmitHelper.call(values);
        if (!error) {
          formik.setValues(initialAccount);
          onClose();
        }
        console.log(values);
    },
  });

  useEffect(() => {
    if (account) {
      formik.setValues(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: 640,
          },
        }}
        onClose={onClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <ArrowBack
                      fontSize="small"
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Quay lại
                  </Typography>
                </Box>
                <Typography variant="h6">
                  {account ? "Sửa tài khoản" : "Thêm tài khoản mới"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Button color="inherit" variant="contained" onClick={onClose}>
                  Hủy bỏ
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {account ? "Cập nhật" : "Thêm"}
                </Button>
              </Box>
            </Box>
          </Paper>

          <Stack spacing={"16px"} direction={"column"} px={"24px"}>
            {
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={tab}
                onChange={(_, value) => setTab(value)}
              >
                {tabs.map((tab) => (
                  <Tab key={tab.key} label={tab.label} value={tab.key} />
                ))}
              </Tabs>
            }

            {tab == tabs[0].key && (
              <>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  justifyContent={"space-between"}
                >
                  {/* <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Mã Bác sĩ
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập mã bác sĩ..."
                      name="officer_id"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </Stack> */}
                  
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      HỌ TÊN
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập họ tên..."
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Giới tính
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập giới tính..."
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Địa chỉ
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập địa chỉ..."
                      name="gender"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Tuổi
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập tuổi..."
                      name="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      ĐIỆN THOẠI
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập số điện thoại..."
                      name="phone"
                      value={formik.values.phone}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                    />
                  </Stack>
                </Stack>

              </>
            )}

            {/* {tab == tabs[1].key && (
              <>
                <UploadArea
                  open={false}
                  onClose={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  type={"officer"}
                />
              </>
            )} */}
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default AccountsEditDoctorDrawer;
