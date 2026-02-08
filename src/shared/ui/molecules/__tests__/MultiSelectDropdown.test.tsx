import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import userEvent from '@testing-library/user-event';

describe('MultiSelectDropdown', () => {
    const mockFetchData = vi.fn();
    const mockOnChange = vi.fn();
    const mockRenderItem = (item: any) => item.name;
    const mockItemKey = (item: any) => item.id;

    beforeEach(() => {
        vi.clearAllMocks();
        mockFetchData.mockResolvedValue({ data: [] });
    });

    it('should render label and placeholder', () => {
        render(
            <MultiSelectDropdown
                label="Test Dropdown"
                fetchData={mockFetchData}
                value={[]}
                onChange={mockOnChange}
                renderItem={mockRenderItem}
                itemKey={mockItemKey}
            />
        );

        expect(screen.getByText('Test Dropdown')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('should load items when opened', async () => {
        const mockItems = [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }];
        mockFetchData.mockResolvedValue({ data: mockItems });

        render(
            <MultiSelectDropdown
                label="Test Dropdown"
                fetchData={mockFetchData}
                value={[]}
                onChange={mockOnChange}
                renderItem={mockRenderItem}
                itemKey={mockItemKey}
            />
        );

        // Open dropdown
        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockFetchData).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });

    it('should toggle selection', async () => {
        const mockItems = [{ id: '1', name: 'Item 1' }];
        mockFetchData.mockResolvedValue({ data: mockItems });
        const user = userEvent.setup();

        render(
            <MultiSelectDropdown
                label="Test Dropdown"
                fetchData={mockFetchData}
                value={[]}
                onChange={mockOnChange}
                renderItem={mockRenderItem}
                itemKey={mockItemKey}
            />
        );

        // Open dropdown
        await user.click(screen.getByRole('button'));

        // Wait for items
        await waitFor(() => screen.getByText('Item 1'));

        // Click item
        await user.click(screen.getByText('Item 1'));

        expect(mockOnChange).toHaveBeenCalledWith(['1']);
    });
});
