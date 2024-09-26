export interface Appointment {
    _id: string;
    id: string;
    date: Date | null;
    time: string | "";
    status: string;
    id_patient: string;
    name_patient?: string;
    id_doctor?: string;
    doctor_name?: string;
    clinic_id?: string;
    name_manager?: string;
}

export const initialAppointment: Appointment = {
    _id: "",
    id: "",
    date: null ,
    time: "",
    status: "",
    id_patient: "",
    name_patient: "",
    id_doctor: "",
    doctor_name: "",
    clinic_id: "",
    name_manager: "",
};
export enum StatusAppointment {
    PENDING = "Chờ xác nhận",
    COMPLETED = "Đã hoàn thành",
    CANCELLED = "Đã hủy",
    WAITING = "Chờ khám",

}