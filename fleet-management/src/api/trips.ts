import apiClient from './client';
import type { ApiResponse, Trip, PaginationParams } from '../types/mbta';

export const getTrips = async (params: PaginationParams = {}): Promise<ApiResponse<Trip[]>> => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('page[limit]', params.limit.toString());
    if (params.offset) queryParams.append('page[offset]', params.offset.toString());
    if (params['filter[route]']) queryParams.append('filter[route]', params['filter[route]']);

    const response = await apiClient.get<ApiResponse<Trip[]>>(`/trips?${queryParams.toString()}`);
    return response.data;
};
