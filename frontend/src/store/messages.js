import { createSlice } from '@reduxjs/toolkit';


const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        initMessages(state, { payload }) {
            state.messages.push(...payload);
        },
    },
});

export const {
    initMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;