import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';
import authReducer from './auth';

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        auth: authReducer,
    },
});