import axios from 'axios';
import { getToken } from '../storage/auth';

export const api = axios.create({});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});
