import * as React from 'react';
import { Box, Grid, Typography, IconButton, Avatar, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const doctors = [
  {
    name: "Dr. Quang Thuan",
    specialty: "Bác sĩ tim mạch",
    location: "3167 An Lạc",
    distance: "cách bạn 1KM",
    avatar: "/assets/image1.png", 
  },
  {
    name: "Dr. Nam Nguyen",
    specialty: "Bác sĩ nha khoa",
    location: "4218 An Duong Vuong",
    distance: "cách bạn 1KM",
    avatar: "/assets/image2.png", 
  },
  {
    name: "Dr. Thanh Nguyen",
    specialty: "Bác sĩ da liễu",
    location: "4218 Nguyen Trai",
    distance: "cách bạn 1KM",
    avatar: "/assets/image2.png", 
  },
  {
    name: "Dr. Huong Tran",
    specialty: "Bac si phu khoa",
    location: "4218 Nguyen Thi Minh Khai",
    distance: "cách bạn 1KM",
    avatar: "/assets/image2.png", 
  },
];

export const NearbyClinic = () => {
  return (
    <Box sx={{ width: '100%'}}>
      <Grid container spacing={2}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} key={index}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px',
                backgroundColor: 'white',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f9f9f9',
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt={doctor.name} src={doctor.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialty}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocationOnIcon sx={{ fontSize: 16, color: 'purple' }} />
                    <Typography variant="body2" color="textSecondary">
                      {doctor.location} - {doctor.distance}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <IconButton aria-label="favorite">
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
