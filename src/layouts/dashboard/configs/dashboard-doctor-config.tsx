import { DashboardSection } from "./config";


const getDashboardDoctorConfig:DashboardSection[] = [
    {
        subheader:'Doctor', 
        items:[
            {
                title:"Lịch khám",
                path: "/lich-kham",
            },
            {
                title: "Danh sách bệnh nhân",
                path: "/danh-sach-benh-nhan",
            },
            {
                title:"Hô sơ bệnh nhân",
                path: "/ho-so-benh-nhan",
            },
        ]
    },
    {
        subheader:'Thiết lập',
        items:[
            {
                title: "cài đặt",
                path:"/settings",
            },
            {
                title: "Đăng xuất",
            }
        ]
    }

        
]