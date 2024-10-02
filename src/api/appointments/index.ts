
import { apiGet, apiPost, apiDelete, apiPatch, apiPut } from "../api-requests";
import { Appointment } from "src/types/appointment";

class AppointmentApi {
    async getAppointment(): Promise<Appointment> {
        return await apiGet(`/appointments`);
    }
    async getAppointments(): Promise<{data:Appointment[]}> {
        return await apiGet("/appointments/many-appoitment");
      }
    async createAppointment(request: Partial<Appointment>): Promise<Appointment> {
        return await apiPost("/appointments", request);
    }
    async completeAppointment(request: Partial<Appointment>) {
        const id = request.id;
        // console.log(id);
        return await apiPatch(`/appointments/${id}`,request);
    }
    async updateAppointment(request: Partial<Appointment>) {
        const id = request.id;
        return await apiPut(`/appointments/${id}`, request);
    }
    async deleteAccount(id: string) {
        return await apiDelete(`/appointments/${id}`,undefined);
    }
}

export default new AppointmentApi();