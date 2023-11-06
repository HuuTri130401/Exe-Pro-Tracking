import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import projectSlice from "./slice/projectSlice";
import taskSlice from "./slice/taskSlice";
import optionSlice from "./slice/optionSlice";
import drawerSlice from "./slice/drawerSlice";
import commentSlice from "./slice/commentSlice";
import paymentSlice from "./slice/paymentSlice";

export const store = configureStore({
    reducer: {
        userSlice,
        projectSlice,
        taskSlice,
        optionSlice,
        drawerSlice,
        commentSlice,
        paymentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
