import React, { useState } from "react";

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
      className={`bg-[#212121] flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-60" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col flex-1">
        <div
          className={`group w-full flex items-center justify-between p-3 rounded-md pl-5 cursor-pointer transition duration-300 ease-in-out ${
              activeSection === "Dashboard" ? "bg-[#9B9999] w-10 h-10 flex item-center justify-center" : "hover:bg-[#393937] "
          }`}
          onClick={() => handleSectionClick("Dashboard")}
        >
          <div className="flex items-center space-x-2">
            <img src="src/assets/home-2.svg" alt="Home" className="w-6 h-6" />
            <span
              className={`text-white ${
                isExpanded ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
            >
              Dashboard
            </span>
          </div>
          {isExpanded && (
            <img
              src="src/assets/angle down.svg"
              alt="Dropdown"
              className="w-4 h-4"
            />
          )}
        </div>

        {isOpen && (
          <div
            className={`ml-8 flex flex-col space-y-2 transition-all ${
              isExpanded ? "ml-8" : "items-center justify-center"
            }`}
          >
            <div
              className={`group w-full flex ${
                isExpanded ? "items-center space-x-2" : "justify-center"
              } p-2 rounded-md cursor-pointer transition duration-300 ease-in-out ${
                activeSection === "Leads" ? "bg-[#9B9999]" : "hover:bg-[#393937]"
              }`}
              onClick={() => handleSectionClick("Leads")} 
            >
              <img
                src="src/assets/leads.svg"
                alt="Leads"
                className="w-5 h-5"
              />
              <span
                className={`text-white ml-2 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
              >
                Leads
              </span>
            </div>
          </div>
        )}

        <div
          className={`group w-full flex items-center p-3 pl-5 rounded-md cursor-pointer transition duration-300 ease-in-out ${
            activeSection === "Assistants" ? "bg-[#9B9999]" : "hover:bg-[#393937]"
          }`}
          onClick={() => handleSectionClick("Assistants")} 
        >
          <img
            src="src/assets/people.svg"
            alt="Assistants"
            className="w-6 h-6"
          />
          <span
            className={`text-white ml-2 ${
              isExpanded ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
          >
            Assistants
          </span>
        </div>
      </div>

      <div className="w-full p-3 bg-[#393937] rounded-md flex items-center">
        <div className="rounded-full bg-gray-500 text-white w-8 h-8 flex items-center justify-center">
          S
        </div>
        <span
          className={`text-white ml-2 ${
            isExpanded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 ease-in-out`}
        >
          sowrabhmitoshi@gmail.com
        </span>
      </div>
    </div>
  );
};

export default SideNavbar;
