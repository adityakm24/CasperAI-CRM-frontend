import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUserApi, loginUserApi, verifyOtpApi } from '../services/authService';
import { AuthResponse, User } from '../types';
import { handleApiError } from '../../../utils/errorHandler';

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    otpVerified: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: localStorage.getItem('accessToken'),  
    loading: false,
    error: null,
    otpVerified: false, 
};

export const signupUser = createAsyncThunk<
    AuthResponse, 
    { firstName: string; lastName: string; email: string; password: string; phoneNumber1: string; countryCode: string }, 
    { rejectValue: string }
>(
    'auth/register',
    async (signupData, { rejectWithValue }) => {
        try {
            const response = await signupUserApi(signupData);
            return response;
        } catch (error: unknown) {
            const { message } = handleApiError(error);
            return rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: string }>(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await loginUserApi(loginData);
            return response;
        } catch (error: unknown) {
            const { message } = handleApiError(error); 
            return rejectWithValue(message);
        }
    }
);

export const verifyOTP = createAsyncThunk<{ message: string, user: User }, { email: string, otp: string }, { rejectValue: string }>(
    'auth/verifyOTP',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await verifyOtpApi(email, otp);
            return response; 
        } catch (error: unknown) {
            const { message } = handleApiError(error);
            return rejectWithValue(message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload); 
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.otpVerified = false;
            localStorage.removeItem('accessToken'); 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
             console.log(
               "Access token set in localStorage:",
               action.payload.accessToken
             );
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'An unknown error occurred during signup';
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'An error occurred during login';
        });

        builder.addCase(verifyOTP.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyOTP.fulfilled, (state, action) => {
            state.loading = false;
            state.otpVerified = true;
            state.user = { ...state.user, ...action.payload.user }; 
        });
        builder.addCase(verifyOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'OTP verification failed';
        });
    },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;