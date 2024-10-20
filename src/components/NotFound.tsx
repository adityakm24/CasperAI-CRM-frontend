import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2671B7] text-black font-adlam animate-fadeIn">
            <img
                src="src/assets/logo1.svg"
                alt="CasperAI Logo"
                className="h-60  hover:scale-110 transition-transform duration-500 animate-logoBounce"
            />

            <h1 className="text-6xl font-bold mt-6 animate-fadeInSlow">404</h1>
            <p className="text-xl mt-2 mb-6 font-medium text-center animate-fadeInMedium">
                Uh oh! Looks like you got lost. <br /> 
                Go back to the Login page or Home page.
            </p>
            
            <div className="flex flex-row space-x-4 animate-fadeInFast">
                <Link
                    to="/login"
                    className="bg-black text-[#2671B7] px-6 py-3 rounded-lg hover:bg-[#EAF2F8] transition-colors duration-300 hover:scale-110"
                >
                    Go to Login
                </Link>

                <Link
                    to="/dashboard"
                    className="bg-black text-[#2671B7] px-6 py-3 rounded-lg hover:bg-[#EAF2F8] transition-colors duration-300 hover:scale-110"
                >
                    Go to Home
                </Link>
            </div>

            <footer className="absolute bottom-4 text-3xl text-white font-semibold animate-fadeInSlow">
                CasperAI
            </footer>
        </div>
    );
};

export default NotFoundPage;
