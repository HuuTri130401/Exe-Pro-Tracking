import { createAsyncThunk } from "@reduxjs/toolkit";
import paymentApi from "../../api/modules/payment.api";

export const getPaymentTypesThunk = createAsyncThunk(
    'getPaymentTypes',
    async (accountType, { rejectWithValue }) => {
        try {
            const response = await paymentApi.getPaymentTypes(accountType);
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
