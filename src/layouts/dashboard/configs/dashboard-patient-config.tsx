import {DashboardSection} from "./config"
import {Paths} from 'src/types/paths';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
export const getDashboardPatientConfigs: DashboardSection[] = [
    {
        subheader:'Bệnh nhân', 
        items:[
            {
                title:"Trang chủ",
                path: Paths.patient["benh-nhan"],
                icon: <HomeIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title:"Đặt lịch",
                path:Paths.patient["dat-lich"],
                icon: <CalendarMonthIcon width = {20}/>
            },
            {
                title:"Lịch hẹn",
                path:Paths.patient["lich-hen"],
                icon: <EventAvailableIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title:"Trò chuyện",
                path:"/dashboard/tro-chuyen",
                icon: <MessageIcon sx = {{
                    width: 20,
                }}/>    
            }
        ]
    }, 
    {
        subheader:'Thiết lập',
        items:[
            {
                title: "cài đặt",
                path:Paths.dashboard["settings"],
                icon: <SettingsIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title: "Đăng xuất",
                path: Paths.logout,
                icon: <LogoutIcon sx = {{
                    width: 20,
                }}/>


            }
        ]
    }
]
    