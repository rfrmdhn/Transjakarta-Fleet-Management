import React, { useEffect, useState } from 'react';
import { Modal } from '../../../../shared/ui/molecules/Modal';
import type { Vehicle, Trip, Route } from '../../../../types/mbta';
import { getVehicleById } from '../../../vehicles/services/vehicle.api';

interface VehicleDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    vehicleId: string | null;
}

export const VehicleDetailDialog: React.FC<VehicleDetailDialogProps> = ({ isOpen, onClose, vehicleId }) => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!vehicleId) return;
            setLoading(true);
            try {
                // @ts-ignore - The return type in api definition might need adjustment to generic access
                const response = await getVehicleById(vehicleId);
                setVehicle(response.data);

                if (response.included) {
                    const foundTrip = response.included.find(i => i.type === 'trip') as Trip;
                    const foundRoute = response.included.find(i => i.type === 'route') as Route;
                    setTrip(foundTrip || null);
                    setRoute(foundRoute || null);
                }
            } catch (err) {
                console.error("Failed to fetch details", err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && vehicleId) {
            fetchDetails();
        } else {
            setVehicle(null);
            setTrip(null);
            setRoute(null);
        }
    }, [vehicleId, isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={vehicle ? `Vehicle ${vehicle.attributes.label}` : 'Vehicle Details'}
            className="w-full max-w-2xl"
        >
            {loading ? (
                <div className="p-8 text-center text-slate-500">Loading details...</div>
            ) : vehicle ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                            <span className="text-xs text-slate-500 uppercase font-semibold">Status</span>
                            <p className="font-medium">{vehicle.attributes.current_status.replace(/_/g, ' ')}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                            <span className="text-xs text-slate-500 uppercase font-semibold">Speed</span>
                            <p className="font-medium">{vehicle.attributes.speed || 0} km/h</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                            <span className="text-xs text-slate-500 uppercase font-semibold">Occupancy</span>
                            <p className="font-medium">{vehicle.attributes.occupancy_status?.replace(/_/g, ' ') || 'Unknown'}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                            <span className="text-xs text-slate-500 uppercase font-semibold">Bearing</span>
                            <p className="font-medium">{vehicle.attributes.bearing}°</p>
                        </div>
                    </div>

                    {route && (
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                            <h4 className="font-semibold mb-2">Route Information</h4>
                            <div className="flex items-center gap-2">
                                <span
                                    className="px-2 py-1 rounded text-white text-sm font-bold"
                                    style={{ backgroundColor: `#${route.attributes.color}` }}
                                >
                                    {route.attributes.short_name}
                                </span>
                                <span>{route.attributes.long_name}</span>
                            </div>
                        </div>
                    )}

                    {trip && (
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                            <h4 className="font-semibold mb-2">Trip Information</h4>
                            <p className="text-sm">{trip.attributes.headsign}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-8 text-center text-slate-500">No details available</div>
            )}
        </Modal>
    );
};
