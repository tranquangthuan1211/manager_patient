import { apiGet } from "../api-requests";
import { Complaint } from "src/types/complaint";
class CompalintsApi {
  async getComplaints(requests:FormData): Promise<Complaint[]> {
    const response = await apiGet("/complaints", requests);

    return response;
  }
}

export default new CompalintsApi();