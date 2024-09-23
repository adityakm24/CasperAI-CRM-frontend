// src/services/webhookService.js
export const sendPhoneNumber = async (phoneNumber) => {
    const response = await fetch('https://peaceful-bayou-47899-85cf30be7379.herokuapp.com/start-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send the phone number');
    }
  
    return response.json();
  };