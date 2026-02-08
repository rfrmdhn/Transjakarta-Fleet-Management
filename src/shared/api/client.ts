import axios from 'axios';
import { config } from '../../config/env';
import { logger } from '../../shared/utils/logger';

const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add API Key
apiClient.interceptors.request.use((reqConfig) => {
    if (config.api.key) {
        reqConfig.headers['x-api-key'] = config.api.key;
    }
    return reqConfig;
});

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error status codes if needed
        if (error.response) {
            logger.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            logger.error('Network Error:', error.request);
        } else {
            logger.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
