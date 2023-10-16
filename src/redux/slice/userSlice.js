import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorage } from '../../utils/config';
import { getUserThunk, loginThunk } from '../thunk/userThunk';

const initialState = {
    user: userLocalStorage.get(),
    userSearch: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            userLocalStorage.remove();
            localStorage.removeItem('TOKEN');
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.user = payload;
        });
        builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
            state.userSearch = payload;
        })
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer