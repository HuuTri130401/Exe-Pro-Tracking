import { createSlice } from "@reduxjs/toolkit";
import { getLabelsOfProject, addNewLabelToProjectThunk } from "../thunk/labelThunk";

const initialState = {
    labels: [],
    labelsMapper: {},
    newLabelLoading: false,
    loading: false,
    error: ''
}

const labelSlice = createSlice({
    name: 'label',
    initialState,
    reducers: {
        updateLabels: (state, { payload }) => {
            state.labels = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLabelsOfProject.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLabelsOfProject.fulfilled, (state, { payload }) => {
            state.labels = payload;
            state.labelsMapper = payload.reduce((acc, label) => {
                acc[label.id] = label.title;
                return acc;
            }, {})
            state.loading = false;
        })
        builder.addCase(getLabelsOfProject.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        })

        builder.addCase(addNewLabelToProjectThunk.pending, (state) => {
            state.newLabelLoading = true;
        })
        builder.addCase(addNewLabelToProjectThunk.fulfilled, (state, { payload }) => {
            state.newLabelLoading = false;
        })
        builder.addCase(addNewLabelToProjectThunk.rejected, (state, { payload }) => {
            state.error = payload;
            state.newLabelLoading = false;
        })
    }
})

export const { updateLabels } = labelSlice.actions;

export default labelSlice.reducer;
