import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api-v3.mbta.com',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error status codes if needed
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
