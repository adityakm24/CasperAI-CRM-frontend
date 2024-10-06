// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import snackbarReducer from './snackbarSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
