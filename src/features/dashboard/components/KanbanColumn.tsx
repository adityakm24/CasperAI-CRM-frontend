import React from "react";
import KanbanCard from "./KanbanCard";
import "../styles/KanbanColumn.css"; // Ensure you have appropriate styles

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
}

interface KanbanColumnProps {
  title: string;
  leads: Lead[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, leads }) => {
  return (
    <div className="kanban-column">
      <h2>
        {title} ({leads.length})
      </h2>
      {leads.length > 0 ? (
        leads.map((lead) => <KanbanCard key={lead.id} lead={lead} />)
      ) : (
        <p>No {title.toLowerCase()} available</p>
      )}
    </div>
  );
};

export default KanbanColumn;
