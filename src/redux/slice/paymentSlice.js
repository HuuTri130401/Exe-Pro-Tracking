import { createSlice } from '@reduxjs/toolkit';
import { getPaymentTypesThunk } from '../thunk/paymentThunk';
import { openNotification } from '../../components/notification/notification';

const initialState = {
    paymentTypes: [],
    canOpenModal: {
        "Standard": false,
        "Premium": false
    },
    loading: false,
    error: null
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            state.canOpenModal[payload] = true;
        },
        closeModal: (state, { payload }) => {
            state.canOpenModal = {
                "Standard": false,
                "Premium": false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentTypesThunk.pending, (state, { payload }) => {
            state.loading = true;
            state.canOpenModal = {
                "Standard": false,
                "Premium": false
            };
        });
        builder.addCase(getPaymentTypesThunk.fulfilled, (state, { payload }) => {
            const content = payload.paymentByAccountType;
            var accountType = "";
            var loadedPaymentTypes = {};
            content.forEach(paymentType => {
                loadedPaymentTypes[paymentType.title] = {
                    id: paymentType.id,
                    name: paymentType.title,
                    qrCode: paymentType.qrCode,
                    accountType: paymentType.accessKey,
                };
                accountType = paymentType.accessKey;
            });
            state.paymentTypes = loadedPaymentTypes;
            state.canOpenModal[accountType] = true;
            state.loading = false;
        });
        builder.addCase(getPaymentTypesThunk.rejected, (state, { payload }) => {
            openNotification('error', 'Lấy danh sách phương thức thanh toán thất bại', payload)
            state.error = payload;
            state.canOpenModal = {
                "Standard": false,
                "Premium": false
            };
            state.loading = false;
        });
    }
});

export const { openModal, closeModal } = paymentSlice.actions;

export default paymentSlice.reducer;
