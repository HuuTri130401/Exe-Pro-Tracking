import { createSlice } from '@reduxjs/toolkit';
import { getTaskDetailThunk, getTaskDetailModalThunk } from '../thunk/taskThunk';

const initialState = {
  taskDetail: {},
  taskDetailModal: {},
}
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    removeTask: (state) => state.taskDetail = {},
    removeTaskModal: (state) => state.taskDetailModal = {}
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDetailThunk.fulfilled, (state, { payload }) => {
      state.taskDetail = payload;
    });
    builder.addCase(getTaskDetailModalThunk.fulfilled, (state, { payload }) => {
      state.taskDetailModal = payload;
    });
  }
});

export const { removeTask, removeTaskModal } = taskSlice.actions;

export default taskSlice.reducer