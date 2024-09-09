import {Page as PageType} from 'src/types/page';
import {Layout} from 'src/layouts/index';
import {LayoutPatient} from 'src/layouts/patient/patient-layout';
import { Stack, Typography } from '@mui/material';
import {AppointmentPatient} from 'src/sections/trang-chu/appointment-patient';
import {Service} from 'src/sections/trang-chu/index';
import { NearbyClinic } from 'src/sections/trang-chu/clinic-near-home';
import {Footer} from 'src/sections/trang-chu/footer';
import { useState } from 'react';

const Page: PageType = () => {
    const [service, onSearchService] = useState<string>('');
    return (
        <LayoutPatient onSearchService={onSearchService}>
            <Stack
                sx = {{
                    width: '100%',
                    backgroundColor:"white"
                }}
            >
                <AppointmentPatient />
                <Stack
                    spacing={2}
                    sx = {{
                        width: '98%',
                        backgroundColor:"white",
                        borderRadius: '10px',
                        padding: '20px',
                    }}
                >
                    <Stack
                        spacing={2}
                    >
                        <Typography
                            variant="h5"
                            sx = {{
                                color: 'black',
                            }}
                        >
                            Dịch vụ chăm sóc sức khỏe
                        </Typography>
                        <Service />
                    </Stack>
                    <Stack
                        spacing={2}
                    >
                        <Typography
                                variant="h6"
                                sx = {{
                                    color: 'black',
                                }}
                            >
                                Phòng Khám gần khu vực của bạn 
                        </Typography>
                        <NearbyClinic />
                    </Stack>
                </Stack> 
                <Stack>
                    <Footer />
                </Stack>
            </Stack>
        </LayoutPatient>
    )
}
Page.getLayout = (page) => 
    <Layout>
        {page}
    </Layout>

export default Page;