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
import { Service,initialService } from "src/types/service";

import useFunction from "src/hooks/use-function";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { Account, initialAccount } from "src/types/account";
import { useAuth } from "src/hooks/use-auth";
// import { useCategoriesContext } from "src/contexts/danh-muc/categories-context";
// import { useAccountContext } from "src/contexts/tai-khoan/accounts-context";
// import { UploadArea } from "./upload-area";
import { useAccount } from "src/contexts/accounts/account-context";
import { getFormData } from "src/api/api-requests";
import { useService } from "src/contexts/services/service-context";

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

function ServiceEditDrawer({
  open,
  onClose: onCloseParam,
  account,
}: {
  open: boolean;
  onClose: () => void;
  account?: Service;
}) {
//   const { getUnitsApi } = useCategoriesContext();

  const [tab, setTab] = useState(tabs[0].key);
  const {updateService,createService} = useService();
  const { user } = useAuth();
  const onClose = () => {
    onCloseParam();
    setTab(tabs[0].key);
  };

//   const { createAccount, updateAccount, getAccountsOfficerApi } =
//     useAccountContext();

  const handleSubmit = useCallback(
    async (values: Service) => {
      if (values?._id) {
        await updateService({ ...values });
      } 
      else {
        await createService(
          {
            ...values,
            clinic_id: user?._id || "",
          }
        );
      }
      //   const userRoleOfficer = getFormData({
      //     role: "officer",
      //   });
      //   getAccountsOfficerApi.call(userRoleOfficer);
      // }
    },
    [updateService]
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: account ? "Cập nhật thành công!" : "Thêm thành công!",
  });

  const formik = useFormik<Service>({
    initialValues: initialService,
    onSubmit: async (values) => {
        const { error } = await handleSubmitHelper.call(values);
        if (!error) {
          formik.setValues(initialService);
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
            {/* {
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
            } */}

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
                      DỊCH VỤ
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập tên dịch vụ..."
                      name="name"
                      value={formik.values.name}
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
                        GIÁ DỊCH VỤ
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập giá dịch vụ..."
                      name="price"
                      value={formik.values.price}
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
                      Mô tả
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập mô tả..."
                      name="description"
                      value={formik.values.description}
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

export default ServiceEditDrawer;
