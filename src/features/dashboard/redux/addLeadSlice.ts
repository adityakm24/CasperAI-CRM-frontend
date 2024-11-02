// src/features/dashboard/redux/addLeadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { openSnackbar } from "../../../redux/snackbarSlice";
import dashboardService from "../services/dashboardService";
import { LeadData } from "../types";

interface LeadState {
    freshLeads: LeadData[];
    notSeriousLeads: LeadData[];
    seriousLeads: LeadData[];
    loading: boolean;
    error: string | null;
}

const initialState: LeadState = {
    freshLeads: [],
    notSeriousLeads: [],
    seriousLeads: [],
    loading: false,
    error: null,
};

export const addLead = createAsyncThunk(
    "leads/addLead",
    async (leadData: LeadData, { dispatch, rejectWithValue }) => {
        try {
            const response = await dashboardService.addLead(leadData);
            dispatch(openSnackbar({ message: response.message, type: "success" }));
            return leadData;
        } catch (error) {
            dispatch(openSnackbar({ message: "Failed to add lead.", type: "error" }));
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unknown error occurred.");
        }
    }
);

const addLeadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLead.fulfilled, (state, action: PayloadAction<LeadData>) => {
                state.loading = false;
                const lead = action.payload;

                if (lead.status === "Fresh") {
                    state.freshLeads.push(lead);
                } else if (lead.status === "Not-Serious") {
                    state.notSeriousLeads.push(lead);
                } else if (lead.status === "Serious") {
                    state.seriousLeads.push(lead);
                }
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default addLeadSlice.reducer;
