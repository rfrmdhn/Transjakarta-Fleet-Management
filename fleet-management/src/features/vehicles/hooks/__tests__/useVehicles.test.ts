import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useVehicles } from '../useVehicles';
import { getVehicles } from '../../services/vehicle.api';

// Mock the API module
vi.mock('../../services/vehicle.api', () => ({
    getVehicles: vi.fn(),
}));

describe('useVehicles', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with default state', () => {
        // Mock a pending promise to keep loading true initially if needed, 
        // or just check initial return values before strict mode updates.
        (getVehicles as any).mockResolvedValue({ data: [], links: {} });

        const { result } = renderHook(() => useVehicles());

        expect(result.current.loading).toBe(true);
        expect(result.current.vehicles).toEqual([]);
        expect(result.current.error).toBe(null);
    });

    it('should fetch vehicles successfully', async () => {
        const mockVehicles = [
            { id: '1', attributes: { label: 'Bus 1' } },
            { id: '2', attributes: { label: 'Bus 2' } },
        ];
        (getVehicles as any).mockResolvedValue({
            data: mockVehicles,
            links: { last: 'http://api.com?page[offset]=10&page[limit]=10' }
        });

        const { result } = renderHook(() => useVehicles());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.vehicles).toEqual(mockVehicles);
        expect(result.current.pagination.totalItems).toBeGreaterThan(0);
    });

    it('should handle API errors', async () => {
        const mockError = new Error('API Error');
        (getVehicles as any).mockRejectedValue(mockError);

        const { result } = renderHook(() => useVehicles());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toEqual(mockError);
        expect(result.current.vehicles).toEqual([]);
    });

    it('should update filters', async () => {
        (getVehicles as any).mockResolvedValue({ data: [], links: {} });

        const { result } = renderHook(() => useVehicles());

        await waitFor(() => expect(result.current.loading).toBe(false));

        // Update filters
        result.current.setFilters({ routes: ['Route1'], trips: [] });

        await waitFor(() => {
            // API should be called with new filters. 
            // Note: The hook has a useEffect that triggers fetch on filter change.
            expect(getVehicles).toHaveBeenCalledWith(expect.objectContaining({
                'filter[route]': 'Route1'
            }));
        });
    });
});
