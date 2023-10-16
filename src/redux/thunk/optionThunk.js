import { createAsyncThunk } from "@reduxjs/toolkit";
import optionApi from "../../api/modules/option.api";

export const priorityThunk = createAsyncThunk(
    'priority',
    async () => {
        try {
            const { content } = await optionApi.priority();
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const categoryThunk = createAsyncThunk(
    'category',
    async () => {
        try {
            const { content } = await optionApi.projectCategory();
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const statusThunk = createAsyncThunk(
    'status',
    async () => {
        try {
            const { content } = await optionApi.status();
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const taskThunk = createAsyncThunk(
    'task',
    async () => {
        try {
            const { content } = await optionApi.taskType();
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)