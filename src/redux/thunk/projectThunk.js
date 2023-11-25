import { createAsyncThunk } from "@reduxjs/toolkit";
import projectApi from "../../api/modules/project.api";
import { openNotification } from "../../components/notification/notification";
import { closeDrawer } from "../slice/drawerSlice";
import { userLocalStorage } from '../../utils/config';

export const getAllProjectThunk = createAsyncThunk(
    'getAllProject',
    async (creatorId) => {
        try {
            const { statusCode, content } = await projectApi.getAllProject(creatorId);
            if (statusCode === 200) return content;
        } catch ({ message }) {
            openNotification('error', 'Thất bại', message);
        }
    }
)

export const getProjectDetailThunk = createAsyncThunk(
    'getProjectDetail',
    async (projectId, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await projectApi.getProjectDetail(projectId);
            if (statusCode === 200) return content;
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Lấy project thất bại');
        }
    }
)

export const getProjectParticipantsThunk = createAsyncThunk(
    'getProjectParticipants',
    async (projectId, { dispatch, rejectWithValue }) => {
        try {
            const content = await projectApi.getProjectParticipants(projectId);
            return content;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const removeProjectParticipantThunk = createAsyncThunk(
    'removeProjectParticipant',
    async (projectParticipantId, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.removeProjectParticipant(projectParticipantId);
            return statusCode;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const updateProjectThunk = createAsyncThunk(
    'updateProject',
    async (project, { dispatch, rejectWithValue }) => {
        const customerInfor = userLocalStorage.get();
        try {
            const { statusCode } = await projectApi.updateProject(project);
            if (statusCode === 200) {
                dispatch(closeDrawer())
                dispatch(getAllProjectThunk(customerInfor.customer.id));
                openNotification('success', 'Thành công', 'Cập nhật project thành công');
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Cập nhật project thất bại');
            return rejectWithValue(message);
        }
    }
)

export const deleteProjectThunk = createAsyncThunk(
    'deleteProject',
    async (projectId, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.deleteProject(projectId);
            if (statusCode === 200) {
                dispatch(getAllProjectThunk());
                openNotification('success', 'Thành công', 'Xóa project thành công');
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Xóa project thất bại');
        }
    }
)

export const createProjectThunk = createAsyncThunk(
    'createProject',
    async (newProject, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await projectApi.createProject(newProject);
            if (statusCode === 201) {
                openNotification('success','Thông báo','Tạo project thành công')
                return content
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Tạo project thất bại');
        }
    }
)

export const addProjectParticipantThunk = createAsyncThunk(
    'addProjectParticipant',
    async (newProjectParticipant, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.addProjectParticipant(newProjectParticipant);
            if (statusCode === 200) {
                return statusCode;
            } else {
                return rejectWithValue("Error when add project participant");
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
