import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Vehicle } from '../../types/mbta';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface VehicleMapProps {
    vehicle: Vehicle;
    routePath?: [number, number][];
}

export const VehicleMap: React.FC<VehicleMapProps> = ({ vehicle, routePath = [] }) => {


    return (
        <div className="w-full md:w-2/3 h-64 md:h-auto bg-slate-100 dark:bg-slate-800 relative">
            <MapContainer
                center={[vehicle.attributes.latitude, vehicle.attributes.longitude]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="grayscale"
                />

                {routePath.length > 0 && (
                    <>
                        {/* Border Line */}
                        <Polyline
                            positions={routePath}
                            pathOptions={{ color: '#ffffff', weight: 8, opacity: 0.9 }}
                        />
                        {/* Main Line */}
                        <Polyline
                            positions={routePath}
                            pathOptions={{ color: '#258cf4', weight: 5, opacity: 1.0 }}
                        />
                    </>
                )}

                <Marker position={[vehicle.attributes.latitude, vehicle.attributes.longitude]}>
                    <Popup>
                        Vehicle {vehicle.attributes.label} <br /> {vehicle.attributes.current_status}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

