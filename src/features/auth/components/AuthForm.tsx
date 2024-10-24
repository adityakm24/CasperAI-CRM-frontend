import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../redux/snackbarSlice';
import { AppDispatch } from '../../../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import { loginUser, signupUser } from '../redux/authSlice';
import CommonLayout from './CommonLayout'; // Import CommonLayout


const signupValidationSchema = {
    firstName: Yup.string()
        .min(2, 'First Name must be at least 2 characters')
        .required('First Name is required'),
    lastName: Yup.string()
        .min(2, 'Last Name must be at least 2 characters')
        .required('Last Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    phoneNumber1: Yup.string()
        .required('Phone Number is required'),
    countryCode: Yup.string()
        .required('Country Code is required'),  
} as const;  

const loginValidationSchema = {
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
} as const;

const AuthForm: React.FC<{ isLogin?: boolean }> = ({ isLogin = true }) => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber1: '',
        countryCode: '', 
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handlePhoneChange = (value: string, country: { dialCode: string, countryCode: string }) => {
        setFormValues({ 
            ...formValues, 
            phoneNumber1: value,  
            countryCode: country.countryCode 
        });
    };

    const validationSchema = isLogin ? loginValidationSchema : signupValidationSchema;

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        try {
            const schemaField = validationSchema[name as keyof typeof validationSchema];
            await schemaField.validate(value);
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                dispatch(openSnackbar({ message: error.message, type: 'error' }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const formattedValues = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password,
                ...(isLogin ? {} : {
                    phoneNumber1: `+${formValues.phoneNumber1}`,  
                    countryCode: formValues.countryCode.toUpperCase() 
                })
            };
    
    
            await Yup.object(validationSchema).validate(formValues, { abortEarly: false });
            if (isLogin) {
                await dispatch(loginUser({ email: formValues.email, password: formValues.password })).unwrap();
                dispatch(openSnackbar({ message: 'Logged in successfully!', type: 'success' }));
                navigate('/dashboard');
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await dispatch(signupUser(formattedValues as any)).unwrap(); 
                dispatch(openSnackbar({ message: 'Signed up successfully! Please verify your OTP.', type: 'success' }));
                
                navigate(`/verify-otp?email=${formValues.email}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            dispatch(openSnackbar({ message: errorMessage, type: 'error' }));  
        }
    };
    
    const handleGoogleSignup = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <CommonLayout title={isLogin ? 'Login' : 'Register'}>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-400 mb-1" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full p-2 bg-gray-600 text-white rounded-md"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-400 mb-1" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full p-2 bg-gray-600 text-white rounded-md"
                            />
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-400 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 bg-gray-600 text-white rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 bg-gray-600 text-white rounded-md"
                    />
                </div>

                {!isLogin && (
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1" htmlFor="phoneNumber1">
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'sa'}  
                            value={formValues.phoneNumber1}
                            onChange={handlePhoneChange}
                            inputStyle={{
                                width: '100%',
                                backgroundColor: '#4B5563',  
                                color: 'white',
                                borderRadius: '0.375rem',  
                                height: '2.5rem',
                                paddingLeft: '55px',  
                                paddingRight: '10px',
                            }}
                            buttonStyle={{
                                backgroundColor: '#4B5563',
                                borderRadius: '0.375rem',
                            }}
                            dropdownStyle={{
                                backgroundColor: '#4B5563',
                                color: 'white',
                            }}
                        />
                    </div>
                )}

                <div className="space-y-4 mt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-md"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full bg-[#D9D9D9] text-black py-2 px-2 hover:bg-gray-300 flex items-center justify-center rounded-md"
                    >
                        <FcGoogle className="w-5 h-5 mr-2" />
                        {isLogin ? 'Login with Google' : 'Sign up with Google'}
                    </button>
                </div>

                <div className="flex justify-center mt-4">
                    {isLogin ? (
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-400 hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    ) : (
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:underline">
                                Log in here
                            </Link>
                        </p>
                    )}
                </div>
            </form>
        </CommonLayout>
    );
};

export default AuthForm;
