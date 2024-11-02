// src/components/LeadCard.tsx
import React from "react";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";

interface LeadCardProps {
    name: string;
    phone: string;
    date: string;
    status: "Fresh" | "Not-Serious" | "Serious";
}

const LeadCard: React.FC<LeadCardProps> = ({ name, phone, date, status }) => {
    const statusColor = {
        Fresh: "border-green-500",
        "Not-Serious": "border-red-500",
        Serious: "border-blue-500",
    }[status];

    return (
        <div className={`p-4 bg-[#212121] text-white rounded-lg shadow-md border-l-4 ${statusColor} font-adlam`}>
            <div className="flex items-center space-x-3 mb-2">
                <FaUserAlt className="text-gray-400 text-lg" />
                <span className="text-lg font-semibold">{name}</span>
            </div>

            <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-gray-400 text-lg" />
                <span className="text-sm text-gray-300">{phone}</span>
            </div>
            <div className="text-xs text-gray-500  text-right">{date}</div>
        </div>
    );
};

export default LeadCard;
