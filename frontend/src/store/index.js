import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    },
});