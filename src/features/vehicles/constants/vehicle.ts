export const VehicleStatus = {
    IN_TRANSIT_TO: 'IN_TRANSIT_TO',
    STOPPED_AT: 'STOPPED_AT',
    INCOMING_AT: 'INCOMING_AT',
} as const;

export type VehicleStatusType = typeof VehicleStatus[keyof typeof VehicleStatus];

export const VehicleStatusLabels: Record<VehicleStatusType, string> = {
    [VehicleStatus.IN_TRANSIT_TO]: 'In Transit To',
    [VehicleStatus.STOPPED_AT]: 'Stopped At',
    [VehicleStatus.INCOMING_AT]: 'Incoming At',
};
