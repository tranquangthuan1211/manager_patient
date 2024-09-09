import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  isToday,
  isSameDay,
  addMonths,
  getDay
} from 'date-fns';
import { vi } from 'date-fns/locale';

export const Calendar = ({
  selectedDate,
  setSelectedDate
}: {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayIndex = getDay(monthStart);

  const renderDays = () => {
    const today = new Date();

    return monthDays.map((day) => {
      const isDisabled = isBefore(day, today) && !isToday(day);
      const isSelected = selectedDate && isSameDay(day, selectedDate);

      return (
        <Grid item key={day.toString()} xs={1.7}>
          <Paper 
            elevation={isSelected ? 3 : 1}
            sx={{
              p: 1,
              height: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center', 
              cursor: isDisabled ? 'default' : 'pointer',
              bgcolor: isSelected ? 'primary.main' : 'background.paper',
              color: isDisabled ? 'text.disabled' : isSelected ? 'common.white' : 'text.primary',
              '&:hover': {
                bgcolor: isDisabled ? 'background.paper' : isSelected ? 'primary.dark' : 'action.hover',
              },
            }}
            onClick={() => !isDisabled && setSelectedDate(day)}
          >
            <Typography variant="body2">{format(day, 'd')}</Typography>
          </Paper>
        </Grid>
      );
    });
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(addMonths(currentDate, delta));
  };

  return (
    <Box sx={{ width: "100%", mx: 'auto', mt: 2 }}>
      <Paper elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'grey.100' }}>
          <IconButton onClick={() => changeMonth(-1)} size="small">
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">
            {format(currentDate, 'MMMM yyyy', { locale: vi })}
          </Typography>
          <IconButton onClick={() => changeMonth(1)} size="small">
            <ChevronRight />
          </IconButton>
        </Box>
        <Box sx={{ p: 1 }}>
          <Grid container spacing={1} justifyContent="center">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
              <Grid item key={day} xs={1.7}>
                <Typography variant="caption" align="center">{day}</Typography>
              </Grid>
            ))}
            {Array.from({ length: startingDayIndex }).map((_, index) => (
              <Grid item key={`empty-${index}`} xs={1.7} />
            ))}
            {renderDays()}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};