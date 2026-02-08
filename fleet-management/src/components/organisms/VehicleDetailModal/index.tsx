import React from 'react';
import type { Vehicle } from '../../../types/mbta';
import { useVehicleDetailModal } from './useVehicleDetailModal';
import { VehicleDetailModalView } from './VehicleDetailModal.view';

interface VehicleDetailModalProps {
    vehicle: Vehicle;
    onClose: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, onClose }) => {
    const logic = useVehicleDetailModal(vehicle, onClose);

    return <VehicleDetailModalView logic={logic} />;
};
