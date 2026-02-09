import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Vehicle } from '../../../../types/mbta';
import { VehicleMarker } from '../molecules/VehicleMarker';
import { RoutePolyline } from '../atoms/RoutePolyline';
import { getVehicleById } from '../../../vehicles/services/vehicle.api';
import type { Trip } from '../../../../types/mbta';

interface MapContainerProps {
    vehicles: Vehicle[];
    selectedVehicleId: string | null;
    onVehicleSelect: (vehicle: Vehicle) => void;
}

// Helper component to handle map centering
const RecenterMap = ({ selectedVehicleId, vehicles }: { selectedVehicleId: string | null, vehicles: Vehicle[] }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedVehicleId) {
            const vehicle = vehicles.find(v => v.id === selectedVehicleId);
            if (vehicle) {
                map.flyTo([vehicle.attributes.latitude, vehicle.attributes.longitude], 15, {
                    animate: true,
                    duration: 1.5
                });
            }
        }
    }, [selectedVehicleId, vehicles, map]);

    return null;
};

export const MapContainer: React.FC<MapContainerProps> = ({ vehicles, selectedVehicleId, onVehicleSelect }) => {
    // Default center (Jakarta coordinates roughly, but MBTA is Boston based... using Boston for data accuracy testing first, or if "Transjakarta" imply just name but using MBTA API?)
    // Re-reading: "Transjakarta Fleet Management" but using MBTA API... 
    // I should probably stick to MBTA coordinates (Boston) for now since the API is MBTA.
    // Boston: 42.3601, -71.0589

    const [selectedTripShapeId, setSelectedTripShapeId] = useState<string | null>(null);

    useEffect(() => {
        const fetchShapeId = async () => {
            if (selectedVehicleId) {
                try {
                    const response = await getVehicleById(selectedVehicleId);
                    if (response.included) {
                        const trip = response.included.find(i => i.type === 'trip') as Trip;
                        if (trip && trip.relationships.shape.data) {
                            setSelectedTripShapeId(trip.relationships.shape.data.id);
                        }
                    }
                } catch (e) {
                    console.error("Error fetching shape id", e);
                }
            } else {
                setSelectedTripShapeId(null);
            }
        };

        fetchShapeId();
    }, [selectedVehicleId]);


    return (
        <LeafletMap
            center={[42.3601, -71.0589]}
            zoom={13}
            className="w-full h-full rounded-xl z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap selectedVehicleId={selectedVehicleId} vehicles={vehicles} />

            {vehicles.map(vehicle => (
                <VehicleMarker
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={onVehicleSelect}
                    isSelected={vehicle.id === selectedVehicleId}
                />
            ))}

            {selectedTripShapeId && (
                <RoutePolyline shapeId={selectedTripShapeId} color="red" />
            )}
        </LeafletMap>
    );
};
