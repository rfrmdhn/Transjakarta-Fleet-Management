export const FilterKeys = {
    ROUTE: 'filter[route]',
    TRIP: 'filter[trip]',
    ROUTE_TYPE: 'filter[route_type]',
} as const;

export const FilterDefaults = {
    ROUTE_TYPE: '3', // Bus
} as const;
