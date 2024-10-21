import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddLeadForm from "./AddLeadForm";
import "../styles/KanbanBoard.css";

const KanbanBoard = () => {
  const leads = useSelector(
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
        <div className="kanban-column">
          <h2>Fresh Leads ({leads.fresh.length})</h2>
          {leads.fresh.length > 0 ? (
            leads.fresh.map((lead: any) => (
              <div className="kanban-card" key={lead.id}>
                <h4>{lead.name}</h4>
                <p>{lead.phoneNumber}</p>
              </div>
            ))
          ) : (
            <p>No fresh leads available</p>
          )}
        </div>

        {/* Not-Serious Leads Column */}
        <div className="kanban-column">
          <h2>Not-Serious Leads ({leads.notSerious.length})</h2>
          {leads.notSerious.length > 0 ? (
            leads.notSerious.map((lead: any) => (
              <div className="kanban-card" key={lead.id}>
                <h4>{lead.name}</h4>
                <p>{lead.phoneNumber}</p>
              </div>
            ))
          ) : (
            <p>No Not-Serious leads available</p>
          )}
        </div>

        {/* Serious Leads Column */}
        <div className="kanban-column">
          <h2>Serious Leads ({leads.serious.length})</h2>
          {leads.serious.length > 0 ? (
            leads.serious.map((lead: any) => (
              <div className="kanban-card" key={lead.id}>
                <h4>{lead.name}</h4>
                <p>{lead.phoneNumber}</p>
              </div>
            ))
          ) : (
            <p>No Serious leads available</p>
          )}
        </div>
      </div>

      {/* Render the Add Lead Form if isFormOpen is true */}
      {isFormOpen && <AddLeadForm onClose={handleCloseForm} />}
    </div>
  );
};

export default KanbanBoard;
