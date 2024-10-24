import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLeadThunk } from "../redux/leadSlice"; // Import the thunk
import { RootState } from "../../../redux/store"; // Import RootState if you're using TypeScript
import "../styles/AddLeadForm.css"; 

const AddLeadForm = ({ onClose }: { onClose: () => void }) => {
  const [leadData, setLeadData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    status: "fresh",
    notes: "Interested in property",
    propertyInterest: "Residential",
    tag: "serious",
  });

  const dispatch = useDispatch();

  // Select loading and error from the Redux store
  // Make sure 'dashboardLeads' is the key under which your leads reducer is stored in the global store
  const loading = useSelector(
    (state: RootState) => state.dashboardLeads.loading
  );
  const error = useSelector((state: RootState) => state.dashboardLeads.error);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the thunk to add lead
    dispatch(addLeadThunk(leadData));

    onClose(); // Close the form after adding the lead
  };

  return (
    <div className="add-lead-modal">
      <div className="modal-content">
        <h2>Add New Lead</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={leadData.firstName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={leadData.lastName}
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
            <button type="submit" className="btn-add" disabled={loading}>
              {loading ? "Adding Lead..." : "Add Lead"}
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
