import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddLeadForm from "./AddLeadForm";
import KanbanColumn from "./KanbanColumn";
import "../styles/KanbanBoard.css";

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
}

interface LeadsState {
  fresh: Lead[];
  notSerious: Lead[];
  serious: Lead[];
}

const KanbanBoard: React.FC = () => {
  const leads: LeadsState = useSelector(
    (state: any) =>
      state.dashboardLeads || { fresh: [], notSerious: [], serious: [] }
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle the form popup visibility
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <div className="kanban-board-container">
      <div className="kanban-header">
        <button className="add-lead-button" onClick={handleOpenForm}>
          Add Lead
        </button>
      </div>

      <div className="kanban-board">
        {/* Fresh Leads Column */}
        <KanbanColumn title="Fresh Leads" leads={leads.fresh} />

        {/* Not-Serious Leads Column */}
        <KanbanColumn title="Not-Serious Leads" leads={leads.notSerious} />

        {/* Serious Leads Column */}
        <KanbanColumn title="Serious Leads" leads={leads.serious} />
      </div>

      {/* Render the Add Lead Form if isFormOpen is true */}
      {isFormOpen && <AddLeadForm onClose={handleCloseForm} />}
    </div>
  );
};

export default KanbanBoard;
