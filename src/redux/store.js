import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import projectSlice from "./slice/projectSlice";
import taskSlice from "./slice/taskSlice";
import optionSlice from "./slice/optionSlice";
import drawerSlice from "./slice/drawerSlice";
import commentSlice from "./slice/commentSlice";

export const store = configureStore({
    reducer: {
        userSlice,
        projectSlice,
        taskSlice,
        optionSlice,
        drawerSlice,
        commentSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;