import { createSlice } from '@reduxjs/toolkit'
import {
    getAllProjectThunk,
    getProjectDetailThunk,
    getProjectParticipantsThunk,
    removeProjectParticipantThunk
} from '../thunk/projectThunk';
import { userLocalStorage } from '../../utils/config';

const initialState = {
    projects: [],
    projectDetail: {},
    projectEdit: {},
    projectParticipants: [],
    isProjectLeader: false,
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
            state.loadingProject = false;
        })

        builder.addCase(getProjectParticipantsThunk.pending, (state) => {
            state.loadingProject = true;
        })
        builder.addCase(getProjectParticipantsThunk.fulfilled, (state, { payload }) => {
            const currentUser = userLocalStorage.get();

            state.projectParticipants = payload;
            state.projectParticipants.forEach((participant) => {
                if (participant.isLeader && participant.customerId === currentUser.customer.id) {
                    state.isProjectLeader = true;
                }
            })

            state.loadingProject = false;
        })
        builder.addCase(getProjectParticipantsThunk.rejected, (state) => {
            state.isProjectLeader = false;
            state.projectParticipants = [];
            state.loadingProject = false;
        })

        builder.addCase(removeProjectParticipantThunk.pending, (state) => {
            state.loadingProject = true;
        })
        builder.addCase(removeProjectParticipantThunk.fulfilled, (state) => {
            state.loadingProject = false;
        })
        builder.addCase(removeProjectParticipantThunk.rejected, (state) => {
            state.loadingProject = false;
        })
    }
});

export const { removeProject, editProject } = projectSlice.actions

export default projectSlice.reducer
