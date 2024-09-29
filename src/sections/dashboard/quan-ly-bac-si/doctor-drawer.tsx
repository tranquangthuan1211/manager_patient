import { Box, Button, Drawer, Paper, Stack, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { useDoctorsContext } from "src/contexts/doctors/doctor-context";
import { Doctor, initialDoctor } from "src/types/doctors";
import { useFormik } from "formik";
import { ArrowBack } from "@mui/icons-material";
import { useEffect } from "react";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const DoctorUpdateDrawer = ({
    open,
    doctor, 
    onClose}: 
    {
        open: boolean;
        doctor?: Doctor, 
        onClose: () => void}) => {
    const {updateDoctor} = useDoctorsContext();
    const formik = useFormik<Doctor>({
        initialValues: doctor || initialDoctor,
        onSubmit: async (values) => {
            try {
                await updateDoctor(values);
                onClose();
                console.log(values);    
            }
            catch(err) {
                console.log(err);
            }
        },
    });
    useEffect(() => {
        if (doctor) {
            formik.setValues(doctor);
        }
    }, [doctor]);
    // console.log(doctor);
    return (
        <Drawer
            anchor="right"
            open={open}
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
                                <Button variant="contained" color="primary" type="submit">
                                    {doctor ? "Cập nhật" : "Thêm"}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    <Stack spacing={"16px"} direction={"column"} px={"24px"} my={"26px"}>
                        <>
                            <Stack
                                direction={"row"}
                                spacing={"16px"}
                                justifyContent={"space-between"}
                            >
                                <Stack direction={"column"} spacing={"8px"} width={1}>
                                    <Typography fontSize={"12px"} fontWeight={500}>
                                        HỌ TÊN BÁC SĨ
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        placeholder="Nhập họ tên bệnh nhận"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                </Stack>
                                <Stack direction={"column"} spacing={"8px"} width={1}>
                                    <Typography fontSize={"12px"} fontWeight={500}>
                                        TUỔI
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        placeholder="Nhập tuổi"
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
                                        Điện thoại
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        placeholder="Nhập số điện thoại"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                </Stack>
                                <Stack direction={"column"} spacing={"8px"} width={1}>
                                    <Typography fontSize={"12px"} fontWeight={500}>
                                        Chuyên môn
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        placeholder="Nhập chuyên môn"
                                        name="major"
                                        value={formik.values.major}
                                        onChange={formik.handleChange}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={"column"} spacing={"8px"} width={1}>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Địa chỉ
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập địa chỉ"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </>
                    </Stack>
            </form>
        </Drawer>
    )
}