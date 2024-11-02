import { AxiosResponse } from 'axios';
import { LeadData } from '../types';
import { handleApiError } from '../../../utils/errorHandler';

export const addLead = async (leadData: LeadData): Promise<{ message: string }> => {
    try {
        const response: AxiosResponse<{ message: string }> = await axiosInstance.post(`/leads/add-lead`, leadData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export default {
    addLead,
};
