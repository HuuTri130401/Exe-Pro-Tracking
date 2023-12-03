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
            openNotification('error', 'Get projects failed', message);
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
            openNotification('error', 'Get project detail failed', message);
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
                openNotification('success', 'Successfully', 'Update project successful');
            }
        } catch ({ message }) {
            openNotification('error', 'Error', 'Update project failed');
            return rejectWithValue(message);
        }
    }
)

export const deleteProjectThunk = createAsyncThunk(
    'deleteProject',
    async (projectId, { dispatch, rejectWithValue }) => {
        const customerInfor = userLocalStorage.get();
        try {
            const { statusCode } = await projectApi.deleteProject(projectId);
            if (statusCode === 200) {
                dispatch(getAllProjectThunk(customerInfor.customer.id));
                openNotification('success', 'Successfully', 'Delete project successful');
            }
        } catch ({ message }) {
            openNotification('Error', 'Error', 'Delete project failed');
        }
    }
)

export const createProjectThunk = createAsyncThunk(
    'createProject',
    async (newProject, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content } = await projectApi.createProject(newProject);
            if (statusCode === 201) {
                openNotification('success','Successfully','Create project successful')
                return content
            }
        } catch ({ message }) {
            openNotification('error', 'Failed', 'Create project failed');
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
