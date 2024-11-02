import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { setAccessToken, logout } from '../redux/authSlice';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (isAuthenticated) {
                setLoading(false);
                return;
            }

            const storedAccessToken = localStorage.getItem('accessToken');
            if (storedAccessToken) {
                dispatch(setAccessToken(storedAccessToken));
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify-token`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    dispatch(setAccessToken(''));
                } else {
                    dispatch(logout());
                }
            } catch {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
