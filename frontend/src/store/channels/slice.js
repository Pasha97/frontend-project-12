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

        addChannel(state, { payload }) {
            state.channels.push(payload);
        },

        removeChannel(state, { payload }) {
            if (state.currentChannelId === payload) {
                state.currentChannelId = state.channels[0].id
            }

            const indexToRemove = state.channels.findIndex((channel) => channel.id === payload);

            if (indexToRemove !== -1) {
                state.channels.splice(indexToRemove, 1);
            }
        },

        renameChannel(state, { payload }) {
            const indexToChange = state.channels.findIndex((channel) => channel.id === payload.id);

            if (indexToChange !== -1) {
                state.channels.splice(indexToChange, 1, payload);
            }
        },

        resetChannels() {
            return initialState;
        }
    },
});

export const {
    initChannels,
    changeChannel,
    resetChannels,
    addChannel,
    removeChannel,
    renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;