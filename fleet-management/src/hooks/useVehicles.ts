import { useState, useEffect, useCallback } from 'react';
import type { Vehicle, PaginationParams } from '../types/mbta';
import { getVehicles } from '../api/vehicles';
import { FilterKeys, FilterDefaults } from '../constants/filters';

export const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
        totalPages: 0,
        totalItems: 0 // Approximate based on last offset
    });
    const [filters, setFilters] = useState<{ routes: string[]; trips: string[] }>({
        routes: [],
        trips: []
    });

    const fetchVehicles = useCallback(async (params?: PaginationParams) => {
        setLoading(true);
        setError(null);
        try {
            // Include current limit in params if not overriding
            const currentLimit = params?.limit || pagination.limit;
            const currentOffset = params?.offset ?? ((pagination.page - 1) * currentLimit);



            // ... (inside fetchVehicles)
            const filterParams: Record<string, string> = {
                [FilterKeys.ROUTE_TYPE]: FilterDefaults.ROUTE_TYPE
            };

            if (filters.routes.length > 0) {
                filterParams[FilterKeys.ROUTE] = filters.routes.join(',');
            }
            if (filters.trips.length > 0) {
                filterParams[FilterKeys.TRIP] = filters.trips.join(',');
            }
            // ...

            const data = await getVehicles({
                ...params,
                limit: currentLimit,
                offset: currentOffset,
                ...filterParams
            });

            setVehicles(data.data);

            // Parse pagination links
            let calculatedTotalPages = 1;
            let calculatedTotalItems = 0;

            if (data.links?.last) {
                try {
                    const lastUrl = new URL(data.links.last);
                    const lastOffset = parseInt(lastUrl.searchParams.get('page[offset]') || '0', 10);
                    const limit = parseInt(lastUrl.searchParams.get('page[limit]') || currentLimit.toString(), 10);

                    calculatedTotalPages = Math.ceil((lastOffset + limit) / limit);
                    calculatedTotalItems = lastOffset + limit;
                } catch (e) {
                    console.error("Failed to parse pagination links", e);
                }
            } else if (data.data.length < currentLimit && pagination.page === 1) {
                // Single page result
                calculatedTotalPages = 1;
                calculatedTotalItems = data.data.length;
            }

            setPagination(prev => ({
                ...prev,
                totalPages: calculatedTotalPages || 1,
                totalItems: calculatedTotalItems,
            }));

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch vehicles'));
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, filters]);

    // Cleanup interval on unmount or deps change
    useEffect(() => {
        fetchVehicles();
        const interval = setInterval(fetchVehicles, 30000);
        return () => clearInterval(interval);
    }, [fetchVehicles]);

    const setPage = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const setLimit = (limit: number) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
    };

    const updateFilters = (newFilters: { routes: string[]; trips: string[] }) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    return { vehicles, loading, error, pagination, setPage, setLimit, refresh: fetchVehicles, filters, setFilters: updateFilters };
};
