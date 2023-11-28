import { createSlice } from '@reduxjs/toolkit';
import { getTaskDetailThunk } from '../thunk/taskThunk';

const initialState = {
  taskDetail: {},
  originalTaskDetail: {},
  loading: false
}
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask: (state, { payload }) => {
      state.taskDetail = payload;
    },
    updateOriginalTaskDetail: (state, { payload }) => {
      state.originalTaskDetail = payload;
    },
    removeTask: (state) => state.taskDetail = {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDetailThunk.pending, (state) => {
      state.taskDetail = {};
      state.originalTaskDetail = {};
      state.loading = true;
    })
    builder.addCase(getTaskDetailThunk.fulfilled, (state, { payload }) => {
      state.taskDetail = payload[0];
      state.originalTaskDetail = payload[0];
      state.loading = false;
    })
    builder.addCase(getTaskDetailThunk.rejected, (state) => {
      state.taskDetail = {};
      state.originalTaskDetail = {};
      state.loading = false;
    })
  }
});

export const { removeTask, updateTask, updateOriginalTaskDetail } = taskSlice.actions;

export default taskSlice.reducer
