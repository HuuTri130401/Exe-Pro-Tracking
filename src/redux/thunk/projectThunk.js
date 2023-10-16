import { createAsyncThunk } from "@reduxjs/toolkit";
import projectApi from "../../api/modules/project.api";
import { openNotification } from "../../components/notification/notification";
import { closeDrawer } from "../slice/drawerSlice";

export const getAllProjectThunk = createAsyncThunk(
    'getAllProject',
    async () => {
        try {
            const { statusCode, content } = await projectApi.getAllProject();
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

export const assignUserProjectThunk = createAsyncThunk(
    'assignUserProject',
    async (userProject, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.assignUserProject(userProject);
            if (statusCode === 200) {
                openNotification('success', 'Thành công', 'Thêm thành viên thành công');
                dispatch(getAllProjectThunk())
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Đây không phải project của bạn hoặc thành viên đã tồn tại');
        }
    }
)

export const removeUserFromProject = createAsyncThunk(
    'removeUserFromProject',
    async (userProject, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.removeUserFromProject(userProject);
            if (statusCode === 200) {
                dispatch(getAllProjectThunk());
                openNotification('success', 'Thành công', 'Xóa thành viên thành công');
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Xóa thất bại bạn không phải người tạo project');
        }
    }
)

export const updateProjectThunk = createAsyncThunk(
    'updateProject',
    async (project, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode } = await projectApi.updateProject(project);
            if (statusCode === 200) {
                openNotification('success', 'Thành công', `Cập nhật project: ${project.projectName} thành công`);
                dispatch(closeDrawer())
                dispatch(getAllProjectThunk());
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Cập nhật thành viên thất bại');
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
            if (statusCode === 200) {
                openNotification('success','Thông báo','Tạo project thành công')
                return content
            }
        } catch ({ message }) {
            openNotification('error', 'Thất bại', 'Tạo project thất bại');
        }
    }
)