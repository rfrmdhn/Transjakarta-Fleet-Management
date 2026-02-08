import React from 'react';
import type { Vehicle } from '../../../../types/mbta';
import { useVehicleDetailModal } from './VehicleDetailModal.hooks';
import { VehicleDetailModalView } from './VehicleDetailModal';

interface VehicleDetailModalProps {
    vehicle: Vehicle;
    onClose: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, onClose }) => {
    const logic = useVehicleDetailModal(vehicle, onClose);

    return <VehicleDetailModalView logic={logic} />;
};
