import { createAsyncThunk } from "@reduxjs/toolkit";
import aiChatBotApi from "../../api/modules/ai-chat-bot.api";

export const getMessagesHistoryThunk = createAsyncThunk(
    'getMessagesHistory',
    async ({ skip, limit }, { rejectWithValue }) => {
        try {
            const response = await aiChatBotApi.getMessagesHistory(skip, limit);
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const clearMessagesHistoryThunk = createAsyncThunk(
    'clearMessagesHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await aiChatBotApi.clearMessagesHistory();
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
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
            return rejectWithValue(message);
        }
    }
)
