import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const hasCheckedAuth = useRef(false); 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (hasCheckedAuth.current) return;

                if (accessToken) {
                    setIsAuthenticated(true);
                } else {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify-token`, { withCredentials: true });
                    if (response.data.success) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                }

                hasCheckedAuth.current = true; 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
