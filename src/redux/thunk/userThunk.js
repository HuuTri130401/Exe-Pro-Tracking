import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/modules/user.api";
import { openNotification } from "../../components/notification/notification";
import { userLocalStorage } from "../../utils/config";

export const loginThunk = createAsyncThunk(
    'login',
    async (user, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content, message } = await userApi.login(user);
            if (statusCode === 200) {
                userLocalStorage.set(content);
                localStorage.setItem('TOKEN', content.accessToken)
                openNotification('success', 'Login Successful', message)
                return content;
            }
        } catch ({ statusCode, message }) {
            openNotification('error', 'Login Failed', message)
            return rejectWithValue(message);
        }
    }
)

export const registerThunk = createAsyncThunk(
    'register',
    async (newUser, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content, message } = await userApi.register(newUser);
            if (statusCode === 201) {
                openNotification('success', 'Register Successful', message)
            }
            return content;
        } catch ({ statusCode, message }) {
            openNotification('error', 'Register Failed', message)
            return rejectWithValue(message);
        }
    }
)

export const getAllUserThunk = createAsyncThunk(
    'getAllUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, listAllChildTask } = await userApi.getAllUser();
            if (statusCode === 200) {
                return listAllChildTask;
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const getUserByEmailThunk = createAsyncThunk(
    'getUserByEmail',
    async (email, { dispatch, rejectWithValue }) => {
        try {
            const payload = await userApi.getUserByEmail(email);
            if (payload.statusCode === 200) {
                return payload.accountTypeById.result;
            } else {
                return rejectWithValue(payload.message);
            }
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
