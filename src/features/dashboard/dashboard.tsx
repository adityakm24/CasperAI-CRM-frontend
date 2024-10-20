import React from "react";
import Home from "../../layouts/home"; // Import the Home layout that contains Navbar and Sidebar

const Dashboard: React.FC = () => {
  return (
    <Home> 
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Content</h1>
        {/* Add more dashboard-specific content here */}
      </div>
    </Home>
  );
};

export default Dashboard;
