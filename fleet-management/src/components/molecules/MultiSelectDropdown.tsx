import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { ApiResponse } from '../../types/mbta';
import clsx from 'clsx';
import { SearchInput } from './SearchInput';

interface MultiSelectDropdownProps<T> {
    label: string;
    fetchData: (params?: any) => Promise<ApiResponse<T[]>>;
    value: string[];
    onChange: (value: string[]) => void;
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    placeholder?: string;
}

export const MultiSelectDropdown = <T,>({
    label,
    fetchData,
    value,
    onChange,
    renderItem,
    itemKey,
    placeholder = "Select..."
}: MultiSelectDropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    const loadItems = useCallback(async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;

        setLoading(true);
        try {
            const currentOffset = reset ? 0 : offset;
            const response = await fetchData({
                'page[offset]': currentOffset,
                'page[limit]': 10,
                // Add rudimentary search if API supports it or filter locally? 
                // MBTA API filtering is complex, let's just fetch for now or filter locally if needed.
                // For this component we assume infinite scrolling list.
            });

            // Client-side filtering for search if API doesn't support easy search param
            // Note: In real app, we should pass search param to fetchData

            const newItems = response.data;

            if (reset) {
                setItems(newItems);
                setOffset(10);
            } else {
                setItems(prev => [...prev, ...newItems]);
                setOffset(prev => prev + 10);
            }

            // Simple heuristic for hasMore
            if (newItems.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

        } catch (error) {
            console.error("Failed to fetch items", error);
        } finally {
            setLoading(false);
        }
    }, [offset, loading, hasMore, fetchData]);

    // Initial load when opening
    useEffect(() => {
        if (isOpen && items.length === 0) {
            loadItems(true);
        }
    }, [isOpen]);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadItems();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadItems]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSelection = (key: string) => {
        const newValue = value.includes(key)
            ? value.filter(v => v !== key)
            : [...value, key];
        onChange(newValue);
    };

    // Filter items locally based on search
    const filteredItems = items.filter(item => {
        if (!search) return true;
        // Simple string check on rendered content? 
        // We'll trust the caller to handle search if they want, 
        // but here we can just filter by key or try to stringify
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
    });

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
