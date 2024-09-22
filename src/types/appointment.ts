export interface Appointment {
    _id: string;
    id: string;
    date: Date | null;
    time: string | "";
    status: string;
    id_patient: string;
    name_patient?: string;
    id_doctor?: string;
    name_doctor?: string;
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
    name_doctor: "",
    clinic_id: "",
    name_manager: "",
};
