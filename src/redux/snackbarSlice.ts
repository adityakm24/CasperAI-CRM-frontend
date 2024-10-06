import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
    isOpen: boolean;
    message: string;
    type: 'success' | 'error' | 'warning';
}

const initialState: SnackbarState = {
    isOpen: false,
    message: '',
    type: 'success',
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' }>) {
            state.isOpen = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        closeSnackbar(state) {
            state.isOpen = false;
            state.message = '';
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
