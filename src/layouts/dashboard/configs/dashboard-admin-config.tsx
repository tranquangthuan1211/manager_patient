import {DashboardSection} from "./config"
import {Paths} from 'src/types/paths';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FlagIcon from '@mui/icons-material/Flag';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
export const getDashboardAdminConfigs: DashboardSection[] = [
    {
        subheader:'Admin', 
        items:[
            {
                title:"Dashboard",
                path: Paths.dashboard["thong-ke"],
                icon: <LineAxisIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title: "Quản lý tài khoản",
                path: Paths.dashboard["quan-ly-tai-khoan"],
                icon: <AccountTreeIcon sx = {{
                    width: 20,
                }}/>    
            }, 
            {
                title: "Bệnh nhân",
                path: Paths.dashboard["benh-nhan"],
                icon: <AccountBoxIcon sx = {{
                    width: 20,
                }}/>
            }, 
            {
                title:"Quản lý khiếu nại",
                path: Paths.dashboard["quan-ly-khieu-nai"],
                icon: <FlagIcon sx = {{
                    width: 20,
                }}/>    
            },
            {
                title:"Dịch vụ",
                path: Paths.dashboard["dich-vu"],
                icon: <DesignServicesIcon sx = {{
                    width: 20,
                }}/>    
            },
            {
                title:"Xuất danh sách",
                path: Paths.dashboard["xuat-danh-sach"],
                icon: <SystemUpdateAltIcon sx = {{
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
                icon: <LogoutIcon sx = {{
                    width: 20,
                }}/>

            }
        ]
    }
]
    