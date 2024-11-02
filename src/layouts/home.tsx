import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface HomeProps {
  children: React.ReactNode; 
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-[#2c2c2c] overflow-auto p-4">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Home;
