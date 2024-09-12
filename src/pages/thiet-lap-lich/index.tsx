import { Stack, Typography,TextField } from '@mui/material';
import { useState } from 'react';
import { Layout } from 'src/layouts';
import { type Page as PageType } from 'src/types/page';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const Page: PageType = () => {
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

    const handleTimeChange = (newValue: Dayjs | null) => {
        setSelectedTime(newValue);
    };

    return (
       <Stack spacing={2}>
           <Typography variant = "h5">Thiết lập lịch</Typography>
           <Stack 
                spacing={1}
                sx = {{
                    width: '100%'
                }}
           >
                <Typography variant = "caption">Thời gian bắt đầu</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <TimePicker
                            label="Chọn thời gian bắt đầu"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                },
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
            </Stack>
            <Stack 
                spacing={1}
                sx = {{
                    width: '100%'
                }}
           >
                <Typography variant = "caption">Thời gian kết thúc</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <TimePicker
                            label="Chọn thời gian kết thúc"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                },
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
            </Stack>
            <Stack 
                spacing={1}
                sx = {{
                    width: '100%'
                }}
           >
                <Typography variant = "caption">khoảng thời gian giữa các lịch hẹn</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <TimePicker
                            label="khoảng thời gian giữa các lịch hẹn"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                },
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
            </Stack>
            <Stack>
                <Typography variant = "caption">Số lượng bệnh nhân tối đa</Typography>
                <TextField 
                    label = "Số lượng bệnh nhân tối đa"
                    type = "number"
                />
            </Stack>
        </Stack>
    );
}
Page.getLayout = (page) => <Layout>{page}</Layout>;
export default Page;