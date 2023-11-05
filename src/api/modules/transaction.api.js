import { privateClient } from "../clients/private.client";

const transactionApi = {
    postTransaction: (transaction) => {
        return privateClient.post('/Transactions/Post', transaction);
    }
}

export default transactionApi;
