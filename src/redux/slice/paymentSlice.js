import { createSlice } from '@reduxjs/toolkit';
import { getPaymentTypesThunk } from '../thunk/paymentThunk';

const initialState = {
    paymentTypes: [],
    loading: false,
    error: null
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPaymentTypesThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(getPaymentTypesThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            const content = payload.paymentByAccountType;
            var loadedPaymentTypes = {};
            content.forEach(paymentType => {
                loadedPaymentTypes[paymentType.title] = {
                    id: paymentType.id,
                    name: paymentType.title,
                    qrCode: paymentType.qrCode,
                    accountType: paymentType.accessKey,
                };
            });
            state.paymentTypes = loadedPaymentTypes;
        });
        builder.addCase(getPaymentTypesThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export default paymentSlice.reducer;
