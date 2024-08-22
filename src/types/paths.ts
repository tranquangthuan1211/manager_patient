import doctor from "src/api/doctor";

export const Paths = {
    index:'/',
    auth: {
        login: "/auth/jwt/login",
        register: "/auth/jwt/register",
      },
    dashboard: {
      "thong-ke": "/",
      "thong-tin-tai-khoan": "/thong-tin-tai-khoan",
      "ke-hoach":'/ke-hoach',
      "quan-ly-tai-khoan": "/quan-ly-tai-khoan",
      "benh-nhan": "/quan-ly-benh-nhan",
      "xuat-danh-sach": "/xuat-danh-sach",
      "dich-vu": "/dich-vu",
      "quan-ly-khieu-nai":"/quan-ly-khieu-nai",
      "settings":'/settings'
    },
    doctor:{

    },
    patient:{
      
    }
}