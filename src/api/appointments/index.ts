
import { apiGet, apiPost } from "../api-requests";
import { Appointment } from "src/types/appointment";

class AppointmentApi {
    async getAppointments(): Promise<Appointment[]> {
        return await apiGet("/appointments");
      }
    async createAppointment(request: Partial<Appointment>): Promise<Appointment> {
        return await apiPost("/appointments", request);
    }
}

export default new AppointmentApi();