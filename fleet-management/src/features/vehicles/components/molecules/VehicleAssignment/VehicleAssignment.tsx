import React from 'react';
import type { Vehicle, Route, Trip } from '../../../../../types/mbta';

interface VehicleAssignmentProps {
    vehicle: Vehicle;
    routeData?: Route;
    tripData?: Trip;
}

export const VehicleAssignment: React.FC<VehicleAssignmentProps> = ({ vehicle, routeData, tripData }) => {
    return (
        <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">alt_route</span>
                Assignment
            </h3>
            <div className="space-y-4">
                <div className="p-3 bg-white dark:bg-card-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="text-xs text-slate-400 mb-1">Route</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                        {routeData ? `${routeData.attributes.short_name} - ${routeData.attributes.long_name}` : vehicle.relationships.route.data?.id || 'N/A'}
                    </div>
                </div>
                <div className="p-3 bg-white dark:bg-card-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="text-xs text-slate-400 mb-1">Current Trip</div>
                    <div className="font-medium text-slate-900 dark:text-white">
                        {tripData?.attributes.headsign || vehicle.relationships.trip.data?.id || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};
