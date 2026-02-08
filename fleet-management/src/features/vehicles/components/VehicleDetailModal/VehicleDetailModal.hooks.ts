import { useVehicleDetails } from '../../hooks/useVehicleDetails';
import type { Vehicle } from '../../../../types/mbta';

export const useVehicleDetailModal = (initialVehicle: Vehicle, onClose: () => void) => {
    // Use the hook to fetch full details including shape
    const { vehicle, route, trip, shapePath } = useVehicleDetails(initialVehicle.id);

    // Fallback to initial vehicle data while loading full details
    const displayVehicle = vehicle || initialVehicle;

    return {
        displayVehicle,
        route,
        trip,
        shapePath,
        onClose
    };
};
