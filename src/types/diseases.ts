export interface Disease {
    id: string;
    id_patient: string;
    name: string;
    description: string;
    link: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
export const initialDisease: Disease = {
    id: "",
    id_patient: "",
    name: "",
    description: "",
    link: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
}