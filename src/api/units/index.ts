import { apiGet } from "../api-requests";
import { Unit } from "src/types/units";
class UnitsApi {
    async getUnits():Promise<Unit[]> {
        const response = await apiGet("/units", {});
        return response;
    }
}

export default new UnitsApi();