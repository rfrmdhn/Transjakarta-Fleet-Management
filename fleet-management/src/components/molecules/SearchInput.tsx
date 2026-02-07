import React from 'react';
import { Input } from '../atoms/Input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, className, ...props }) => {
    return (
        <Input
            leftIcon="search"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className={className}
            {...props}
        />
    );
};
