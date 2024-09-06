import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Stack, Typography, IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const services = [
    {
        image:"/assets/tooth.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám nha khoa"
    },
    {
        image:"/assets/eye.png",
        title:"Clinic or Hospital",
        description: "Đăt lịch hẹn với phòng khám mắt"
    },
    {
        image:"/assets/lung.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám phổi"
    },
    {
        image:"/assets/intestines.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám tiêu hóa"
    },
    {
        image:"/assets/heart.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám tim mạch"
    },
    {
        image:"/assets/ear.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám tai mũi họng"
    },
    {
       image:"/assets/stomache.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám dạ dày"
    },
    {
      image:"/assets/blood.png",
        title:"Clinic or Hospital",
        description: "Đặt lịch hẹn với phòng khám huyết áp"
    }
];

const ServiceCard = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

export const Service = () => {
  return (
    <Box sx={{ width: '100%', margin: 'auto' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ServiceCard>
              <Box
                sx={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  height: '120px',
                  marginBottom: 2,
                }}
              />
              <Typography variant="subtitle1" color="textSecondary">
                {service.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {service.description}
              </Typography>
              <IconButton>
                <ArrowCircleRightIcon color="primary" />
              </IconButton>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
