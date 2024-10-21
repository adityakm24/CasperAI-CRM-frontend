import axios from 'axios';

export const addLeadApi = async (leadData: any) => {
    const response = await axios.post('/api/leads', leadData);
    return response.data;
};
