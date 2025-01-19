import { apiGet, apiPost,apiPut, apiDelete } from "../api-requests";
import {Account} from "src/types/account";
class AccountApi {
    async getAccount(
        request: FormData
    ): Promise<{data: Account[]}> {
        const response = await apiGet("/users", request);

        return response;
    }
    async createAccount(
        request: Partial<Account>
    ):Promise<{error:number,message:string, data:any}>{
        try {
            return await apiPost("/users", request);
        } catch (error) {
            // console.log(error)
            throw new Error(error.message);
        }
    }
    async createManyAccounts(
        request:Partial<Account[]>
    ) {
        return await apiPost("/users/many", {data: request});
    }
    async updateAccount(request: Partial<Account>) {
        console.log(request)
        return await apiPut(`/users/${request._id}`, request);
    }
    async deleteAccount(id: string) {
        return await apiDelete(`/users/${id}`, {});
    }
}
export default new AccountApi();