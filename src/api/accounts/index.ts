import { apiGet, apiPost } from "../api-requests";
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
}
export default new AccountApi();