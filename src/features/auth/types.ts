
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
}


export interface AuthResponse {
    user: User;
    accessToken: string;
}
