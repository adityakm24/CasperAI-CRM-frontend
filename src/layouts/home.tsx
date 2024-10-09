import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Page content */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <p>This is your main content area. Customize it as needed.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
