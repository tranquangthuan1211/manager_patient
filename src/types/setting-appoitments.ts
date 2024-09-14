import { init } from "next/dist/compiled/webpack/webpack";

export interface SettingAppoitment {
    id: string;
    id_clinic: string;
    start_time: Date;
    end_time: Date;
    between_time: number;
    number_patients: number;
}

export const initSettingAppoitment: SettingAppoitment = {
    id: '',
    id_clinic: '',
    start_time: new Date(),
    end_time: new Date(),
    between_time: 0,
    number_patients: 0
}