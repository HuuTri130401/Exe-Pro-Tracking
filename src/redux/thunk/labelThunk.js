import { createAsyncThunk } from "@reduxjs/toolkit";
import LabelApi from "../../api/modules/label.api";

export const getLabelsOfProject = createAsyncThunk(
    'getLabelsOfProject',
    async (projectId, { rejectWithValue }) => {
        try {
            const payload = await LabelApi.getLabelsOfProject(projectId);
            if (payload.statusCode === 200) {
                return payload.listTodoByProjectId;
            } else {
                return rejectWithValue(payload.message);
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const addNewLabelThunk = createAsyncThunk(
    'addNewLabelToProject',
    async (newLabel, { rejectWithValue }) => {
        try {
            const payload = await LabelApi.addNewLabelToProject(newLabel);
            if (payload.statusCode === 200) {
                return payload.content;
            } else {
                return rejectWithValue(payload.message);
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
