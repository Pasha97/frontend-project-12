import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';
import authReducer from './auth';
import modalReducer from './modal';

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        auth: authReducer,
        modal: modalReducer,
    },
});