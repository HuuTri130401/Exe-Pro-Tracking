import { createSlice } from '@reduxjs/toolkit';
import { getAllTransactionThunk } from '../thunk/transactionThunk';
import { openNotification } from '../../components/notification/notification';

const initialState = {
    transactions: [],
    loadingTransaction: false,
    error: null,
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        updateTransactionBakingStatus: (state, { payload }) => {
            console.log(payload)
            const index = state.transactions.findIndex(transaction => transaction.id === payload.id);
            state.transactions[index].isBanking = payload.isBanking;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTransactionThunk.pending, (state) => {
            state.loadingTransaction = true;
        });
        builder.addCase(getAllTransactionThunk.fulfilled, (state, { payload }) => {
            const loadedTransactions = payload.getAllTransaction.map(transaction => {
                return {
                    ...transaction,
                    customerEmail: transaction.customer.email,
                    paymentMethod: transaction.payment.title,
                    accountTypeName: transaction.accountType.title,
                }
            });
            state.transactions = loadedTransactions;
            state.loadingTransaction = false;
        });
        builder.addCase(getAllTransactionThunk.rejected, (state, { payload }) => {
            openNotification('error', 'Lấy danh sách giao dịch thất bại', payload)
            state.error = payload;
            state.loadingTransaction = false;
        });
    }
});

export default transactionSlice.reducer;

export const { updateTransactionBakingStatus } = transactionSlice.actions;
