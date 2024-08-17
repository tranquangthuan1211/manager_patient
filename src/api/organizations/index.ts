
import { apiGet, apiPost} from "../api-requests";

class OrganizationsApi {
    async getOrganizations() {
        return await apiGet("/organizations");
    }
    // async createOrganization(body: any) {
    //     return await apiPost("/organizations", body);
    // }
    // async updateOrganization(body: any) {
    //     return await apiPost("/organizations/update", body);
    // }
    // async deleteOrganization(body: any) {
    //     return await apiPost("/organizations/delete", body);
    // }
}