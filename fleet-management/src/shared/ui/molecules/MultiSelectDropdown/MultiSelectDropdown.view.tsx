import React from 'react';
import clsx from 'clsx';
import { SearchInput } from '../SearchInput';
import type { useMultiSelectDropdown } from './useMultiSelectDropdown';

interface MultiSelectDropdownViewProps<T> {
    label: string;
    value: string[];
    placeholder: string;
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    logic: ReturnType<typeof useMultiSelectDropdown<T>>;
}

export const MultiSelectDropdownView = <T,>({
    label,
    value,
    placeholder,
    renderItem,
    itemKey,
    logic,
}: MultiSelectDropdownViewProps<T>) => {
    const {
        isOpen,
        setIsOpen,
        loading,
        search,
        setSearch,
        dropdownRef,
        observerTarget,
        filteredItems,
        toggleSelection,
    } = logic;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                {label}
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-left hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
                <span className={value.length === 0 ? "text-slate-400" : "text-slate-900 dark:text-white"}>
                    {value.length > 0 ? `${value.length} selected` : placeholder}
                </span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                        <SearchInput
                            value={search}
                            onSearch={setSearch}
                            autoFocus
                            placeholder={`Search ${label}...`}
                            className="bg-white dark:bg-slate-900"
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 p-1">
                        {filteredItems.map(item => {
                            const key = itemKey(item);
                            const isSelected = value.includes(key);
                            return (
                                <div
                                    key={key}
                                    onClick={() => toggleSelection(key)}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm transition-colors",
                                        isSelected
                                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                        isSelected
                                            ? "bg-primary border-primary"
                                            : "border-slate-300 dark:border-slate-600"
                                    )}>
                                        {isSelected && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
                                    </div>
                                    <div className="flex-1 truncate">
                                        {renderItem(item)}
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={observerTarget} className="h-4 w-full flex items-center justify-center p-2">
                            {loading && <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>}
                        </div>

                        {!loading && filteredItems.length === 0 && (
                            <div className="p-4 text-center text-xs text-slate-500">
                                No items found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
