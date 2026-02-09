import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Vehicle } from '../../../../types/mbta';

// Fix for default Leaflet icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface VehicleMarkerProps {
    vehicle: Vehicle;
    onClick: (vehicle: Vehicle) => void;
    isSelected: boolean;
}

export const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle, onClick, isSelected }) => {
    const { latitude, longitude, label, current_status } = vehicle.attributes;

    const handleClick = () => {
        onClick(vehicle);
    };

    // Custom icon based on status or rotation could be added here
    // For now using default but we could rotate a custom bus icon with CSS if needed by passing a custom Icon to Marker

    return (
        <Marker
            position={[latitude, longitude]}
            eventHandlers={{ click: handleClick }}
            opacity={isSelected ? 1 : 0.7}
        >
            <Popup>
                <div className="text-sm">
                    <p className="font-bold">{label}</p>
                    <p>{current_status.replace(/_/g, ' ')}</p>
                </div>
            </Popup>
        </Marker>
    );
};
