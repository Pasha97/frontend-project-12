import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    currentChannelId: '',
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        initChannels(state, { payload }) {
            state.channels.push(...payload);
            state.currentChannelId = payload[0].id;
        },

        changeChannel(state, { payload }) {
            state.currentChannelId = payload;
        },

        resetChannels() {
            return initialState;
        }
    },
});

export const {
    initChannels,
    changeChannel,
    resetChannels
} = channelsSlice.actions;

export default channelsSlice.reducer;