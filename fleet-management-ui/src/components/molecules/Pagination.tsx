import React from 'react';
import { Button } from '../atoms/Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    limit,
    onPageChange,
    onLimitChange
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-4 mt-6">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium text-slate-900 dark:text-white">{Math.min(currentPage * limit, totalItems)}</span> of <span className="font-medium text-slate-900 dark:text-white">{totalItems}</span>
                </span>

                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="text-sm border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-card-dark text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    aria-label="Items per page"
                >
                    <option value={8}>8 / page</option>
                    <option value={16}>16 / page</option>
                    <option value={32}>32 / page</option>
                    <option value={64}>64 / page</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    leftIcon="chevron_left"
                >
                    Previous
                </Button>

                <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                            pageNum = currentPage - 3 + i;
                            if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    rightIcon="chevron_right"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
