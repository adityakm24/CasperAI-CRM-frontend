import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLead } from "../redux/leadSlice"; // Import the addLead action

const AddLeadForm = ({ onClose }: { onClose: () => void }) => {
  const [leadData, setLeadData] = useState({
    name: "",
    phoneNumber: "",
    status: "fresh",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phoneNumber) {
      setError("All fields are required");
      return;
    }

    // Dispatch the action to add lead
    dispatch(addLead(leadData));

    console.log("Lead added: ", leadData); // Check if this is printed with the right data

    onClose(); // Close the form after adding the lead
  };

  return (
    <div className="add-lead-modal">
      <div className="modal-content">
        <h2>Add New Lead</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={leadData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={leadData.phoneNumber}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-add">
              Add Lead
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadForm;
