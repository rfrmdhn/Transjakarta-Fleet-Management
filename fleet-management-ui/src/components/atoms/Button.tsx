import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: string;
    rightIcon?: string;
    loading?: boolean;
}

const variants = {
    primary: "bg-primary text-white hover:bg-blue-600 shadow-sm border-transparent",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 border-transparent",
    outline: "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800",
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 border-transparent",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border-transparent",
};

const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    leftIcon,
    rightIcon,
    loading = false,
    disabled,
    ...props
}) => {
    return (
        <button
            className={clsx(
                "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed border",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            )}
            {!loading && leftIcon && (
                <span className="material-symbols-outlined text-lg">{leftIcon}</span>
            )}
            {children}
            {!loading && rightIcon && (
                <span className="material-symbols-outlined text-lg">{rightIcon}</span>
            )}
        </button>
    );
};
