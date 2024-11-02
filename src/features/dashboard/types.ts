export interface LeadData {
    firstName: string;
    lastName: string;
    phone: string;
    status: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface AddLeadResponse {
    message: string;
}
