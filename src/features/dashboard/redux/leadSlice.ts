import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addLeadApi } from '../services/leadService'; // Import the API service for adding a lead

// Thunk to handle adding a lead asynchronously
export const addLeadThunk = createAsyncThunk(
  'leads/addLead',
  async (leadData: any, { rejectWithValue }) => { // Explicitly type leadData as 'any' or provide the actual type
    try {
      // Call the API and pass lead data
      const response = await addLeadApi(leadData);
      return response;
    } catch (error: any) { // Type error as 'any'
      return rejectWithValue(error.response?.data || 'An error occurred'); // Handle errors
    }
  }
);

const initialState = {
  fresh: [], // Fresh leads
  notSerious: [], // Not-serious leads
  serious: [], // Serious leads
  loading: false,  // <--- Add loading state
  error: null,     // <--- Add error state
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLeadThunk.pending, (state) => {
        state.loading = true;  // Set loading true when request is pending
        state.error = null;
      })
      .addCase(addLeadThunk.fulfilled, (state, action) => {
        const lead = action.payload;
        if (lead.status === 'fresh') {
          state.fresh.push(lead);
        }
        state.loading = false;  // Set loading false when request is done
      })
      .addCase(addLeadThunk.rejected, (state, action) => {
        state.loading = false;  // Set loading false if request failed
        // Set error message properly, handling the case where action.payload might be undefined or unknown
        state.error = (action.payload as string) || 'Failed to add lead'; 
      });
  },
});

export default leadSlice.reducer;
