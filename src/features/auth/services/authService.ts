import axios from 'axios';
import { handleApiError } from '../../../utils/errorHandler';
import { User, AuthResponse } from '../types';

const VITE_API_URL = import.meta.env.VITE_API_URL;


interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber1: string;
    countryCode: string;
}


export const signupUserApi = async (signupData: SignupData): Promise<AuthResponse> => {
    try {
        console.log('Sending signup data:', signupData);
        const response = await axios.post<AuthResponse>(`${VITE_API_URL}/auth/register`, signupData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: unknown) {
        console.error('Error during signup:', error);
        throw handleApiError(error);
    }
};

export const loginUserApi = async (loginData: { email: string; password: string }): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${VITE_API_URL}/auth/login`, loginData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: unknown) {
        throw handleApiError(error);
    }
};


export const verifyOtpApi = async (email: string, otp: string): Promise<{ message: string; user: User }> => {
    try {
        const response = await axios.post<{ message: string; user: User }>(
            `${VITE_API_URL}/auth/verify-email`,
            { email, otp },
            { withCredentials: true }
        );
        return response.data; 
    } catch (error: unknown) {
        throw handleApiError(error);
    }
};
