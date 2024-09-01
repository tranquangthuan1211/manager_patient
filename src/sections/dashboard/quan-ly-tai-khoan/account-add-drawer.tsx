import { ArrowBack } from '@mui/icons-material';
import {Drawer, Paper, Box, Typography, Button, Stack, TextField, styled, TextFieldProps} from '@mui/material';
import { useFormik } from 'formik';
import {initialAccount, Account} from 'src/types/account';
import { useAccount } from 'src/contexts/accounts/account-context';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface AccountAddDrawerProps {
    open: boolean;
    onClose: () => void;
}
export const AccountAddDrawer = ({
    open,
    onClose,
}:AccountAddDrawerProps)=> {
    const {createAccount} = useAccount();
    const formik = useFormik({
        initialValues: initialAccount,
        onSubmit: (values) => {
            createAccount({...values, role: "manager"});
            onClose();
        },
        });
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
                    "Thêm tài khoản mới"
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
                    "Thêm"
                  </Button>
                </Box>
              </Box>
            </Paper>
  
            <Stack spacing={"16px"} direction={"column"} px={"24px"}>
                <>
                  <Stack
                    direction={"row"}
                    spacing={"16px"}
                    justifyContent={"space-between"}
                  > 
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
                        Địa chỉ
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Nhập địa chỉ..."
                        name="address"
                        value={formik.values.address}
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
                        name="address"
                        value={formik.values.address}
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
                        Chuyên khoa
                      </Typography>
                      <NoLabelTextField
                        fullWidth
                        placeholder="Nhập chuyên khoa..."
                        name="major"
                        value={formik.values.major}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />
                    </Stack>
                  </Stack>
                </>
            </Stack>
          </form>
        </Drawer>
      </>
    )
}