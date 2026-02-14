import React from 'react';
import type { FilterState } from '@/types/marketplace';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
  availableCategories: Array<{ id: string; name: string; count?: number; icon?: string }>;
  availableMaterials: string[];
  availableLocations: string[];
  mobile?: boolean;
}

export default function ProductFilters({
  onFilterChange,
  initialFilters,
  availableCategories,
  availableMaterials,
  availableLocations,
  mobile = false
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Filters</h3>
      {/* Add your filter UI here */}
      <button 
        onClick={() => onFilterChange(initialFilters)}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
}
