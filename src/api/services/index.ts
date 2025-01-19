import { apiGet,apiPost,apiPut  } from "../api-requests";
import { Service } from "src/types/service";
class ApiService {
   async getServiceByName(request:FormData): Promise<Service[]> {
    const response = await apiGet("/services",request);
    return response;
   }
   async getServiceClinic(request: FormData): Promise<{data:Service[]}> {
    const response = await apiGet(`/services/clinic`, FormData);
    return response;
   }
   async createService(request: Partial<Service>) {
      return await apiPost("/services", request);
   }
   async updateAccount(request: Partial<Service>) {
      console.log(request)
      return await apiPut(`/services/${request._id}`, request);
   }
}

export default new ApiService();