import axios from 'axios';
import qs from 'query-string';
import { BASE_URL, TOKEN_CYBERSOFT } from '../../utils/config';

export const publicClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
    },
    paramsSerializer: {
        serialize: (params) => qs.stringify(params)
    }
});

publicClient.interceptors.request.use(config => {
    return {
        ...config,
        headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
            "Content-Type": "application/json",
        }
    }
}, error => {
    return Promise.reject(error);
}
);

publicClient.interceptors.response.use(({ data }) => {
    return data
}, ({ response }) => {
    return Promise.reject(response.data);
})