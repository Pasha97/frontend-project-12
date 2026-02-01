import { axiosInstance } from "./axiosInstance.js";

export const signup = (params) => {
    return axiosInstance.post('/api/v1/signup', params)
}

export const login = (params) => {
    return axiosInstance.post('/api/v1/login', params)
}