import { useState, useRef, useCallback, useEffect } from 'react';
import type { ApiResponse } from '../../types/mbta';

interface UseMultiSelectDropdownProps<T> {
    fetchData: (params?: any) => Promise<ApiResponse<T[]>>;
    value: string[];
    onChange: (value: string[]) => void;
}

export const useMultiSelectDropdown = <T,>({
    fetchData,
    value,
    onChange,
}: UseMultiSelectDropdownProps<T>) => {
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
                offset: currentOffset,
                limit: 10,
            });

            const newItems = response.data;

            if (reset) {
                setItems(newItems);
                setOffset(10);
            } else {
                setItems(prev => [...prev, ...newItems]);
                setOffset(prev => prev + 10);
            }

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

    const filteredItems = items.filter(item => {
        if (!search) return true;
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
    });

    return {
        isOpen,
        setIsOpen,
        items,
        loading,
        search,
        setSearch,
        dropdownRef,
        observerTarget,
        filteredItems,
        toggleSelection,
    };
};
