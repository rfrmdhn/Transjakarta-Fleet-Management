import React from 'react';
import { useVehiclePage } from './VehiclePage.hooks';
import { VehiclePageView } from './VehiclePage';

export const VehiclePage: React.FC = () => {
    const logic = useVehiclePage();

    return <VehiclePageView logic={logic} />;
};
