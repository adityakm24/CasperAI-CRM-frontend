// src/features/dashboard/components/AddLeadModal.tsx
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addLead } from "../redux/addLeadSlice";
import "react-phone-input-2/lib/style.css";
import "../../../index.css";
import { openSnackbar } from "../../../redux/snackbarSlice";

const leadSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "First Name must be at least 2 characters")
        .required("First Name is required"),
    lastName: Yup.string()
        .min(2, "Last Name must be at least 2 characters")
        .required("Last Name is required"),
    phone: Yup.string()
        .required("Phone Number is required")
        .matches(/^\d+$/, "Phone Number must be numeric"),
});

interface AddLeadModalProps {
    onClose: () => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        status: "Fresh", 
    });
    const dispatch = useDispatch<AppDispatch>(); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhoneChange = (value: string) => {
        setFormValues((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        try {
            await leadSchema.validateAt(name, { [name]: value });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                dispatch(openSnackbar({ message: error.message, type: "error" }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await leadSchema.validate(formValues, { abortEarly: false });
            await dispatch(addLead(formValues)); 
            onClose();
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                dispatch(openSnackbar({ message: error.errors[0], type: "error" }));
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#212121] p-8 rounded-lg w-96 text-white shadow-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-pop-in font-adlam">
                <h2 className="text-2xl font-semibold mb-6">Add New Lead</h2>
                
                <form onSubmit={handleSubmit}>
                    <label className="text-gray-300 mb-1 block">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="w-full mb-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ height: "2.5rem", paddingLeft: "10px" }}
                        value={formValues.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <label className="text-gray-300 mb-1 block">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="w-full mb-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ height: "2.5rem", paddingLeft: "10px" }}
                        value={formValues.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <label className="text-gray-300 mb-1 block">Phone Number</label>
                    <PhoneInput
                        country={"sa"}
                        value={formValues.phone}
                        onChange={handlePhoneChange}
                        inputStyle={{
                            width: "100%",
                            backgroundColor: "#4B5563",
                            color: "white",
                            borderRadius: "0.375rem",
                            height: "2.5rem",
                            paddingLeft: "55px",
                            paddingRight: "10px",
                        }}
                        buttonStyle={{
                            backgroundColor: "#4B5563",
                            borderRadius: "0.375rem",
                        }}
                        dropdownStyle={{
                            backgroundColor: "#4B5563",
                            color: "white",
                        }}
                    />
                    
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Add Lead
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-300 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
