import apiClient from '../../../shared/api/client';
import type { ApiResponse, Route, PaginationParams } from '../../../types/mbta';

export const getRoutes = async (params: PaginationParams = {}): Promise<ApiResponse<Route[]>> => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('page[limit]', params.limit.toString());
    if (params.offset) queryParams.append('page[offset]', params.offset.toString());
    if (params.sort) queryParams.append('sort', params.sort);
    // Type 0 and 1 are typically light rail/subway, 3 is bus. Filter for relevance if needed, or fetch all.
    // queryParams.append('filter[type]', '0,1,3'); 

    const response = await apiClient.get<ApiResponse<Route[]>>(`/routes?${queryParams.toString()}`);
    return response.data;
};
