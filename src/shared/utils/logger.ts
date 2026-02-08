export const logger = {
    info: (...args: any[]) => {
        if (import.meta.env.MODE !== 'production') {
            console.log(...args);
        }
    },
    warn: (...args: any[]) => {
        if (import.meta.env.MODE !== 'production') {
            console.warn(...args);
        }
    },
    error: (...args: any[]) => {
        // In production, we might want to send this to Sentry or similar
        // For now, we print to console but could redact if needed
        if (import.meta.env.MODE !== 'production') {
            console.error(...args);
        } else {
            // generic production error log
            console.error('An error occurred.');
        }
    }
};
