import React from 'react';

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestsellers' | 'popularity';

interface SortDropdownProps {
  value: string;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'bestsellers', label: 'Best Sellers' },
  ];

  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border rounded-md px-3 py-2"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
