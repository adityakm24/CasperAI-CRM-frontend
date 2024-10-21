import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fresh: [], // Fresh leads
    notSerious: [], // Not-serious leads
    serious: [], // Serious leads
};

const leadSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addLead: (state, action) => {
            const lead = { ...action.payload, id: Date.now().toString() };  // Ensure the lead has an id
            console.log("Adding new lead to fresh:", lead);
            if (lead.status === 'fresh') {
                state.fresh.push(lead); 
            }
        }
    },
});

export const { addLead } = leadSlice.actions;
export default leadSlice.reducer;
