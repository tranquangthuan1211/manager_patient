import { Box, Button, Drawer, Paper, Stack, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { useDoctorsContext } from "src/contexts/doctors/doctor-context";
import { Doctor, initialDoctor } from "src/types/doctors";
import { useFormik } from "formik";
import { ArrowBack } from "@mui/icons-material";
import { useEffect } from "react";
import { Appointment } from "src/types/appointment";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const PaymentAppointment = ({
    open,
    appointment, 
    onClose}: 
    {
        open: boolean;
        appointment?: Appointment; 
        onClose: () => void
    }) => {
    const qrCodePayment = "https://img.vietqr.io/image/VCB-123456789-compact2.png?amount=10000&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid";
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: "500px",
                    maxWidth: "100%",
                    padding: "0",
                    top: "0",
                    height: "100%",
                    maxHeight: "100%",
                },
            }}
        >
            <form >
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
                                    Chi tiết bệnh
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
                            </Box>
                        </Box>
                    </Paper>
                    <Stack spacing={"16px"} direction={"column"} px={"24px"} my={"26px"}>
                        <>
                            <Stack direction={"column"} spacing={"8px"} width={1}>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Tài khoản phòng khám
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập số tài khoản"
                                    name="address"
                                    // value={formik.values.address}
                                    // onChange={formik.handleChange}
                                />
                            </Stack>
                            <Stack direction={"column"} spacing={"8px"} width={1}>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Nội dung chuyển khoản
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập "
                                    name="address"
                                    // value={formik.values.address}
                                    // onChange={formik.handleChange}
                                />
                            </Stack>
                            {/* qr chuyen tien */}
                            <Stack
                                flexDirection={"column"}
                                justifyContent={"center"}
                            >
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Quét mã QR để chuyển khoản
                                </Typography>
                                <img src={qrCodePayment} alt="QR code" />
                            </Stack>
                        </>
                    </Stack>
            </form>
        </Drawer>
    )
}