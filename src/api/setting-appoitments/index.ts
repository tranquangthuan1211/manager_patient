import { apiGet, apiPost } from "../api-requests";
import {SettingAppoitment} from "../../types/setting-appoitments";
class SettingAppointmentsApi {
  async getAppointments(request:FormData): Promise<SettingAppoitment> {
    return await apiGet("/setting-appointment", request);
  }

  async createAppointment(data: any) {
    return await apiPost("appointments", data);
  }
}

export default new SettingAppointmentsApi();