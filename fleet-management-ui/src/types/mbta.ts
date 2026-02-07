export interface ApiResponse<T> {
    data: T;
    links?: {
        first?: string;
        last?: string;
        next?: string;
        prev?: string;
    };
}

export interface MbtaAttributes {
    // Common attributes can go here
}

export interface Vehicle {
    id: string;
    type: string;
    attributes: {
        bearing: number;
        current_status: 'IN_TRANSIT_TO' | 'STOPPED_AT' | 'INCOMING_AT';
        current_stop_sequence: number;
        direction_id: 0 | 1;
        label: string;
        latitude: number;
        longitude: number;
        occupancy_status: string | null;
        revenue: 'REVENUE' | 'NON_REVENUE';
        speed: number | null;
        updated_at: string;
    };
    relationships: {
        route: { data: { id: string; type: 'route' } };
        stop: { data: { id: string; type: 'stop' } | null };
        trip: { data: { id: string; type: 'trip' } | null };
    };
}

export interface Route {
    id: string;
    type: 'route';
    attributes: {
        color: string;
        description: string;
        direction_destinations: string[];
        direction_names: string[];
        fare_class: string;
        long_name: string;
        short_name: string;
        sort_order: number;
        text_color: string;
        type: number;
    };
}

export interface Trip {
    id: string;
    type: 'trip';
    attributes: {
        block_id: string;
        direction_id: 0 | 1;
        headsign: string;
        name: string;
        wheelchair_accessible: number;
    };
    relationships: {
        shape: { data: { id: string; type: 'shape' } | null };
    };
}

export interface Shape {
    id: string;
    type: 'shape';
    attributes: {
        polyline: string;
    };
}

export interface PaginationParams {
    limit?: number;
    offset?: number;
    sort?: string;
    'filter[route]'?: string;
    'filter[route_type]'?: string;
    'filter[trip]'?: string;
}
