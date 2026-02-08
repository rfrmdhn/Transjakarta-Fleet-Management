import React from 'react';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = "Something went wrong", onRetry }) => {
    return (
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 flex flex-col items-center justify-center text-center border border-red-100 dark:border-red-800/30">
            <span className="material-symbols-outlined text-4xl text-red-500 mb-3">error_outline</span>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Error Loading Data</h3>
            <p className="text-red-600 dark:text-red-300 text-sm mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-700 transition"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};
