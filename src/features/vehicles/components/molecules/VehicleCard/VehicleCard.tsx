
import React from 'react';
import type { Vehicle } from '../../../../../types/mbta';
import { Badge, type BadgeVariant } from '../../../../../shared/ui/atoms/Badge';

import { VehicleStatus, VehicleStatusLabels, type VehicleStatusType } from '../../../constants/vehicle';

interface VehicleCardProps {
    vehicle: Vehicle;
    onClick?: (vehicle: Vehicle) => void;
}

const statusVariants: Record<string, BadgeVariant> = {
    [VehicleStatus.IN_TRANSIT_TO]: 'success',
    [VehicleStatus.STOPPED_AT]: 'danger',
    [VehicleStatus.INCOMING_AT]: 'warning',
};

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
    const isStopped = vehicle.attributes.current_status === VehicleStatus.STOPPED_AT;

    return (
        <div
            onClick={() => onClick?.(vehicle)}
            className="group relative bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Bus ID
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {vehicle.attributes.label || vehicle.id}
                        </h3>
                    </div>
                    <Badge
                        variant={statusVariants[vehicle.attributes.current_status] || 'neutral'}
                        withDot
                    >
                        {VehicleStatusLabels[vehicle.attributes.current_status as VehicleStatusType] || vehicle.attributes.current_status.replace(/_/g, ' ')}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined text-lg text-slate-400">location_on</span>
                        <span className="truncate">
                            {vehicle.attributes.latitude.toFixed(4)}, {vehicle.attributes.longitude.toFixed(4)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined text-lg text-slate-400">schedule</span>
                        <span className="truncate">
                            Updated: {new Date(vehicle.attributes.updated_at).toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Status Indicator Bar */}
            <div className={`h - 1 w - full ${isStopped ? 'bg-red-500' : 'bg-emerald-500'} `} />
        </div>
    );
};
