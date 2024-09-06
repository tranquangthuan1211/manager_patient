import {Page as PageType} from 'src/types/page';
import { Layout } from 'src/layouts/auth/classic-layout';
import { GuestGuard } from 'src/guards/guest-guard';
import { Issuer } from "src/utils/auth";
import { IssuerGuard } from "src/guards/issuer-guard";
import { Box, Button, Card, CardContent, FormHelperText, IconButton, Link, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Logo from 'src/components/logo';
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import PersonIcon from '@mui/icons-material/Person';
const validationSchema = Yup.object().shape({
    email: Yup.string().email("vui ").max(255).required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
    // passwordAgain: Yup.string()
    //     .oneOf([Yup.ref('password')], "Passwords phải khớp")
    //     .required("Vui lòng nhập lại password"), 
})
interface Values {
    name: string;
    email: string;
    password: string;
    // passwordAgain:string;
    address:string;
    phone:string;
    age:string;
    role: string;
    submit: null;
}
const initialValues: Values = {
    name: "",
    email: "",
    password: "",
    address:"",
    phone:"",
    age:"",
    role: "doctor",
    submit: null,
}
const choosePosition = [
    {key:"doctor", value:"Bác sĩ"},
    {key:"paitent", value:"Bệnh nhân"},
]
const Page:PageType = () => {
    const [displayPassword, setDisplayPassword] = useState<Boolean>(false)
    const {signUp} = useAuth()
    const isMounted = useMounted();
    const forkmik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (value, helpers) => {
            try{
               const result = await signUp(
                     value.name,
                     value.email,
                     value.password,
                     value.address,
                     value.phone,
                     value.age,
                     value.role
               )
               if(result && isMounted()){
                   console.log(result)
               }
            console.log(value)
            }
            catch(err){
                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    })
    return (
        <>
            <Card elevation={16}>
                <CardContent
                    sx = {{
                        pt:1
                    }}
                >
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={"center"}
                        >
                            <Box
                                sx = {{
                                    display: "flex",
                                    
                                    spacing:1
                                }}
                            >
                                <Logo />
                            </Box>
                            <Box>
                                <Typography variant="h6">MDE_Chăm sóc sức khoẻ</Typography>
                                <Typography variant="body2">Hệ thống chăm sóc sức khoẻ</Typography>
                            </Box>
                        </Stack>
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Đăng Kí tài khoản
                        </Typography>
                        <form onSubmit={forkmik.handleSubmit}>
                            <TextField
                                defaultValue="Bác sĩ" 
                                fullWidth
                                select
                                label="Chức vụ"
                                margin="normal"
                                name="role"
                                type="text"
                                value={forkmik.values.role}
                                onChange={forkmik.handleChange}
                                onBlur={forkmik.handleBlur}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <PersonIcon 
                                                sx = {{
                                                    marginTop:2
                                                }}
                                            />
                                        )
                                    }
                                }
                            >
                                {choosePosition.map((item) => (
                                    <MenuItem key={item.key} value={item.key}>
                                        {item.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box
                                sx ={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Họ và tên"
                                    margin="normal"
                                    name="name"
                                    type="text"
                                    value={forkmik.values.name}
                                    onChange={forkmik.handleChange}
                                    onBlur={forkmik.handleBlur}
                                    error={!!(forkmik.touched.name && forkmik.errors.name)}
                                    helperText={forkmik.touched.name && forkmik.errors.name}
                                    sx={{
                                        marginRight: 1
                                    }}
                                />

                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Tuổi"
                                    margin="normal"
                                    name="age"
                                    type="text"
                                    value={forkmik.values.age}
                                    onChange={forkmik.handleChange}
                                    onBlur={forkmik.handleBlur}
                                    error={!!(forkmik.touched.age && forkmik.errors.age)}
                                    helperText={forkmik.touched.age && forkmik.errors.age}
                                />
                            </Box>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Địa chỉ"
                                margin="normal"
                                name="address"
                                type="text"
                                value={forkmik.values.address}
                                onChange={forkmik.handleChange}
                                onBlur={forkmik.handleBlur}
                                error={!!(forkmik.touched.address && forkmik.errors.address)}
                                helperText={forkmik.touched.address && forkmik.errors.address}
                            />
                            <TextField
                                autoFocus
                                fullWidth
                                label="Số điện thoại"
                                margin="normal"
                                name="phone"
                                type="text"
                                value={forkmik.values.phone}
                                onChange={forkmik.handleChange}
                                onBlur={forkmik.handleBlur}
                                error={!!(forkmik.touched.phone && forkmik.errors.phone)}
                                helperText={forkmik.touched.phone && forkmik.errors.phone}
                            />
                            <TextField
                                autoFocus
                                fullWidth
                                label="Email"
                                margin="normal"
                                name="email"
                                type="email"
                                value={forkmik.values.email}
                                onChange={forkmik.handleChange}
                                onBlur={forkmik.handleBlur}
                                error={!!(forkmik.touched.email && forkmik.errors.email)}
                                helperText={forkmik.touched.email && forkmik.errors.email}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                name="password"
                                type={displayPassword ? "text" : "password"}
                                value={forkmik.values.password}
                                onChange={forkmik.handleChange}
                                onBlur={forkmik.handleBlur}
                                error={Boolean(forkmik.touched.password && forkmik.errors.password)}
                                helperText={forkmik.touched.password && forkmik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        displayPassword ? (
                                            <IconButton>
                                                <VisibilityOffOutlinedIcon 
                                                    onClick={() => {
                                                        setDisplayPassword(false)
                                                    }}
                                                />
                                            </IconButton>
                                        ) : (
                                            <IconButton>
                                                <VisibilityOutlinedIcon 
                                                    onClick={() => {
                                                        setDisplayPassword(true)
                                                    }}
                                                />
                                            </IconButton>
                                        )
                                    )
                                }}
                            />
                            {forkmik.errors.submit && (
                            <FormHelperText error sx={{ mt: 3 }}>
                                {forkmik.errors.submit as string}
                            </FormHelperText>
                            )}
                            <Button 
                                // variant="contained" 
                                type="submit"
                                fullWidth
                                
                            >
                                Đăng Kí tài khoản
                            </Button>
                        </form>
                        <Link 
                            href="/auth/login"
                            underline="none"
                            variant="body2"
                            align="center"
                        >   
                            Đăng Nhập
                        </Link>
                            
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

Page.getLayout = (page) => (
    <IssuerGuard issuer={Issuer.JWT}>
        <GuestGuard>
            <Layout>
                {page}
            </Layout>
        </GuestGuard>
    </IssuerGuard>
)

export default Page;

function isMounted() {
    throw new Error('Function not implemented.');
}

