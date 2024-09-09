import { apiGet,apiPost,apiPut  } from "../api-requests";
import { Service } from "src/types/service";
class ApiService {
   async getServiceByName(request:FormData): Promise<Service[]> {
    const response = await apiGet("/services",request);
    return response;
   }
}

export default new ApiService();