import { createAsyncThunk } from "@reduxjs/toolkit";
import aiChatBotApi from "../../api/modules/ai-chat-bot.api";

export const getMessagesHistoryThunk = createAsyncThunk(
    'getMessagesHistory',
    async ({ rejectWithValue, dispatch }) => {
        try {
            const response = await aiChatBotApi.getMessages();
            console.log(response);
            return response;
        } catch ({ message }) {
            return message;
        }
    }
)

export const clearMessagesHistoryThunk = createAsyncThunk(
    'clearMessagesHistory',
    async ({ rejectWithValue, dispatch }) => {
        console.log('clearMessagesHistoryThunk');
        try {
            const response = await aiChatBotApi.clearMessages();
            return response;
        } catch ({ message }) {
            return message;
        }
    }
)

export const sendMessageThunk = createAsyncThunk(
    'sendMessage',
    async (message, { rejectWithValue, dispatch }) => {
        try {
            const response = await aiChatBotApi.sendMessage(message);
            return response;
        } catch ({ message }) {
            return message;
        }
    }
)
