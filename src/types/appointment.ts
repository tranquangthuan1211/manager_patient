export interface Appointment {
    id: string;
    date: string;
    time: string;
    status: string;
    id_patient: string;
    name_patient?: string;
    id_doctor?: string;
    name_doctor?: string;
    id_manager?: string;
    name_manager?: string;
}

export const initialAppointment: Appointment = {
    id: "",
    date: "",
    time: "",
    status: "",
    id_patient: "",
    name_patient: "",
    id_doctor: "",
    name_doctor: "",
    id_manager: "",
    name_manager: "",
};
