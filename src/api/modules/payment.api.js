import { privateClient } from "../clients/private.client";

const paymentApi = {
    getPaymentTypes: (accountType) => {
        return privateClient.get(`/Payments/GetPaymentByAccountType?accountType=${accountType}`);
    }
}

export default paymentApi;
