import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Box, Button, Stack, Typography } from '@mui/material';
const slides = [
  {
    id: 1,
    title: 'Kiểm tra sức khỏe',
    image: '/assets/image1.png',
  },
  {
    id: 2,
    title: 'chăm sóc răng miệng',
    image: '/assets/image2.png',
  },
  {
    id: 3,
    title: 'Tim mạch - Huyết áp',
    image: '/assets/image3.png',
  },
];
const Slider = () => {
  return (
    <Stack
      sx = {{
        width: '100%',

      }}
    >
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        style={{height: '300px', width: '96%', }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Stack
              sx = {{
                width: '100%',
                height: '300px',
                backgroundColor: 'primary.main',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx = {{
                  position: 'relative',
                  width: '100%',
                }}
              >
                <img 
                src={slide.image}
                style={{height: '300px', float: 'right'}}
              />
              </Box>
              <Box
                sx = {{
                  position: 'absolute',
                  top: '30%',
                  left: '5%',
                  color: 'white',
                  zIndex: 1,
                }}
              >
                <Typography variant="h2">
                  {slide.title}
                </Typography>
                <Typography variant="h2">
                  Uy tín - Chất lượng
                </Typography>
                <Button
                  sx = {{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#ccc",
                    }
                  }}
                >
                  Đặt lich khám
                </Button>
              </Box>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
}
export default Slider;