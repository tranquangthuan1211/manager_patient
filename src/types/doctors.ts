export interface Doctor {
    id: string;
    name: string;
    age: number;
    phone: string;
    address: string;
    role: string;
    major: string
}
export const initialDoctor: Doctor = {
    id: "",
    name: "",
    age: 0,
    phone: "",
    address: "",
    role: "",
    major: ""
};