import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    type: '',
    params: {},
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open: (state, { payload }) => {
            state.isOpen = true;
            state.type = payload.type;
            state.params = payload?.params || {};
        },
        close: (state) => {
            state.isOpen = false;
        },
    },
});

export const {
    open,
    close,
} = modalSlice.actions;

export default modalSlice.reducer;