import { ImportXLSXConfig } from "src/utils/xlsx-helper";

export const configExcelPatient: ImportXLSXConfig = {
    name: {
      labels: ["họ tên", "tên", "họ và tên"],
      type: "string",
    },
    student_id: {
      labels: ["mã bệnh nhân", "mã", "msbn"],
      type: "string",
    },
    doctor_id: {
      labels: ["mã bác sĩ", "bác sĩ"],
      type: "string",
    },
    manager_id:{
      labels: ["mã quản trị viên"],
      type: "string",
    },
    address: {
      labels: ["Địa chỉ"],
      type: "string",
    },
    phone: {
      labels: ["điện thoại", "số điện thoại"],
      type: "string",
    },
    email: {
      labels: ["Email", "email", "email cá nhân"],
      type: "string",
    },
    password: {
      labels: ["mật khẩu"],
      type: "string",
    },
  };
export const configExcelDoctor: ImportXLSXConfig = {
    name: {
      labels: ["họ tên", "tên", "họ và tên"],
      type: "string",
    },
    major: {
        labels: ["chuyên ngành", "khoa"],
        type: "string",
    },
    phone: {
      labels: ["điện thoại", "số điện thoại"],
      type: "string",
    },
    email: {
      labels: ["Email", "email", "email cá nhân"],
      type: "string",
    },
    password: {
      labels: ["mật khẩu"],
      type: "string",
    },
};
export const configExcelAdmin: ImportXLSXConfig = {
    name: {
      labels: ["họ tên", "tên", "họ và tên"],
      type: "string",
    },
    address: {
        labels: ["địa chỉ"],
        type: "string",
    },
    phone: {
      labels: ["điện thoại", "số điện thoại"],
      type: "string",
    },
    email: {
      labels: ["email", "email", "email cá nhân"],
      type: "string",
    },
    password: {
      labels: ["mật khẩu"],
      type: "string",
    },
};