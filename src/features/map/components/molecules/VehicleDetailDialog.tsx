import React, { useEffect, useState } from 'react';
import type { Vehicle, Trip, Route } from '../../../../types/mbta';
import { getVehicleById } from '../../../vehicles/services/vehicle.api';
import clsx from 'clsx';

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
                // @ts-ignore
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
            // Optional: retain data while closing for smooth transition, but for now clearing
            // setVehicle(null);
        }
    }, [vehicleId, isOpen]);

    if (!isOpen && !vehicle) return null;

    return (
        <div
            className={clsx(
                "absolute top-4 right-4 z-[500] w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-all duration-300 ease-in-out flex flex-col max-h-[calc(100%-2rem)]",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white">
                    {vehicle ? `Vehicle ${vehicle.attributes.label}` : 'Vehicle Details'}
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {loading ? (
                    <div className="py-8 text-center text-slate-500 text-sm">Loading details...</div>
                ) : vehicle ? (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Status</span>
                                <span className={clsx(
                                    "px-2 py-0.5 rounded text-xs font-medium",
                                    vehicle.attributes.current_status === 'STOPPED_AT'
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                )}>
                                    {vehicle.attributes.current_status.replace(/_/g, ' ')}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                                    <span className="text-[10px] text-slate-500 uppercase block">Speed</span>
                                    <p className="font-medium text-sm">{vehicle.attributes.speed || 0} km/h</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                                    <span className="text-[10px] text-slate-500 uppercase block">Bearing</span>
                                    <p className="font-medium text-sm">{vehicle.attributes.bearing}°</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                                <span className="text-[10px] text-slate-500 uppercase block">Occupancy</span>
                                <p className="font-medium text-sm">{vehicle.attributes.occupancy_status?.replace(/_/g, ' ') || 'Unknown'}</p>
                            </div>
                        </div>

                        {route && (
                            <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Route</h4>
                                <div className="flex items-start gap-2">
                                    <span
                                        className="px-1.5 py-0.5 rounded text-white text-xs font-bold shrink-0 mt-0.5"
                                        style={{ backgroundColor: `#${route.attributes.color}` }}
                                    >
                                        {route.attributes.short_name}
                                    </span>
                                    <span className="text-sm leading-tight">{route.attributes.long_name}</span>
                                </div>
                            </div>
                        )}

                        {trip && (
                            <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Current Trip</h4>
                                <p className="text-sm">{trip.attributes.headsign}</p>
                            </div>
                        )}

                        <div className="text-xs text-slate-400 pt-2 text-center">
                            Last updated: {new Date(vehicle.attributes.updated_at).toLocaleTimeString()}
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center text-slate-500 text-sm">Select a vehicle to see details</div>
                )}
            </div>
        </div>
    );
};
