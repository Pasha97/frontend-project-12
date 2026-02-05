import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessages(state, { payload }) {
      state.messages.push(...payload)
    },

    addMessage(state, { payload }) {
      state.messages.push(payload)
    },

    resetMessages() {
      return initialState
    },
  },
})

export const {
  initMessages,
  addMessage,
  resetMessages,
} = messagesSlice.actions

export default messagesSlice.reducer
