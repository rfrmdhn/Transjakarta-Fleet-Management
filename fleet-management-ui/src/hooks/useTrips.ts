import { useState, useEffect } from 'react';
import type { Trip } from '../types/mbta';
import { getTrips } from '../api/trips';

export const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await getTrips();
                setTrips(data.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch trips'));
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return { trips, loading, error };
};
