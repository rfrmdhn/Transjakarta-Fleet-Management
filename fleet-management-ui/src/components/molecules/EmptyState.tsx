import React from 'react';

interface EmptyStateProps {
    message?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    message = "No data found",
    description = "Try adjusting your filters or search terms.",
    actionLabel,
    onAction
}) => {
    return (
        <div className="bg-card-light dark:bg-card-dark rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-full mb-6">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600">
                    transportation
                </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{message}</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-5 py-2.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
