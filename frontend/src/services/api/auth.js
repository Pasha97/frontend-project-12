import { api } from "./axiosInstance.js";

export const signup = (params) => {
    return api.post('/api/v1/signup', params)
}

export const login = (params) => {
    return api.post('/api/v1/login', params)
}