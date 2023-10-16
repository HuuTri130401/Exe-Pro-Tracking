import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpenModal: false,
    isOpenDrawer: false,
    isTask: false,
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer: (state, { payload }) => {
            state.isOpenDrawer = true;
            state.isTask = payload;
        },
        closeDrawer: (state,{payload}) => {
            state.isOpenDrawer = false;
        },
        openModal: (state) => {
            state.isOpenModal = true;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
        },
    },
});

export const { openDrawer, closeDrawer, openModal, closeModal } = drawerSlice.actions

export default drawerSlice.reducer