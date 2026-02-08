import React from 'react';
import type { ApiResponse } from '../../types/mbta';
import { useMultiSelectDropdown } from './useMultiSelectDropdown';
import { MultiSelectDropdownView } from './MultiSelectDropdown.view';

export interface MultiSelectDropdownProps<T> {
    label: string;
    fetchData: (params?: any) => Promise<ApiResponse<T[]>>;
    value: string[];
    onChange: (value: string[]) => void;
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    placeholder?: string;
}

export const MultiSelectDropdown = <T,>(props: MultiSelectDropdownProps<T>) => {
    const { placeholder = "Select...", ...restHooks } = props;
    const logic = useMultiSelectDropdown(restHooks);

    return (
        <MultiSelectDropdownView
            {...props}
            placeholder={placeholder}
            logic={logic}
        />
    );
};
