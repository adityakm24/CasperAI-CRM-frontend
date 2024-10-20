import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#2671B7] h-16 p-1 text-white flex items-center justify-between">
      <div className="ml-1 flex items-center">
        <div className="rounded-full p-2 ">
          <img
            src="src/assets/logo1.svg"
            alt="Casper AI Logo"
            className="w-14 h-14"
          />
        </div>
      </div>
      
      <div className="flex items-center mr-10">
        <div>
          <img 
            src="src/assets/Vector.svg"
            alt="Notification Bell"
            className="w-5 h-5"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
