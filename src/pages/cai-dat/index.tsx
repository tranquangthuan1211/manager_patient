import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Avatar, IconButton, InputAdornment } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Layout } from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import { useAuth } from "src/hooks/use-auth";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
interface Userupdate {
    displayName: string;
    email: string;
    oldPassword: string;
    newPassword: string;
}
const initialUser: Userupdate = {
    displayName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
}
const Page:PageType = () => {
  const [displayName, setDisplayName] = useState('admin');
  const [editPassword, setEditPassword] = useState(false);
  const {user} = useAuth();  
  const formik = useFormik({
    initialValues: initialUser,
    onSubmit: (values) => {
        console.log(values);
    }
    });
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Thông tin tài khoản
      </Typography>

      {/* Profile Info Section */}
     <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Quản lý thông tin</Typography>
            <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
                <Avatar sx={{ width: 72, height: 72 }}>A</Avatar>
                <IconButton size="small">
                <Typography variant="body2" color="primary">
                    Đổi ảnh đại diện
                </Typography>
                </IconButton>
            </Grid>
            <Grid item xs={12} sm={10}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    label="Tên tài khoản"
                    name="displayName"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    disabled
                    fullWidth
                    InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Quyền"
                        value={user?.role}
                        name="role"
                        disabled
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    label="Tên hiển thị"    
                    name="name"
                    value={user?.name}
                    onChange={formik.handleChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    fullWidth
                    />
                </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Box>

        {/* Password Section */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Mật khẩu cũ</Typography>
            <TextField
            label="Mật khẩu cũ"
            name="oldPassword"
            type={editPassword ? 'text' : 'password'}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            fullWidth
            // disabled={!editPassword}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setEditPassword(!editPassword)}>
                      {editPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />
        </Box>
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Mật khẩu mới</Typography>
            <TextField
            label="Mật khẩu mới"
            name="newPassword"
            type={editPassword ? 'text' : 'password'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            fullWidth
            // disabled={!editPassword}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setEditPassword(!editPassword)}>
                      {editPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />
        </Box>
     </form>
     <Button type="submit" variant="contained" color="primary">Lưu</Button>
    </Box>
  );
};
Page.getLayout = (page) => <Layout>{page}</Layout>;
export default Page;
