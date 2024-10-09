import React from "react";
import { FiHome, FiUsers, FiX, FiLogOut } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleSidebar }) => {
  return (
    <div
      className={`bg-[#222222] h-full p-4 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      <div className="flex flex-col">
        {/* Close button aligned to the top-right */}
        <div className="flex justify-center mb-8">
          <button
            onClick={onToggleSidebar}
            className="flex items-center justify-center"
          >
            {isCollapsed ? (
              <div className="grid grid-cols-3 gap-2 w-8 h-8">
                {/* Adjusted grid size for 9 dots */}
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="w-1 h-1 bg-white transform rotate-45"
                  ></div>
                ))}
              </div>
            ) : (
              <FiX className="text-xl text-white" />
            )}
          </button>
        </div>

        {/* Sidebar menu items */}
        <ul className="flex flex-col items-center space-y-4 text-white">
          {/* Highlight active dashboard */}
          <li
            className={`flex items-center justify-center w-full p-2 rounded-md cursor-pointer ${
              !isCollapsed && "bg-gray-700"
            }`}
          >
            <FiHome className="text-xl" /> {/* Moderately bigger home icon */}
            {!isCollapsed && (
              <span className="ml-2 text-sm font-semibold">Dashboard</span>
            )}
          </li>
          <li className="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-700 cursor-pointer">
            <FiUsers className="text-xl" /> {/* Moderately bigger users icon */}
            {!isCollapsed && <span className="ml-2 text-sm">Leads</span>}
          </li>
        </ul>
      </div>

      {/* Bottom section: Logout button and Profile */}
      <div className="flex flex-col items-center w-full">
        {/* Logout Button (Hidden when collapsed) */}
        {!isCollapsed && (
          <button className="w-full mb-4 flex items-center justify-center p-2 text-white rounded-lg bg-red-600 hover:bg-red-700">
            <FiLogOut className="text-sm" /> {/* Smaller logout icon */}
            <span className="ml-2 text-sm">Logout</span>
          </button>
        )}

        {/* Profile circle with email */}
        <div
          className={`flex items-center justify-center p-2 ${
            !isCollapsed && "hover:bg-gray-700"
          } rounded-lg w-full`}
        >
          <div className="flex items-center w-full">
            {/* Profile icon with consistent background color */}
            <div className="bg-[#D9D9D9] rounded-full flex items-center justify-center w-6 h-6 text-black">
              S
            </div>
            {!isCollapsed && (
              <span className="ml-2 text-xs text-white">
                sowrabhmitoshi@gmail.com
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
