import React from 'react';
import { MultiSelectDropdown } from '../../../../shared/ui/molecules/MultiSelectDropdown';
import { getRoutes } from '../../services/routes.api';
import { getTrips } from '../../services/trips.api';
import type { Route, Trip } from '../../../../types/mbta';

interface FilterSectionProps {
    filters: {
        routes: string[];
        trips: string[];
    };
    onFilterChange: (filters: { routes: string[]; trips: string[] }) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {

    const handleRouteChange = (selectedRoutes: string[]) => {
        onFilterChange({ routes: selectedRoutes, trips: [] });
    };

    const handleTripChange = (selectedTrips: string[]) => {
        onFilterChange({ ...filters, trips: selectedTrips });
    };

    const handleReset = () => {
        onFilterChange({ routes: [], trips: [] });
    };

    return (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
                    {/* Route Filter */}
                    <div className="max-w-[300px] w-full">
                        <MultiSelectDropdown<Route>
                            label="Route"
                            fetchData={getRoutes}
                            value={filters.routes}
                            onChange={handleRouteChange}
                            renderItem={(route) => (
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-800 dark:text-slate-200">
                                        {route.attributes.short_name || route.id}
                                    </span>
                                    {route.attributes.long_name && (
                                        <span className="text-xs text-slate-500 truncate">
                                            {route.attributes.long_name}
                                        </span>
                                    )}
                                </div>
                            )}
                            itemKey={(route) => route.id}
                            placeholder="All Routes"
                        />
                    </div>

                    {/* Trip Filter */}
                    <div className="max-w-[300px] w-full">
                        <MultiSelectDropdown<Trip>
                            key={filters.routes.join(',')}
                            label="Trip"
                            fetchData={(params) => {
                                if (filters.routes.length === 0) return Promise.resolve({ data: [] });
                                return getTrips({ ...params, 'filter[route]': filters.routes.join(',') });
                            }}
                            value={filters.trips}
                            onChange={handleTripChange}
                            renderItem={(trip) => (
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-800 dark:text-slate-200">
                                        {trip.attributes.headsign || trip.id}
                                    </span>
                                    <span className="text-xs text-slate-500 truncate">
                                        {trip.attributes.name || `Trip ${trip.id}`}
                                    </span>
                                </div>
                            )}
                            itemKey={(trip) => trip.id}
                            placeholder={filters.routes.length === 0 ? "Select Route first" : "All Trips"}
                        />
                    </div>
                </div>

                {/* Reset */}
                <div className="flex items-end gap-3 w-full lg:w-auto mt-2 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-auto lg:ml-0"
                    >
                        <span className="material-symbols-outlined text-lg">restart_alt</span>
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};
