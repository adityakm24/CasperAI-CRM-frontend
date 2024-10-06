import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch } from '../../../redux/store';
import { openSnackbar } from '../../../redux/snackbarSlice';
import { verifyOTP } from '../redux/authSlice';
import CommonLayout from './CommonLayout';

const otpValidationSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits') 
        .required('OTP is required'),
});

const OTPForm: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [resendTimer, setResendTimer] = useState<number>(90); 
    const [canResend, setCanResend] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const inputsRef = React.useRef<HTMLInputElement[]>([]);

    const calculateRemainingTime = () => {
        const storedEndTime = localStorage.getItem('otpResendEndTime');
        if (storedEndTime) {
            const endTime = parseInt(storedEndTime, 10);
            const currentTime = new Date().getTime();
            const timeDifference = Math.floor((endTime - currentTime) / 1000);
            return timeDifference > 0 ? timeDifference : 0;
        }
        return 90; 
    };

    useEffect(() => {
        const initialTimer = calculateRemainingTime();
        setResendTimer(initialTimer);
        if (initialTimer > 0) {
            setCanResend(false);
        } else {
            setCanResend(true);
        }
    }, []);


    useEffect(() => {
        if (resendTimer > 0) {
            const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setCanResend(true); 
        }
    }, [resendTimer]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const otpValue = otp.join('');
        try {
            await otpValidationSchema.validate({ otp: otpValue });

            if (!email) {
                dispatch(openSnackbar({ message: 'Email not found in session', type: 'error' }));
                return;
            }

            await dispatch(verifyOTP({ email, otp: otpValue })).unwrap();
            dispatch(openSnackbar({ message: 'OTP verified successfully!', type: 'success' }));
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error instanceof Yup.ValidationError ? error.message : String(error);
            dispatch(openSnackbar({ message: errorMessage, type: 'error' }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && inputsRef.current[index + 1]) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text');
        if (/^\d{6}$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            newOtp.forEach((digit, index) => {
                if (inputsRef.current[index]) {
                    inputsRef.current[index].value = digit;
                }
            });
        }
    };

    const handleResendOtp = async () => {
        try {
            dispatch(openSnackbar({ message: 'OTP resent successfully!', type: 'success' }));
            const newEndTime = new Date().getTime() + 90 * 1000; 
            localStorage.setItem('otpResendEndTime', newEndTime.toString());
            setResendTimer(90); 
            setCanResend(false); 
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            dispatch(openSnackbar({ message: errorMessage, type: 'error' }));
        }
    };

    return (
        <CommonLayout title="Verify OTP">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between mb-10 items-center">
                    {otp.map((digit, index) => (
                        <React.Fragment key={index}>
                            <input
                                ref={(el) => (inputsRef.current[index] = el!)}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white font-adlam font-bold cursor-white"
                                maxLength={1}
                            />
                            {index < otp.length - 1 && (
                                <span className="mx-2 text-white font-bold">-</span>  
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="space-y-4 mt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-md font-adlam font-medium"
                    >
                        Verify OTP
                    </button>
                </div>

                <div className="mt-4 text-center">
                    {canResend ? (
                        <p
                            className="text-blue-500 font-semibold cursor-pointer"
                            onClick={handleResendOtp}
                        >
                            Didn't receive the OTP? <strong>Resend OTP</strong>
                        </p>
                    ) : (
                        <p className="text-gray-400 font-adlam">
                            Resend OTP available in {Math.floor(resendTimer / 60)}:
                            {resendTimer % 60 < 10 ? `0${resendTimer % 60}` : resendTimer % 60} seconds
                        </p>
                    )}
                </div>
            </form>
        </CommonLayout>
    );
};

export default OTPForm;
