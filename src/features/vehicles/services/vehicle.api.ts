import apiClient from '../../../shared/api/client';
import type { ApiResponse, Vehicle, PaginationParams, Route, Trip } from '../../../types/mbta';

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



export const getVehicleById = async (id: string): Promise<ApiResponse<Vehicle> & { included?: (Route | Trip)[] }> => {
    const response = await apiClient.get<ApiResponse<Vehicle> & { included?: (Route | Trip)[] }>(`/vehicles/${id}?include=route,trip`);
    return response.data; // This usually only returns 'data', we need the full object if we want 'included'
};
