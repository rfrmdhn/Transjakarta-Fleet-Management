import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../../../apps/layouts/DashboardLayout';
import { MapContainer } from '../../components/organisms/MapContainer';
import { VehicleDetailDialog } from '../../components/molecules/VehicleDetailDialog';
import { getVehicles } from '../../../vehicles/services/vehicle.api';
import type { Vehicle } from '../../../../types/mbta';
import { useToast } from '../../../../shared/hooks/useToast';

export const MapView: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    // Mapping vehicle selection
    const handleVehicleSelect = (vehicle: Vehicle) => {
        setSelectedVehicleId(vehicle.id);
    };

    const handleCloseDialog = () => {
        setSelectedVehicleId(null);
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                // Fetch vehicles with a reasonable limit for map display, e.g., 50 or 100
                const response = await getVehicles({ limit: 50 });
                setVehicles(response.data);
            } catch (error) {
                console.error("Failed to load vehicles", error);
                addToast('Failed to load vehicles', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();

        // Optional: Polling every 10 seconds
        const interval = setInterval(fetchVehicles, 10000);
        return () => clearInterval(interval);
    }, [addToast]);

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-8rem)] min-h-[500px] relative">
                <div className="absolute top-4 left-4 z-[400] bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Map</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {loading ? 'Updating...' : `${vehicles.length} vehicles active`}
                    </p>
                </div>

                <MapContainer
                    vehicles={vehicles}
                    selectedVehicleId={selectedVehicleId}
                    onVehicleSelect={handleVehicleSelect}
                />

                <VehicleDetailDialog
                    isOpen={!!selectedVehicleId}
                    onClose={handleCloseDialog}
                    vehicleId={selectedVehicleId}
                />
            </div>
        </DashboardLayout>
    );
};
