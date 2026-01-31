import { api } from "./axiosInstance";

export const getChannels = () => {
    return api.get('/api/v1/channels')
}

export const addChannels = (params) => {
    return api.post('/api/v1/channels', params)
}


export const editChannels = (id, params) => {
    return api.patch(`/api/v1/channels/${id}`, params)
}

export const deleteChannels = (id) => {
    return api.delete(`/api/v1/channels/${id}`)
}