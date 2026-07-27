// API Base URL - Backend server runs on http://localhost:5001/api
export const API_BASE_URL = 'http://localhost:5001/api';

// export const API_BASE_URL = 'https://turfbackend-pn8j.onrender.com';

/**
 * Submit general contact form
 */
export async function sendContactMessage(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to send message');
    }
    return json;
  } catch (error) {
    console.error('API sendContactMessage Error:', error);
    throw error;
  }
}

/**
 * Submit App Launch Pre-registration (Notify Me)
 */
export async function sendAppNotifyRequest(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to submit notification request');
    }
    return json;
  } catch (error) {
    console.error('API sendAppNotifyRequest Error:', error);
    throw error;
  }
}
