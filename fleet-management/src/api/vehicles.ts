import apiClient from './client';
import type { ApiResponse, Vehicle, PaginationParams, Route, Trip } from '../types/mbta';

export const getVehicles = async (params: PaginationParams = {}): Promise<ApiResponse<Vehicle[]>> => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('page[limit]', params.limit.toString());
    if (params.offset) queryParams.append('page[offset]', params.offset.toString());
    if (params['filter[route]']) queryParams.append('filter[route]', params['filter[route]']);
    if (params['filter[trip]']) queryParams.append('filter[trip]', params['filter[trip]']);
    if (params['filter[route_type]']) queryParams.append('filter[route_type]', params['filter[route_type]']);
    if (params.sort) queryParams.append('sort', params.sort);

    const response = await apiClient.get<ApiResponse<Vehicle[]>>(`/vehicles?${queryParams.toString()}`);
    return response.data;
};

// Update return type to include 'included' logic if we want to parse it, 
// but for now MBTA API returns 'included' array side-by-side with 'data'.
// We might need a more complex type or just let Axios return 'any' for the full response to parse manually,
// OR update ApiResponse to support 'included'.

export const getVehicleById = async (id: string): Promise<ApiResponse<Vehicle> & { included?: (Route | Trip)[] }> => {
    const response = await apiClient.get<ApiResponse<Vehicle> & { included?: (Route | Trip)[] }>(`/vehicles/${id}?include=route,trip`);
    return response.data; // This usually only returns 'data', we need the full object if we want 'included'
};
