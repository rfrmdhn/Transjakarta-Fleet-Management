import React, { useEffect, useState } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { getShape } from '../../../vehicles/services/shapes.api';
// @ts-ignore
import polylineChecker from '@mapbox/polyline';

interface RoutePolylineProps {
    shapeId: string;
    color?: string;
}

export const RoutePolyline: React.FC<RoutePolylineProps> = ({ shapeId, color = 'blue' }) => {
    const [positions, setPositions] = useState<[number, number][]>([]);
    const map = useMap();

    useEffect(() => {
        const fetchShape = async () => {
            try {
                const shapeData = await getShape(shapeId);
                if (shapeData && shapeData.data && shapeData.data.attributes && shapeData.data.attributes.polyline) {
                    const decoded = polylineChecker.decode(shapeData.data.attributes.polyline);
                    setPositions(decoded);

                    if (decoded.length > 0) {
                        map.fitBounds(decoded);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch shape:", error);
            }
        };

        if (shapeId) {
            fetchShape();
        }
    }, [shapeId, map]);

    if (positions.length === 0) return null;

    return <Polyline positions={positions} pathOptions={{ color }} />;
};
