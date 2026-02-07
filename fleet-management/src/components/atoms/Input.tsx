import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    leftIcon?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    leftIcon,
    error,
    className,
    id,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-lg">{leftIcon}</span>
                    </span>
                )}
                <input
                    id={id}
                    className={clsx(
                        "w-full py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400",
                        leftIcon ? "pl-9 pr-3" : "px-3",
                        error
                            ? "border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                            : "border-slate-200 dark:border-slate-700 hover:border-primary focus:border-primary focus:ring-primary/20",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};
