import { apiGet, apiPost } from "../api-requests";
import { UserDetail, User } from "src/types/users";
import {SignInRequest,SignInResponse, SignUpRequest,SignUpResponse} from "src/types/users";


class UserApi {
    async getUsers(request: FormData): Promise<UserDetail[]> {
        const response = await apiGet("/users");
        return response;
      }
    async signIn(request: SignInRequest): SignInResponse {
        return await apiPost("/users/login", request);
      }
    async signUp(request: SignUpRequest): Promise<{error:number,message:string, data:any}> {
        return await apiPost("/users", request);
      }
    async me(): Promise<{data:User}> {
        return await apiGet("/users/info");
    }
}

export default new UserApi();