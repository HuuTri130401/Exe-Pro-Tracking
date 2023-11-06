import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorage } from '../../utils/config';
import { getAllUserThunk, loginThunk } from '../thunk/userThunk';
import { jwtDecode} from 'jwt-decode'; 

const initialState = {
    user: userLocalStorage.get(),
    // userSearch: [],
    users:[],
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
            userLocalStorage.remove();
            localStorage.removeItem('TOKEN');
            state.user = null;
            state.role = null; // Thêm trường role
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.user = payload;
            const token = localStorage.getItem('TOKEN');
            state.role = extractUserRole(token); // Lưu vai trò vào trạng thái
        });
        builder.addCase(getAllUserThunk.pending, (state) => {
            state.loadingUser = true;
        });
        builder.addCase(getAllUserThunk.fulfilled, (state, { payload }) => {
            if (payload) {
                state.users = payload;
            }
            console.log(typeof payload); 
            console.log(typeof state.users); 
            console.log('payload from API: ' + JSON.stringify(state.users));
            state.loadingUser = false;
        });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer