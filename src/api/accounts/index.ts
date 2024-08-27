import { apiGet, apiPost,apiPut, apiDelete } from "../api-requests";
import {Account} from "src/types/account";
class AccountApi {
    async getAccount(
        request: FormData
    ): Promise<{data: Account[]}> {
        const response = await apiGet("/users", request);

        return response;
    }
    async createPatients(
        request: Omit<Account, "id">
    ): Promise<void> {
        return await apiPost("/users", request);
    }
    async updateAccount(request: Partial<Account>) {
        return await apiPut(`/users/${request.id}`, request);
    }
    async deleteAccount(id: string) {
        return await apiDelete(`/users/${id}`, {});
    }
}
export default new AccountApi();