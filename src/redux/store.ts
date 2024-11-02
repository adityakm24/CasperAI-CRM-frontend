// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import snackbarReducer from './snackbarSlice';
import addLeadReducer from '../features/dashboard/redux/addLeadSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer, 
        leads: addLeadReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
