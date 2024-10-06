import React from 'react';

interface CommonLayoutProps {
    children: React.ReactNode;
    title: string;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children, title }) => {
    return (
        <div className="flex h-screen">
            <div className="w-11/12 bg-[#2c2c2c] flex flex-col justify-center items-center font-adlam">
                <div className="w-full max-w-md flex flex-col items-start mb-6 ">
                    <h2 className="text-white text-3xl mb-6">{title}</h2>
                    <div className="h-[1px] bg-[#485F68] w-full "></div> 
                </div>

                <div className="w-full max-w-md animate-fadeIn">{children}</div>
            </div>

            <div className="w-5/12 bg-[#2671b7] flex items-center justify-center relative">
                <img
                    src="src/assets/logo1.svg"
                    alt="Casper AI Logo"
                    className="h-60 hover:scale-110 transition-transform duration-500 animate-logoFadeIn"
                />
                <div className="absolute bottom-12">
                    <p className="text-white font-adlam text-[36px] font-semibold">CasperAI</p>
                </div>
            </div>
        </div>
    );
};

export default CommonLayout;
