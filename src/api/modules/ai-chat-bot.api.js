import { privateClientChatService } from "../clients/private.client";

const aiChatBotApi = {
  getMessages: (skip = 0, limit = 10) => {
    return privateClientChatService.get(`/messages/get?skip=${skip}&limit=${limit}`);
  },
  clearMessages: () => {
    return privateClientChatService.delete("/messages/clear");
  },
  sendMessage: (message) => {
    console.log(encodeURI(`/messages/ask?message=${message}`));
    return privateClientChatService.get(encodeURI(`/messages/ask?message=${message}`));
  },
};

export default aiChatBotApi;
