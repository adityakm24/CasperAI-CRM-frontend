import React from "react";
import Home from "../../layouts/home"; // Import the Home layout that contains Navbar and Sidebar
import KanbanBoard from "./components/KanbanBoard"; // Import the KanbanBoard component

const Dashboard: React.FC = () => {
  return (
    <Home>
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
        <KanbanBoard /> {/* Render the KanbanBoard here */}
      </div>
    </Home>
  );
};

export default Dashboard;
