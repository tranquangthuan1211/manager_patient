import { apiGet,apiPost,apiPut  } from "../api-requests";
import { Service } from "src/types/service";
class ApiService {
   async getServiceByName(request:FormData): Promise<Service[]> {
    const response = await apiGet("/services",request);
    return response;
   }
   async getServiceClinic(request: FormData): Promise<Service[]> {
    const response = await apiGet(`/services/clinic`, FormData);
    return response;
   }
}

export default new ApiService();