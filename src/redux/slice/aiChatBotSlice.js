import { createSlice } from "@reduxjs/toolkit";
import { getMessagesHistoryThunk, clearMessagesHistoryThunk, sendMessageThunk } from "../thunk/aiChatBotThunk";
import { reverse } from "lodash";
import { logout } from "./userSlice";

const initialState = {
    messages: [],
    isLoadedHistory: false,
    loading: false,
    error: null
};

const aiChatBotSlice = createSlice({
    name: "aiChatBot",
    initialState,
    reducers: {
        sendMessage: (state, { payload }) => {
            state.messages.push({
                message: payload,
                sender: "Human",
                direction: "outgoing"
            });
        },
        clearMessagesHistory: (state, { payload }) => {
            state.messages = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessagesHistoryThunk.pending, (state, { payload }) => {
            state.loading = true;
        })
        builder.addCase(getMessagesHistoryThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            const loadedMessages = payload.map(message => {
                return {
                    message: message.content,
                    sender: message.message_type,
                    direction: message.message_type === "AI" ? "incoming" : "outgoing"
                }
            })
            reverse(loadedMessages);
            state.messages = loadedMessages;
            state.isLoadedHistory = true;
        })
        builder.addCase(getMessagesHistoryThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.isLoadedHistory = true;
        })

        builder.addCase(clearMessagesHistoryThunk.pending, (state, { payload }) => {
            state.loading = true;
        })
        builder.addCase(clearMessagesHistoryThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.messages = [];
        })
        builder.addCase(clearMessagesHistoryThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })

        builder.addCase(sendMessageThunk.pending, (state, { payload }) => {
            state.loading = true;
        })
        builder.addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.messages.push({
                message: payload,
                sender: "AI",
                direction: "incoming"
            });
        })
        builder.addCase(sendMessageThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })

        builder.addCase(logout, (state, { payload }) => {
            state.messages = [];
            state.isLoadedHistory = false;
            state.loading = false;
            state.error = null;
        })
    }
});

export const { sendMessage, clearMessagesHistory } = aiChatBotSlice.actions;

export default aiChatBotSlice.reducer;
