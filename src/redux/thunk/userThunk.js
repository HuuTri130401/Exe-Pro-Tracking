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
                openNotification('success', 'Đăng nhập thành công', message)
                return content;
            }
        } catch ({ statusCode, message }) {
            openNotification('error', 'Đăng nhập thất bại', message)
            return rejectWithValue(message);
        }
    }
)

export const registerThunk = createAsyncThunk(
    'register',
    async (newUser, { dispatch, rejectWithValue }) => {
        try {
            const { statusCode, content, message } = await userApi.register(newUser);
            if (statusCode === 200) {
                openNotification('success', 'Đăng ký thành công', message)
            }
            return content;
        } catch ({ statusCode, message }) {
            openNotification('error', 'Đăng ký thất bại', message)
            return rejectWithValue(message);
        }
    }
)

export const getAllUserThunk = createAsyncThunk(
    'getAllUser',
    async () => {
        try {
            const { statusCode, content } = await userApi.getAllUser();
            if (statusCode === 200) return content;
        } catch ({ message }) {
            openNotification('error', 'Thất bại', message);
        }
    }
)

