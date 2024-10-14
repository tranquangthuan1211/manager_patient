import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "../api-requests";
import { Message } from "src/types/messages";

class MessageApi {
    async getMessages(requests: any):Promise<Message[]> {
        return await apiGet("/messages", requests);
    }
    async createMessage(request: any) {
        return await apiPost("/messages", request);
    }
    async updateMessage(request: any) {
        const id = request.id;
        return await apiPatch(`/messages/${id}`, request);
    }
    async deleteMessage(id: string) {
        return await apiDelete(`/messages/${id}`, {});
    }
}

export default new MessageApi();