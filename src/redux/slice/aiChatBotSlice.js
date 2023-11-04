import { createSlice } from "@reduxjs/toolkit";
import { getMessagesHistoryThunk, clearMessagesHistoryThunk, sendMessageThunk } from "../thunk/aiChatBotThunk";

const initialState = {
    messages: [],
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
            state.messages = payload;
        })
        builder.addCase(getMessagesHistoryThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
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
    }
});

export const { sendMessage, clearMessagesHistory } = aiChatBotSlice.actions;

export default aiChatBotSlice.reducer;
