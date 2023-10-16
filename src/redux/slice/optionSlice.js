import { createSlice } from '@reduxjs/toolkit'
import { categoryThunk, priorityThunk, statusThunk, taskThunk } from '../thunk/optionThunk';

const initialState = {
    priority: [],
    category: [],
    status: [],
    taskType: [],
}

const optionSlice = createSlice({
    name: 'option',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(priorityThunk.fulfilled, (state, { payload }) => {
            state.priority = payload;
        });
        builder.addCase(categoryThunk.fulfilled, (state, { payload }) => {
            state.category = payload;
        });
        builder.addCase(statusThunk.fulfilled, (state, { payload }) => {
            state.status = payload;
        });
        builder.addCase(taskThunk.fulfilled, (state, { payload }) => {
            state.taskType = payload;
        });
    }
});

export const {} = optionSlice.actions

export default optionSlice.reducer