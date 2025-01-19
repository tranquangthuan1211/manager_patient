export interface Complaint {
    id: string;
    doctor_name: string;
    patient_name: string;
    manager_name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}