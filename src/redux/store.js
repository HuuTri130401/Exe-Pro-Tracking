import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import projectSlice from "./slice/projectSlice";
import taskSlice from "./slice/taskSlice";
import optionSlice from "./slice/optionSlice";
import drawerSlice from "./slice/drawerSlice";
import commentSlice from "./slice/commentSlice";
import paymentSlice from "./slice/paymentSlice";
import transactionSlice from "./slice/transactionSlice";
import aiChatBotSlice from "./slice/aiChatBotSlice";
import labelSlice from "./slice/labelSlice";

export const store = configureStore({
    reducer: {
        userSlice,
        projectSlice,
        taskSlice,
        optionSlice,
        drawerSlice,
        commentSlice,
        paymentSlice,
        transactionSlice,
        aiChatBotSlice,
        labelSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
