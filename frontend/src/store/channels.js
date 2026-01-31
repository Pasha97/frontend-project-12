import { createSlice } from '@reduxjs/toolkit';


const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
        currentChannelId: '',
    },
    reducers: {
        initChannels(state, { payload }) {
            state.channels.push(...payload);
            state.currentChannelId = payload[0].id;
        },

        changeChannel(state, { payload }) {
            state.currentChannelId = payload;
        }
    },
});

export const {
    initChannels,
    changeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;