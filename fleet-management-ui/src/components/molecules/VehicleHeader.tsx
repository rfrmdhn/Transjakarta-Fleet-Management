import React from 'react';
import type { Vehicle, Route, Trip } from '../../types/mbta';

interface VehicleHeaderProps {
    vehicle: Vehicle;
    routeData?: Route;
    tripData?: Trip;
    onClose: () => void;
}

export const VehicleHeader: React.FC<VehicleHeaderProps> = ({ vehicle, routeData, tripData, onClose }) => {
    return (
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-white dark:bg-card-dark shrink-0">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {vehicle.attributes.label || vehicle.id}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                        {vehicle.attributes.current_status.replace(/_/g, ' ')}
                    </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Bus ID: {vehicle.id} • Route: {routeData?.attributes.short_name || vehicle.relationships.route.data?.id || 'N/A'}
                    {tripData && ` • Trip: ${tripData.attributes.headsign}`}
                </p>
            </div>
            <button
                onClick={onClose}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
};
