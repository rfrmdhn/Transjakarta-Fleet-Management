import { useState, useEffect } from 'react';
import type { Vehicle, Route, Trip } from '../../types/mbta';
import { getVehicleById } from '../../api/vehicles';
import { getShape } from '../../api/shapes';
import { decodePolyline } from '../../utils/polyline';

export const useVehicleDetails = (vehicleId: string | undefined) => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [route, setRoute] = useState<Route | undefined>(undefined);
    const [trip, setTrip] = useState<Trip | undefined>(undefined);
    const [shapePath, setShapePath] = useState<[number, number][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!vehicleId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch Vehicle with included Route and Trip
                const response = await getVehicleById(vehicleId);
                const vehicleData = response.data;
                setVehicle(vehicleData);

                // Extract Included Data
                const included = response.included || [];
                const routeData = included.find(i => i.type === 'route' && i.id === vehicleData.relationships.route.data?.id) as Route | undefined;
                const tripData = included.find(i => i.type === 'trip' && i.id === vehicleData.relationships.trip.data?.id) as Trip | undefined;

                setRoute(routeData);
                setTrip(tripData);

                // Fetch Shape if Trip has one
                if (tripData?.relationships.shape.data?.id) {
                    try {
                        const shapeResponse = await getShape(tripData.relationships.shape.data.id);
                        if (shapeResponse.data.attributes.polyline) {
                            const decoded = decodePolyline(shapeResponse.data.attributes.polyline);
                            setShapePath(decoded);
                        } else {
                            setShapePath([]);
                        }
                    } catch (shapeErr) {
                        console.warn('Failed to fetch shape:', shapeErr);
                        setShapePath([]);
                    }
                } else {
                    setShapePath([]);
                }

            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch details'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [vehicleId]);

    return { vehicle, route, trip, shapePath, loading, error };
};
