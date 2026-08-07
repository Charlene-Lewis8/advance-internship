import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModalState {
    isOpen: boolean;
    view: 'login' | 'signup';
}

const initialState: AuthModalState = {
    isOpen: false,
    view: 'login',
};

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<'login' | 'signup'>) => {
            state.isOpen = true;
            state.view = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        switchView: (state, action: PayloadAction<'login' | 'signup'>) => {
            state.view = action.payload;
        },
    }
});

export const { openModal, closeModal, switchView} = authModalSlice.actions;
export default authModalSlice.reducer;