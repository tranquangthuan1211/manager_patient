import { apiGet } from "../api-requests";
import { Doctor } from "src/types/doctors";
class DoctorApi {
    async getDoctors(
        requests: any
    ):Promise<Doctor[]> {
        return await apiGet("/doctors", requests);
    }
}

export default new DoctorApi();