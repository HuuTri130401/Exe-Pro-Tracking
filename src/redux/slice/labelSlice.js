import { createSlice } from "@reduxjs/toolkit";
import { getLabelsOfProject, addNewLabelThunk } from "../thunk/labelThunk";

const initialState = {
    labels: [],
    labelsMapper: {},
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

        builder.addCase(addNewLabelThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addNewLabelThunk.fulfilled, (state, { payload }) => {
            state.labels.push(payload);
            state.labelsMapper[payload.id] = payload.title;
            state.loading = false;
        })
        builder.addCase(addNewLabelThunk.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        })
    }
})

export const { updateLabels } = labelSlice.actions;

export default labelSlice.reducer;
