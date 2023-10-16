import axios from 'axios';
import qs from 'query-string';
import { BASE_URL, TOKEN_CYBERSOFT, userLocalStorage } from '../../utils/config';


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
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
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