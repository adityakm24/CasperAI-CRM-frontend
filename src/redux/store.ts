// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import snackbarReducer from './snackbarSlice';
import leadReducer from '../features/dashboard/redux/leadSlice'; // Import the dashboard leads reducer

const store = configureStore({
    reducer: {
        auth: authReducer,           // Existing auth reducer
        snackbar: snackbarReducer,   // Existing snackbar reducer
        dashboardLeads: leadReducer, // Add dashboard leads reducer here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
