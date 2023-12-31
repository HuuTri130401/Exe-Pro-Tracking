import axios from 'axios';
import qs from 'query-string';
import { BASE_URL, CHAT_SERVICE_URL, TOKEN_CYBERSOFT, userLocalStorage } from '../../utils/config';

export const privateClient = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: {
        serialize: (params) => qs.stringify(params)
    }
});

privateClient.interceptors.request.use(config => {
    return {
        ...config,
        headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            // "Access-Control-Allow-Origin": "http://www.protracking.somee.com/api"
        }
    }
},
    error => {
        return Promise.reject(error);
    }
);

privateClient.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export const privateClientChatService = axios.create({
    baseURL: CHAT_SERVICE_URL,
    paramsSerializer: {
        serialize: (params) => qs.stringify(params)
    }
});

privateClientChatService.interceptors.request.use(config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Access-Control-Allow-Origin": "*"
        }
    }
},
    error => {
        return Promise.reject(error);
    }
);

privateClientChatService.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});
