import React from 'react';
import { ChevronDown, ArrowUpDown, TrendingUp, Star, DollarSign, Clock, Sparkles, Flame } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export type SortOption = 
  | 'featured'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'popularity'
  | 'bestsellers'
  | 'name-asc'
  | 'name-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
  showLabel?: boolean;
}

const sortOptions = [
  {
    value: 'featured' as SortOption,
    label: 'Featured',
    description: 'Curated by our team',
    icon: Sparkles,
    badge: 'Recommended',
  },
  {
    value: 'newest' as SortOption,
    label: 'Newest',
    description: 'Recently added products',
    icon: Clock,
  },
  {
    value: 'bestsellers' as SortOption,
    label: 'Bestsellers',
    description: 'Most purchased items',
    icon: Flame,
    badge: 'Hot',
  },
  {
    value: 'popularity' as SortOption,
    label: 'Popularity',
    description: 'Most viewed & favorited',
    icon: TrendingUp,
  },
  {
    value: 'rating' as SortOption,
    label: 'Highest Rated',
    description: 'Top customer ratings',
    icon: Star,
  },
  {
    value: 'price-low' as SortOption,
    label: 'Price: Low to High',
    description: 'Affordable first',
    icon: DollarSign,
  },
  {
    value: 'price-high' as SortOption,
    label: 'Price: High to Low',
    description: 'Premium first',
    icon: DollarSign,
  },
  {
    value: 'name-asc' as SortOption,
    label: 'Name: A to Z',
    description: 'Alphabetical order',
    icon: ArrowUpDown,
  },
  {
    value: 'name-desc' as SortOption,
    label: 'Name: Z to A',
    description: 'Reverse alphabetical',
    icon: ArrowUpDown,
  },
];

export default function SortDropdown({
  value,
  onChange,
  className = '',
  showLabel = true,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  return (
    <div className="relative inline-block">
      <Button 
        variant="outline" 
        className={`gap-2 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowUpDown className="w-4 h-4" />
        {showLabel ? (
          <span className="hidden sm:inline">Sort by: </span>
        ) : null}
        <span className="font-medium">{selectedOption.label}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 font-normal px-3 py-2">
              Sort products by
            </div>
            <div className="h-px bg-gray-200 mb-2" />
            
            {sortOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = value === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-start p-3 w-full cursor-pointer text-left rounded-md mb-1 hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className={`font-medium ${isSelected ? 'text-blue-600' : ''}`}>
                        {option.label}
                      </span>
                    </div>
                    {option.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 text-left">
                    {option.description}
                  </p>
                </button>
              );
            })}
            
            <div className="h-px bg-gray-200 mt-2" />
            <div className="p-3">
              <p className="text-xs text-gray-500">
                Sort order affects product display and search ranking
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
