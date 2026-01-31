import { api } from "./axiosInstance";

export const getMessages = () => {
    return api.get('/api/v1/messages')
}

export const addMessages = (params) => {
    return api.post('/api/v1/messages', params)
}


export const editMessages = (id, params) => {
    return api.patch(`/api/v1/messages/${id}`, params)
}

export const deleteMessages = (id) => {
    return api.delete(`/api/v1/messages/${id}`)
}