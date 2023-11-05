import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionApi from "../../api/modules/transaction.api";

export const postTransactionThunk = createAsyncThunk(
    'postTransaction',
    async (transaction, { rejectWithValue }) => {
        try {
            const response = await transactionApi.postTransaction(transaction);
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
