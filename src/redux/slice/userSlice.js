import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorage } from '../../utils/config';
import { getAllUserThunk, loginThunk } from '../thunk/userThunk';
import { jwtDecode } from 'jwt-decode';
import { openNotification } from '../../components/notification/notification';

const initialState = {
    user: userLocalStorage.get(),
    users: [],
    error: undefined,
    loadingUser: false,
}

const extractUserRole = (token) => {
    try {
        const tokenPayload = jwtDecode.decode(token);
        return tokenPayload.role; // Trả về vai trò từ JWT
    } catch (error) {
        return null;
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.role = null; // Thêm trường role
            userLocalStorage.remove();
            localStorage.removeItem('TOKEN');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.loadingUser = true;
        });
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.user = payload;
            const token = localStorage.getItem('TOKEN');
            state.role = extractUserRole(token); // Lưu vai trò vào trạng thái
        });
        builder.addCase(loginThunk.rejected, (state, { payload }) => {
            state.error = payload;
            state.loadingUser = false;
        });

        builder.addCase(getAllUserThunk.pending, (state) => {
            state.loadingUser = true;
        });
        builder.addCase(getAllUserThunk.fulfilled, (state, { payload }) => {
            state.users = payload;
            state.loadingUser = false;
        });
        builder.addCase(getAllUserThunk.rejected, (state, { payload }) => {
            openNotification('error', 'Get Users Failed', payload)
            state.error = payload;
            state.loadingUser = false;
        });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer
