import { apiGet, apiPost, apiDelete } from "../api-requests";
import { Patient } from "src/types/patients";

class PaitientsApi {
    async getPatients(request: FormData): Promise<Patient[]> {
        const response = await apiGet("/patients", request);
        return response;
    }
    async deletePatient(ID: string): Promise<void> {
        return await apiDelete(`/patients/${ID}`, {});
    }
}

export default new PaitientsApi();