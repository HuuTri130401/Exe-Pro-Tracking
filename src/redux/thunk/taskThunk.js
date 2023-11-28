import { createAsyncThunk } from "@reduxjs/toolkit";
import taskApi from "../../api/modules/task.api";
import { openNotification } from "../../components/notification/notification";
import { getProjectDetailThunk } from "./projectThunk";
import { closeDrawer, closeModal } from "../slice/drawerSlice";

export const getTaskDetailThunk = createAsyncThunk(
    'getTaskDetail',
    async ({projectId, todoId}, { dispatch, rejectWithValue }) => {
        try {
            const payload = await taskApi.getTaskDetail({projectId, todoId});
            if (payload.statusCode === 200 && payload.listTodoFilter.length > 0) {
                return payload.listTodoFilter;
            } else {
                return rejectWithValue(payload.message);
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const updateStatusTaskThunk = createAsyncThunk(
    'updateStatusTask',
    async ({ taskId, statusId, projectId }, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await taskApi.updateStatus({ taskId, statusId });
            // Gọi API cập nhật trạng thái với taskId và statusId
            if (statusCode === 200) {
                openNotification('success', 'Thông báo', 'Thao tác thành công');
                dispatch(getProjectDetailThunk(projectId))
                return content;
            }
        } catch ({ message }) {
            openNotification('error', 'Thông báo', message);
            return rejectWithValue(message);
        }
    }
)


export const updateTaskThunk = createAsyncThunk(
    'updateTask',
    async (taskUpdate, { dispatch, rejectWithValue }) => {
        try {
            const payload = await taskApi.updateTask(taskUpdate);
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

export const assignUserTaskThunk = createAsyncThunk(
    'assignUserTask',
    async ({ taskId, projectId, userId }, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await taskApi.assignUserTask({ taskId, userId });
            if (statusCode === 200) {
                dispatch(getProjectDetailThunk(projectId))
                dispatch(getTaskDetailThunk(taskId))
                openNotification('success', 'Thông báo', content);
            }
        } catch ({ message }) {
            openNotification('error', 'Thông báo', 'Cập nhật thất bại');
            return rejectWithValue(message);
        }
    }
)

export const createTaskTaskThunk = createAsyncThunk(
    'createTask',
    async (newTask, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, newTodo } = await taskApi.createTask(newTask);
            if (statusCode === 201) {
                dispatch(closeDrawer());
                dispatch(getProjectDetailThunk(newTodo.projectId));
                openNotification('success', 'Thông báo', 'Tạo task thành công');
                return newTodo;
            }
        } catch ({ message }) {
            openNotification('error', 'Thông báo', 'Tạo task không thành công!');
            return rejectWithValue(message);
        }
    }
)

export const removeTaskThunk = createAsyncThunk(
    'removeTask',
    async ({ taskId, projectId }, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await taskApi.removeTask(taskId);
            if (statusCode === 200) {
                openNotification('success', 'Thông báo', 'Xóa task thành công');
                dispatch(closeModal());
                dispatch(getProjectDetailThunk(projectId))
                return content;
            }
        } catch ({ message }) {
            openNotification('error', 'Thông báo', 'Bạn không có quyền xóa task');
            return rejectWithValue(message);
        }
    }
)
