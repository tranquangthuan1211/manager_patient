import { apiGet } from "../api-requests";
class CompalintsApi {
  async getComplaints(requests:FormData): Promise<any> {
    const response = await apiGet("complaints", requests);

    return response;
  }
}

export default new CompalintsApi();