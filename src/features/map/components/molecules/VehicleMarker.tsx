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

    const divIcon = L.divIcon({
        className: 'bg-transparent border-none',
        html: `
            <div class="relative flex flex-col items-center justify-center">
                <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-primary shadow-lg flex items-center justify-center transform transition-transform duration-300 ${isSelected ? 'scale-125 z-50 ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}" style="transform: rotate(${vehicle.attributes.bearing}deg)">
                    <span class="material-symbols-outlined text-primary text-xl" style="transform: rotate(-45deg)">navigation</span>
                </div>
                <div class="absolute -bottom-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 whitespace-nowrap z-40">
                    ${label}
                </div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    return (
        <Marker
            position={[latitude, longitude]}
            eventHandlers={{ click: handleClick }}
            opacity={isSelected ? 1 : 0.9}
            icon={divIcon}
            zIndexOffset={isSelected ? 1000 : 0}
        >
            <Popup>
                <div className="text-sm">
                    <p className="font-bold">Vehicle {label}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${current_status === 'STOPPED_AT' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        <p>{current_status.replace(/_/g, ' ')}</p>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};
