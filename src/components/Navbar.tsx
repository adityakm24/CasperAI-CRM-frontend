import React from "react";
import { FiBell } from "react-icons/fi";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#393937] p-1 text-white flex items-center justify-between">
      <div className="ml-4 flex items-center">
        <div className="rounded-full p-2">
          <img
            src="src/assets/logo1.svg"
            alt="Casper AI Logo"
            className="w-16 h-16"
          />
        </div>
      </div>
      <div>
        <FiBell className="text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
