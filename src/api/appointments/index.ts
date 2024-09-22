
import { apiGet, apiPost, apiDelete, apiPatch, apiPut } from "../api-requests";
import { Appointment } from "src/types/appointment";

class AppointmentApi {
    async getAppointments(): Promise<Appointment[]> {
        return await apiGet("/appointments");
      }
    async createAppointment(request: Partial<Appointment>): Promise<Appointment> {
        return await apiPost("/appointments", request);
    }
    async updateAppointment(request: Partial<Appointment>) {
        const id = request._id;
        console.log(id);
        return await apiPut(`/appointments/${id}`,request);
    }
    async deleteAccount(id: string) {
        return await apiDelete(`/appointments/${id}`, {});
    }
}

export default new AppointmentApi();