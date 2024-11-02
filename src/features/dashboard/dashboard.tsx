// src/features/dashboard/Dashboard.tsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LeadCard from "./components/LeadCard";
import Home from "../../layouts/home";
import AddLeadModal from "./components/AddLeadModal";

const Dashboard: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Home>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-lg"
                    >
                        <AiOutlinePlus />
                        <span>Add Lead</span>
                    </button>
                </div>

                {/* Example Columns */}
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">Fresh Leads (1)</h2>
                        <div className="border-t-2 border-green-500 mt-2 mb-4"></div>
                        <LeadCard name="Sowrabh" phone="+918838322018" date="30-Oct-24" status="Fresh" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">Not-Serious Leads (1)</h2>
                        <div className="border-t-2 border-red-500 mt-2 mb-4"></div>
                        <LeadCard name="Sowrabh" phone="+918838322018" date="30-Oct-24" status="Not-Serious" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">Serious (1)</h2>
                        <div className="border-t-2 border-blue-500 mt-2 mb-4"></div>
                        <LeadCard name="Sowrabh" phone="+918838322018" date="30-Oct-24" status="Serious" />
                    </div>
                </div>

                {/* Add Lead Modal */}
                {showModal && <AddLeadModal onClose={() => setShowModal(false)} />}
            </div>
        </Home>
    );
};

export default Dashboard;
