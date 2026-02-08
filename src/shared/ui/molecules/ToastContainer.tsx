import React from 'react';
import clsx from 'clsx';
import { useToast } from '../../hooks/useToast';

interface ToastContainerProps {
    toasts: ReturnType<typeof useToast>['toasts'];
    removeToast: ReturnType<typeof useToast>['removeToast'];
}

const variants = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
};

const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={clsx(
                        "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-in slide-in-from-right duration-300",
                        variants[toast.type]
                    )}
                >
                    <span className="material-symbols-outlined text-xl">
                        {icons[toast.type]}
                    </span>
                    <p className="text-sm font-medium flex-1">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            ))}
        </div>
    );
};
