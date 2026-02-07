import { useState, useEffect } from 'react';
import type { Route } from '../types/mbta';
import { getRoutes } from '../api/routes';

export const useRoutes = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await getRoutes();
                setRoutes(data.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch routes'));
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    return { routes, loading, error };
};
