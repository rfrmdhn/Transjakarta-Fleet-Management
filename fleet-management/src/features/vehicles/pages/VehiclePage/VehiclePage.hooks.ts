import { useState } from 'react';
import { useVehicles } from '../../hooks/useVehicles';
import type { Vehicle } from '../../../../types/mbta';

export const useVehiclePage = () => {
    const { vehicles, loading, error, pagination, setPage, setLimit, refresh, filters, setFilters } = useVehicles();
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const activeCount = vehicles.filter(v => v.attributes.current_status !== 'STOPPED_AT').length;
    const stoppedCount = vehicles.length - activeCount;

    return {
        vehicles,
        loading,
        error,
        pagination,
        setPage,
        setLimit,
        refresh,
        filters,
        setFilters,
        selectedVehicle,
        setSelectedVehicle,
        activeCount,
        stoppedCount
    };
};
