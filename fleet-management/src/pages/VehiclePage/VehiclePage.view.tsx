import React from 'react';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { FilterSection } from '../../components/organisms/FilterSection';
import { VehicleGrid } from '../../components/organisms/VehicleGrid';
import { Pagination } from '../../components/molecules/Pagination';
import { VehicleDetailModal } from '../../components/organisms/VehicleDetailModal';
import type { useVehiclePage } from './useVehiclePage';

interface VehiclePageViewProps {
    logic: ReturnType<typeof useVehiclePage>;
}

export const VehiclePageView: React.FC<VehiclePageViewProps> = ({ logic }) => {
    const {
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
    } = logic;

    return (
        <DashboardLayout>
            {/* Header & Stats Overview */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vehicle Monitoring</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time fleet tracking and status updates.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-card-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                        <span className="block h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{activeCount} Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-card-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                        <span className="block h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{stoppedCount} Stopped</span>
                    </div>
                    <button
                        onClick={() => refresh()}
                        className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        <span className="text-sm font-medium">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterSection filters={filters} onFilterChange={setFilters} />

            {/* Vehicle Grid */}
            <VehicleGrid
                vehicles={vehicles}
                loading={loading}
                error={error}
                onVehicleClick={setSelectedVehicle}
            />

            {/* Pagination */}
            {!loading && !error && vehicles.length > 0 && (
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    limit={pagination.limit}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                    hasNext={pagination.page < pagination.totalPages}
                    hasPrev={pagination.page > 1}
                />
            )}

            {/* Details Modal */}
            {selectedVehicle && (
                <VehicleDetailModal
                    vehicle={selectedVehicle}
                    onClose={() => setSelectedVehicle(null)}
                />
            )}
        </DashboardLayout>
    );
};
