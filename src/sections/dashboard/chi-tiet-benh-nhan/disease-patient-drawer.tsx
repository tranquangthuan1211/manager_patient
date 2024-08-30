import {FC, useState} from 'react';
import { useFormik } from 'formik';
import {Disease,initialDisease} from 'src/types/diseases';
import {Box, Button, Drawer, Paper, Stack, styled, Tab, Tabs, TextField, TextFieldProps, Typography} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
interface DiseasePatientDrawerProps {
    open: boolean;
    onClose: () => void;
    disease?: Disease ;
}
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
export const DiseasePatientDrawer: FC<DiseasePatientDrawerProps> = ({
    open,
    onClose,
    disease
}) => {
    const formik = useFormik<Disease>({
        initialValues: disease || initialDisease,
        onSubmit: async (values) => {
            // const { error } = await handleSubmitHelper.call(values);
            // if (!error) {
            //   formik.setValues(initialAccount);
            //   onClose();
            // }
            console.log(values);
        },
    });
    const [tab, setTab] = useState(tabs[0].key);
    return (
       <>
            <Drawer
                anchor='right'
                open={open}
                PaperProps={{
                    sx: {
                        width: '400px'
                    }
                }}
                onClose={onClose}
            >
                <form onSubmit={() => {}}>
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
                                    {disease ? "Cập nhật" : "Thêm"}
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
                                    HỌ TÊN BỆNH NHÂN
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
                                    Mô tả về bệnh
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập mô tả..."
                                    name="gender"
                                    value={formik.values.description}
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
                                        Link hồ sơ bệnh án
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Nhập link..."
                                        name="gender"
                                        value={formik.values.link}
                                        onChange={formik.handleChange}
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