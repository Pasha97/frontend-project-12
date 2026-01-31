import axios from 'axios'

export const signup = (params) => {
    return axios.post('/api/v1/signup', params)
}

export const login = (params) => {
    return axios.post('/api/v1/login', params)
}