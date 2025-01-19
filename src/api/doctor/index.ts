import { apiGet,apiPatch,apiDelete,apiPost,apiPut } from "../api-requests";
import { Doctor } from "src/types/doctors";
class DoctorApi {
    async getDoctors(
        requests: any
    ):Promise<{data:Doctor[] }> {
        return await apiGet("/doctors", requests);
    }
    async updateDoctor(request: Partial<Doctor>) {
        const id = request.id;
        return await apiPatch(`/doctors/${id}`, request);
    }
    async deleteDoctor(id: string) {
        return await apiDelete(`/doctors/${id}`,{});
    }
}

export default new DoctorApi();