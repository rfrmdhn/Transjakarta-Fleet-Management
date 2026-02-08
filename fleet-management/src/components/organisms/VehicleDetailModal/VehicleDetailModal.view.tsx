import React from 'react';
import { VehicleHeader } from '../../molecules/VehicleHeader';
import { VehicleMap } from '../../molecules/VehicleMap';
import { VehicleTelemetry } from '../../molecules/VehicleTelemetry';
import { VehicleAssignment } from '../../molecules/VehicleAssignment';
import type { useVehicleDetailModal } from './useVehicleDetailModal';

interface VehicleDetailModalViewProps {
    logic: ReturnType<typeof useVehicleDetailModal>;
}

export const VehicleDetailModalView: React.FC<VehicleDetailModalViewProps> = ({ logic }) => {
    const { displayVehicle, route, trip, shapePath, onClose } = logic;

    if (!displayVehicle) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-white dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                <VehicleHeader
                    vehicle={displayVehicle}
                    routeData={route}
                    tripData={trip}
                    onClose={onClose}
                />

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    <VehicleMap vehicle={displayVehicle} routePath={shapePath} />

                    <div className="w-full md:w-1/3 overflow-y-auto border-l border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                        <div className="p-6 space-y-8">
                            <VehicleTelemetry vehicle={displayVehicle} />
                            <VehicleAssignment
                                vehicle={displayVehicle}
                                routeData={route}
                                tripData={trip}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
