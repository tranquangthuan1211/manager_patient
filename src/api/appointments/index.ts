
import { apiGet, apiPost } from "../api-requests";
import { Appointment } from "src/types/appointment";

class AppointmentApi {
    async getAppointments(): Promise<Appointment[]> {
        const response = await apiGet("/appointments");
        return response;
      }
    async createAppointment(request: Appointment): Promise<Appointment> {
        return await apiPost("/appointments", request);
    }
}

export default new AppointmentApi();