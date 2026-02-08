export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_URL || 'https://api-v3.mbta.com',
        key: import.meta.env.VITE_MBTA_API_KEY,
    },
};
