import { createSlice } from '@reduxjs/toolkit'
import { getAllCommentThunk } from '../thunk/commentThunk';

const initialState = {
    listComments: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCommentThunk.fulfilled, (state, { payload }) => {
            state.listComments = payload;
        })
    }
});

export const { } = commentSlice.actions

export default commentSlice.reducer