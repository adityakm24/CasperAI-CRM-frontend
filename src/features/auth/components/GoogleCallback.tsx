import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { openSnackbar } from '../../../redux/snackbarSlice';
import axios from 'axios';
import { setAccessToken } from '../redux/authSlice'; 

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google/callback`, { withCredentials: true });

                const { success, data } = response.data;

                if (success && data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    dispatch(setAccessToken(data.accessToken));
                    dispatch(openSnackbar({ message: 'Logged in successfully!', type: 'success' }));
                    navigate('/dashboard');
                } else {
                    dispatch(openSnackbar({ message: 'Google login failed.', type: 'error' }));
                    navigate('/login');
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                dispatch(openSnackbar({ message: 'Error during Google login.', type: 'error' }));
                navigate('/login');
            }
        };

        handleGoogleAuth();
    }, [dispatch, navigate]);

    return <div>Processing Google login, please wait...</div>;
};

export default GoogleCallback;
