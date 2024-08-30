import { apiGet } from "../api-requests";
import { Disease } from "src/types/diseases"; 
class DiseaseApi {
    async getDiseases(request: FormData): Promise<{data: Disease[]}> {
        const response = await apiGet(`/diseases`, request);

        return response
    }
}

export default new DiseaseApi();