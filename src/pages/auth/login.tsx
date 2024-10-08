import { GuestGuard } from "src/guards/guest-guard";
import type { Page as PageType } from "../../types/page";
import { Layout } from "src/layouts/auth/classic-layout";
import { Box,
    Stack, Typography, TextField, Card, CardContent, 
    MenuItem,
    Link,
    Button,
    IconButton,
    FormHelperText} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Logo from "src/components/logo";
import { use, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import {AuthContextType} from "src/contexts/auth/jwt-context";
import { Layout as AuthLayout } from "src/layouts/auth/classic-layout";
import { Issuer } from "src/utils/auth";
import { IssuerGuard } from "src/guards/issuer-guard";
import { useRouter } from "next/router";
import { useMounted } from "src/hooks/use-mounted";
import useAppSnackbar from "src/hooks/use-app-snackbar";
interface Values {
    email: string;
    password: string;
    position: string;
    submit: null;
}
const choosePosition = [
    {key:"doctor", value:"Bác sĩ"},
    {key:"paitent", value:"Bệnh nhân"},
]
const initialValues: Values = {
    email: "",
    password: "",
    position: "doctor",
    submit: null,
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email("vui ").max(255).required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
})
const Page: PageType = () => {
    const {showSnackbarSuccess} = useAppSnackbar()
    const router = useRouter();
    const { signIn } = useAuth<AuthContextType>();
    const isMounted = useMounted();
    const forkmik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (value, helpers) => {
            try{
                const result = await signIn(value.email, value.password)
                console.log(result)
                if(result && isMounted()){
                    showSnackbarSuccess("Đăng nhập thành công")
                    if(result.role == "doctor"){
                        router.replace("/bac-si")
                    }else if(result.role == "patient"){
                        router.replace("/benh-nhan")
                    }else {
                        router.replace("/")
                    }
                }
            }
            catch(err){
                // console.log(err.message)
                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    })
const [displayPassword, setDisplayPassword] = useState(false);
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
                            Đăng nhập
                        </Typography>
                        <form onSubmit={forkmik.handleSubmit}>
                            <TextField
                                defaultValue="Bác sĩ" 
                                fullWidth
                                select
                                label="position"
                                margin="normal"
                                name="position"
                                type="text"
                                value={forkmik.values.position}
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
                                Đăng nhập
                            </Button>
                        </form>
                        <Link 
                            href="/dang-ki-tai-khoan"
                            underline="none"
                            variant="body2"
                            align="center"
                        >   
                            Đăng kí tài khoản / Kích hoạt tài khoản
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
        <AuthLayout>{page}</AuthLayout>
      </GuestGuard>
    </IssuerGuard>
);
export default Page;