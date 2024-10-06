import axios from 'axios';

export const handleApiError = (error: unknown): { message: string } => {
    console.log('Entering handleApiError with error:', error);

    if (axios.isAxiosError(error)) {
        console.log('Axios Error Details:', {
            response: error.response,
            request: error.request,
            message: error.message
        });

        if (error.response) {
            const backendMessage = error.response.data?.message || error.response.data || 'An unknown error occurred';
            console.log('Backend Error Message:', backendMessage);
            return { message: typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage) };
        } else if (error.request) {
            console.log('No response received from server');
            return { message: 'No response from the server. Please try again.' };
        }
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
        console.log('Error object with message property:', (error as { message: string }).message);
        return { message: (error as { message: string }).message };
    }

    console.log('Unhandled error case');
    return { message: 'An unknown error occurred' };
};