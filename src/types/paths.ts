import doctor from "src/api/doctor";

export const Paths = {
    index:'/',
    auth: {
        login: "/auth/login",
        register: "/auth/jwt/register",
      },
    logout: "/dang-xuat",
    chat: "/tu-van",
    dashboard: {
      "thong-ke": "/",
      "thong-tin-tai-khoan": "/thong-tin-tai-khoan",
      "ke-hoach":'/ke-hoach',
      "quan-ly-tai-khoan": "/quan-ly-tai-khoan",
      "lich-hen": "/lich-hen",
      "benh-nhan": "/quan-ly-benh-nhan",
      "bac-si": "/quan-ly-bac-si",
      "thiet-lap-lich": "/thiet-lap-lich",
      "xuat-danh-sach": "/xuat-danh-sach",
      "dich-vu": "/dich-vu",
      "quan-ly-khieu-nai":"/khieu-nai",
      "settings":'/cai-dat'
    },
    doctor:{
    },
    patient:{
      "benh-nhan":"/benh-nhan",
      "dat-lich":"/benh-nhan/dat-lich",
      "lich-hen":"/benh-nhan/lich-hen",
    }
}