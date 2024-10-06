import axios from 'axios';
import store from '../redux/store';
import { logout } from '../features/auth/redux/authSlice';
import { setAccessToken } from '../features/auth/redux/authSlice';  

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,  
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken || localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {}, { withCredentials: true });
                store.dispatch(setAccessToken(data.accessToken));
                localStorage.setItem('accessToken', data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest); 
            } catch (refreshError) {
                store.dispatch(logout());
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
