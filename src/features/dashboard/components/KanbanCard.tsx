import React from "react";
import "../styles/KanbanCard.css"; // Ensure you have appropriate styles

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
}

interface KanbanCardProps {
  lead: Lead;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ lead }) => {
  return (
    <div className="kanban-card">
      <h4>{lead.name}</h4>
      <p>{lead.phoneNumber}</p>
    </div>
  );
};

export default KanbanCard;
