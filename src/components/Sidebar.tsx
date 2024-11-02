import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CircleAvatar from "./CircleAvatar";

const SideNavbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeSection = (section: string) => location.pathname.includes(section);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-[#212121] flex flex-col transition-all duration-500 ease-in-out ${isExpanded ? "w-60" : "w-20"
        }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col flex-1 items-center space-y-1 mt-2 font-adlam">
        {/* Dashboard Link */}
        <Link to="/dashboard">
          <div
            className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${activeSection("dashboard") && isExpanded ? "bg-[#9B9999] mt-5" : ""
              } transition-all duration-500 ease-in-out`}
            style={{
              maxWidth: activeSection("dashboard") && isExpanded ? "200px" : "auto",
              height: activeSection("dashboard") && isExpanded ? "45px" : "auto",
              borderRadius: activeSection("dashboard") && isExpanded ? "20px" : "0",
            }}
          >
            <div
              className={`flex items-center justify-center rounded-md ${activeSection("dashboard") ? "bg-[#9B9999]" : "hover:bg-[#393937]"
                } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
            >
              <img src="src/assets/home-2.svg" alt="Home" className="w-6 h-6" />
            </div>
            {isExpanded && (
              <span
                className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${activeSection("dashboard") ? "text-black font-semibold" : "text-white"
                  }`}
              >
                Dashboard
              </span>
            )}
            {isExpanded && (
              <img
                src="src/assets/angle down.svg"
                alt="Dropdown"
                onClick={(e) => {
                  e.preventDefault(); // Prevents the default link behavior
                  toggleDropdown(); // Toggles dropdown
                }}
                className="w-4 h-4 ml-2 transform translate-y-1 cursor-pointer"
              />
            )}
          </div>
        </Link>

        {/* Dropdown Menu for Leads */}
        {isOpen && (
          <div className="flex flex-col items-center space-y-2 transition-all duration-500">
            <Link to="/leads">
              <div
                className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${activeSection("leads") && isExpanded ? "bg-[#9B9999]" : ""
                  } transition-all duration-500 ease-in-out`}
                style={{
                  maxWidth: activeSection("leads") && isExpanded ? "200px" : "auto",
                  height: activeSection("leads") && isExpanded ? "45px" : "auto",
                  borderRadius: activeSection("leads") && isExpanded ? "20px" : "0",
                }}
              >
                <div
                  className={`flex items-center justify-center rounded-md ${activeSection("leads") ? "bg-[#9B9999]" : "hover:bg-[#393937]"
                    } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
                >
                  <img src="src/assets/leads.svg" alt="Leads" className="w-6 h-6" />
                </div>
                {isExpanded && (
                  <span
                    className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${activeSection("leads") ? "text-black font-semibold" : "text-white"
                      }`}
                  >
                    Leads
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}

        {/* Assistants Link */}
        <Link to="/assistants">
          <div
            className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${activeSection("assistants") && isExpanded ? "bg-[#9B9999]" : ""
              } transition-all duration-500 ease-in-out`}
            style={{
              maxWidth: activeSection("assistants") && isExpanded ? "200px" : "auto",
              height: activeSection("assistants") && isExpanded ? "45px" : "auto",
              borderRadius: activeSection("assistants") && isExpanded ? "20px" : "0",
            }}
          >
            <div
              className={`flex items-center justify-center rounded-md ${activeSection("assistants") ? "bg-[#9B9999]" : "hover:bg-[#393937]"
                } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
            >
              <img src="src/assets/people.svg" alt="Assistants" className="w-6 h-6" />
            </div>
            {isExpanded && (
              <span
                className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${activeSection("assistants") ? "text-black font-semibold" : "text-white"
                  }`}
              >
                Assistants
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      <div
        className={`p-3 rounded-md flex items-center mb-4 ml-2 font-adlam ${isExpanded ? "justify-start ml-4 mb-4" : "justify-center"
          }`}
        style={{
          backgroundColor: isExpanded ? "#2C2C2C" : "transparent",
          height: isExpanded ? "50px" : "auto",
          maxWidth: isExpanded ? "210px" : "auto",
          borderRadius: isExpanded ? "20px" : "0",
        }}
      >
        <CircleAvatar letter="S" />
        <span
          className={`text-white ml-4 transition-all duration-500 ease-in-out font-adlam ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          style={{
            maxWidth: isExpanded ? "140px" : "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          sowrabhmitoshi@gmail.com
        </span>
      </div>
    </div>
  );
};

export default SideNavbar;
