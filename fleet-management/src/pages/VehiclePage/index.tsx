import React from 'react';
import { useVehiclePage } from './useVehiclePage';
import { VehiclePageView } from './VehiclePage.view';

export const VehiclePage: React.FC = () => {
    const logic = useVehiclePage();

    return <VehiclePageView logic={logic} />;
};
