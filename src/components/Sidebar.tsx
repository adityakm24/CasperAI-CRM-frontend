import React, { useState } from "react";
import CircleAvatar from "./CircleAvatar";

const SideNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    if (section === "Dashboard") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`bg-[#212121] flex flex-col transition-all duration-500 ease-in-out ${
        isExpanded ? "w-60" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col flex-1 items-center space-y-1 mt-2 font-adlam"> 
        <div
          className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${
            activeSection === "Dashboard" && isExpanded ? "bg-[#9B9999] mt-5" : ""
          } transition-all duration-500 ease-in-out`}
          onClick={() => handleSectionClick("Dashboard")}
          style={{
            maxWidth: activeSection === "Dashboard" && isExpanded ? "200px" : "auto",
            height: activeSection === "Dashboard" && isExpanded ? "45px" : "auto",
          }}
        >
          <div
            className={`flex items-center justify-center rounded-md ${
              activeSection === "Dashboard" ? "bg-[#9B9999]" : "hover:bg-[#393937]"
            } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
          >
            <img
              src="src/assets/home-2.svg"
              alt="Home"
              className="w-6 h-6"
            />
          </div>
          {isExpanded && (
            <span
              className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${
                activeSection === "Dashboard" ? "text-black font-semibold" : "text-white"
              }`}
            >
              Dashboard
            </span>
          )}
          {isExpanded && (
            <img
              src="src/assets/angle down.svg"
              alt="Dropdown"
              className="w-4 h-4 ml-2 transform translate-y-1"
            />
          )}
        </div>

        {isOpen && (
          <div className="flex flex-col items-center space-y-2 transition-all duration-500 animation-fadeIn">
            <div
              className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${
                activeSection === "Leads" && isExpanded ? "bg-[#9B9999]" : ""
              } transition-all duration-500 ease-in-out`}
              onClick={() => handleSectionClick("Leads")}
              style={{
                maxWidth: activeSection === "Leads" && isExpanded ? "200px" : "auto",
                height: activeSection === "Leads" && isExpanded ? "45px" : "auto",
              }}
            >
              <div
                className={`flex items-center justify-center rounded-md ${
                  activeSection === "Leads" ? "bg-[#9B9999]" : "hover:bg-[#393937]"
                } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
              >
                <img
                  src="src/assets/leads.svg"
                  alt="Leads"
                  className="w-6 h-6"
                />
              </div>
              {isExpanded && (
                <span
                  className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${
                    activeSection === "Leads" ? "text-black font-semibold" : "text-white"
                  }`}
                >
                  Leads
                </span>
              )}
            </div>
          </div>
        )}

        <div
          className={`group w-full flex items-center justify-center p-3 cursor-pointer rounded-md ${
            activeSection === "Assistants" && isExpanded ? "bg-[#9B9999]" : ""
          } transition-all duration-500 ease-in-out`}
          onClick={() => handleSectionClick("Assistants")}
          style={{
            maxWidth: activeSection === "Assistants" && isExpanded ? "200px" : "auto",
            height: activeSection === "Assistants" && isExpanded ? "45px" : "auto",
          }}
        >
          <div
            className={`flex items-center justify-center rounded-md ${
              activeSection === "Assistants" ? "bg-[#9B9999]" : "hover:bg-[#393937]"
            } ${isExpanded ? "w-6 h-6" : "w-10 h-10"} transition-all duration-500`}
          >
            <img
              src="src/assets/people.svg"
              alt="Assistants"
              className="w-6 h-6"
            />
          </div>
          {isExpanded && (
            <span
              className={`ml-2 px-2 py-1 rounded-md transition-opacity duration-500 ease-in-out ${
                activeSection === "Assistants" ? "text-black font-semibold" : "text-white"
              }`}
            >
              Assistants
            </span>
          )}
        </div>
      </div>

      <div
        className={`w-full p-3 bg-[#393937] rounded-md flex items-center ${
          isExpanded ? "justify-start" : "justify-center"
        }`}
      >
        <CircleAvatar letter="S" />
        <span
          className={`text-white ml-4 transition-all duration-500 ease-in-out ${
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
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
