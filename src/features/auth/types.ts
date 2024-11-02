
export interface User {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified?: boolean;
}


export interface AuthResponse {
    email: string;
    isEmailVerified: boolean;
    accessToken: string;
    firstName?: string; 
    lastName?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
