import { createSlice } from '@reduxjs/toolkit';
import { getPaymentTypesThunk } from '../thunk/paymentThunk';
import { openNotification } from '../../components/notification/notification';

const initialState = {
    paymentTypes: [],
    openModal: false,
    loading: false,
    error: null
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        openModal: (state) => {
            state.openModal = true;
        },
        closeModal: (state) => {
            state.openModal = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentTypesThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(getPaymentTypesThunk.fulfilled, (state, { payload }) => {
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
            state.canOpenModel = true;
            state.loading = false;
        });
        builder.addCase(getPaymentTypesThunk.rejected, (state, { payload }) => {
            openNotification('error', 'Lấy danh sách phương thức thanh toán thất bại', payload)
            state.error = payload;
            state.loading = false;
        });
    }
});

export const { openModal, closeModal } = paymentSlice.actions;

export default paymentSlice.reducer;
