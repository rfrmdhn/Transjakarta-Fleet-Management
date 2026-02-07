import apiClient from './client';
import type { ApiResponse, Shape } from '../types/mbta';

export const getShape = async (id: string): Promise<ApiResponse<Shape>> => {
    const response = await apiClient.get<ApiResponse<Shape>>(`/shapes/${id}`);
    return response.data;
};
