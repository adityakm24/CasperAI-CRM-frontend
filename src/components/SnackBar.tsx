import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { closeSnackbar } from '../redux/snackbarSlice'; 
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';

const Snackbar: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, message, type } = useSelector((state: RootState) => state.snackbar);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                dispatch(closeSnackbar());
            }, 3000);  
            return () => clearTimeout(timer); 
        }
    }, [isOpen, dispatch]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="text-green-500 mr-2 w-5 h-5" />;
            case 'error':
                return <FaExclamationCircle className="text-red-500 mr-2 w-5 h-5" />;
            case 'warning':
                return <FaExclamationTriangle className="text-yellow-500 mr-2 w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`fixed top-[15px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-in-out 
            ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'} w-full max-w-md bg-white shadow-lg rounded-md z-50`}
        >
            <div
                className={`flex items-center p-4 rounded-md ${type === 'error' ? 'bg-red-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-green-100'}`}
            >
                {getIcon()}
                <span className="text-black">{message}</span>
            </div>
        </div>
    );
};

export default Snackbar;
