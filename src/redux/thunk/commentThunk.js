import { createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../../api/modules/comment.api";

export const getAllCommentThunk = createAsyncThunk(
    'getAllComment',
    async (taskId, { rejectWithValue, dispatch }) => {
        try {
            const { content } = await commentApi.getAllComment(taskId);
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const insertCommentThunk = createAsyncThunk(
    'insertComment',
    async (newCommnent, { rejectWithValue, dispatch }) => {
        try {
            const { content } = await commentApi.insertComment(newCommnent);
            dispatch(getAllCommentThunk(content.taskId))
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const editCommentThunk = createAsyncThunk(
    'editComment',
    async (editCommnent, { rejectWithValue, dispatch }) => {
        try {
            const { content } = await commentApi.updateComment(editCommnent);
            dispatch(getAllCommentThunk(content.taskId))
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)

export const deleteCommentThunk = createAsyncThunk(
    'deleteComment',
    async ({ deleteComment, taskId }, { rejectWithValue, dispatch }) => {
        try {
            const { content } = await commentApi.deleteComment(deleteComment);
            dispatch(getAllCommentThunk(taskId))
            return content;
        } catch ({ message }) {
            return message;
        }
    }
)