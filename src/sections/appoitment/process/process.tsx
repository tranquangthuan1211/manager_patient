import React from 'react';
import { Stepper, Step, StepLabel, StepIconProps, Box, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import VaccinesIcon from '@mui/icons-material/Vaccines';
const steps = [
  'Đơn Hàng Đặt lịch',
  'Đã Xác Nhận Thông Tin Thanh Toán',
  'Chờ Khám bệnh',
  'Đang Khám',
  'Đánh Giá',
];

const StepIconComponent = (props: StepIconProps) => {
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AssignmentTurnedInIcon />,
    2: <PaymentIcon />,
    3: <HourglassTopIcon />,
    4: <VaccinesIcon />,
    5: <StarBorderIcon />,
  };

  return (
    <Box
      sx={{
        color: completed ? 'green' : active ? 'green' : 'gray',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icons[String(props.icon)]}
    </Box>
  );
};

const OrderProgress = () => {
  // Giả định bước hiện tại là 3 (Chờ Lấy Hàng)
  const activeStep = 2;

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIconComponent}>
              <Typography variant="body2" color={index <= activeStep ? 'green' : 'gray'}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderProgress;
