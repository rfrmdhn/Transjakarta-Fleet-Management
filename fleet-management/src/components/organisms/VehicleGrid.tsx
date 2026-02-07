import React from 'react';
import type { Vehicle } from '../../types/mbta';
import { VehicleCard } from '../molecules/VehicleCard';
import { Loading } from '../atoms/Loading';
import { ErrorState } from '../molecules/ErrorState';
import { EmptyState } from '../molecules/EmptyState';

interface VehicleGridProps {
    vehicles: Vehicle[];
    loading: boolean;
    error?: Error | null;
    onVehicleClick?: (vehicle: Vehicle) => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
    vehicles,
    loading,
    error,
    onVehicleClick
}) => {
    if (loading && vehicles.length === 0) {
        return <Loading />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    if (vehicles.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={onVehicleClick}
                />
            ))}
        </div>
    );
};
