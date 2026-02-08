import React from 'react';
import type { Vehicle } from '../../../../../types/mbta';

interface VehicleTelemetryProps {
    vehicle: Vehicle;
}

export const VehicleTelemetry: React.FC<VehicleTelemetryProps> = ({ vehicle }) => {
    return (
        <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">monitor_heart</span>
                Telemetry
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Speed</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{vehicle.attributes.speed ?? 0} km/h</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Heading</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{vehicle.attributes.bearing}&deg;</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Latitude</span>
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{vehicle.attributes.latitude.toFixed(5)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Longitude</span>
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{vehicle.attributes.longitude.toFixed(5)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Updated</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{new Date(vehicle.attributes.updated_at).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};
