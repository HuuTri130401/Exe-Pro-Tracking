import { privateClientChatService } from "../clients/private.client";

const aiChatBotApi = {
  getMessagesHistory: (skip, limit) => {
    return privateClientChatService.get(`/messages/get?skip=${skip}&limit=${limit}`);
  },
  clearMessagesHistory: () => {
    return privateClientChatService.delete(`/messages/clear`);
  },
  sendMessage: (payload) => {
    return privateClientChatService.post(`/messages/ask`, payload);
  },
};

export default aiChatBotApi;
