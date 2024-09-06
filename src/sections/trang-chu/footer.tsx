import * as React from 'react';
import { Box, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', padding: '40px 20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            MDE
          </Typography>
          <Typography variant="body2">
            Forward Together
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Công ty TNHH MDE
          </Typography>
          <Typography variant="body2">
            Địa chỉ: Toà nhà MDE, 123 Nguyễn Duy Trinh, Phường ABC Quận XYZ, TP. Hồ Chí Minh
          </Typography>
          <Typography variant="body2">
            Giấy phép số: 0123456789
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Follow us and keep updated!
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Về chúng tôi
          </Typography>
          <Link href="#" underline="none" color="textSecondary">
            Câu chuyện của chúng tôi
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Inside MDE
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Quan hệ đầu tư
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Báo chí
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Tính năng & An toàn
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Tuyển dụng
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Người dùng
          </Typography>
          <Link href="#" underline="none" color="textSecondary">
            Có gì mới?
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Dịch vụ
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Ví điện tử Moca
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Đối tác & Khách hàng
          </Typography>
          <Link href="#" underline="none" color="textSecondary">
            Thông tin mới nhất
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            MDE_Express
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Trung tâm hỗ trợ
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Hợp tác cùng MDE
          </Typography>
          <Link href="#" underline="none" color="textSecondary">
            Bên cung cấp dịch vụ
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Đối tác kinh doanh
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Hướng dẫn
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Financing
          </Link>
          <br />
          <Link href="#" underline="none" color="textSecondary">
            Blog
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
