import { axiosInstance } from './axiosInstance'

export const getChannels = () => {
  return axiosInstance.get('/api/v1/channels')
}

export const addChannels = (params) => {
  return axiosInstance.post('/api/v1/channels', params)
}

export const editChannels = (id, params) => {
  return axiosInstance.patch(`/api/v1/channels/${id}`, params)
}

export const deleteChannels = (id) => {
  return axiosInstance.delete(`/api/v1/channels/${id}`)
}
