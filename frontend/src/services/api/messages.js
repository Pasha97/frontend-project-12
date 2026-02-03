import { axiosInstance } from './axiosInstance'

export const getMessages = () => {
  return axiosInstance.get('/api/v1/messages')
}

export const addMessages = (params) => {
  return axiosInstance.post('/api/v1/messages', params)
}

export const editMessages = (id, params) => {
  return axiosInstance.patch(`/api/v1/messages/${id}`, params)
}

export const deleteMessages = (id) => {
  return axiosInstance.delete(`/api/v1/messages/${id}`)
}
