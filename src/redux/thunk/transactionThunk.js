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

export const getAllTransactionThunk = createAsyncThunk(
    'getAllTransaction',
    async (_, { rejectWithValue }) => {
        try {
            const response = await transactionApi.getAllTransaction();
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)

export const updateTransactionThunk = createAsyncThunk(
    'updateTransaction',
    async ({ id, isBanking }, { rejectWithValue }) => {
        try {
            const response = await transactionApi.updateTransaction(id, isBanking);
            return response;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
)
