import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
    isAuthenticated: false,
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload.user
      state.token = payload.token
      state.isAuthenticated = true
    },

    logoutUser(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, logoutUser } = authSlice.actions
export default authSlice.reducer
