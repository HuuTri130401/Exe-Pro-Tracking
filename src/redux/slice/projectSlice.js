import { createSlice } from '@reduxjs/toolkit'
import { getAllProjectThunk, getProjectDetailThunk } from '../thunk/projectThunk';

const initialState = {
    projects: [],
    projectDetail: {},
    projectEdit: {},
    loadingProject: false,
    isSkeleton: false,
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        removeProject: (state) => {
            state.projectDetail = {}
        },
        editProject: (state, { payload }) => {
            if (payload) {
                state.projectEdit = payload
            } else {
                state.projectEdit = {}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProjectThunk.pending, (state) => {
            state.loadingProject = true;
        });
        builder.addCase(getAllProjectThunk.fulfilled, (state, { payload }) => {
            state.projects = payload;
            state.loadingProject = false;
        });
        builder.addCase(getProjectDetailThunk.pending, (state) => {
            state.loadingProject = true;
            state.isSkeleton = true;
        })
        builder.addCase(getProjectDetailThunk.fulfilled, (state, { payload }) => {
            state.projectDetail = payload
            state.isSkeleton = false;
            state.loadingProject = false;
        })
        builder.addCase(getProjectDetailThunk.rejected, (state) => {
            state.loadingProject = true;
        })
    }
});

export const { removeProject, editProject } = projectSlice.actions

export default projectSlice.reducer