import axios from 'axios';

export const addLeadApi = async (leadData: any) => {
  // Get the Bearer token if stored
  const token = localStorage.getItem('accessToken');

  // Log the token to check if it's correctly retrieved
  console.log('Bearer Token:', token);

  const response = await axios.post('http://localhost:3001/leads/add-lead', leadData, {
    headers: {
      Authorization: `Bearer ${token}`,  // Attach the Bearer token to the request
    },
  });

  return response.data;
};
