import { privateClientChatService } from "../clients/private.client";

const aiChatBotApi = {
  getMessagesHistory: (skip, limit) => {
    return privateClientChatService.get(`/messages/get?skip=${skip}&limit=${limit}`);
  },
  clearMessagesHistory: () => {
    return privateClientChatService.delete(`/messages/clear`);
  },
  sendMessage: (message) => {
    console.log(encodeURI(`/messages/ask?message=${message}`));
    return privateClientChatService.get(`/messages/ask?message=${message}`);
  },
};

export default aiChatBotApi;
