import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Category {
  id: string;
  name: string;
  icon?: string;
  count: number;
  subcategories?: string[];
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  rating: number | null;
  artisanLocation: string[];
  materials: string[];
  sortBy: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
}

const defaultCategories: Category[] = [
  { id: 'all', name: 'All Products', count: 245, icon: '???' },
  { id: 'pottery', name: 'Pottery & Ceramics', count: 42, icon: '??', subcategories: ['Mugs', 'Bowls', 'Vases', 'Sculptures'] },
  { id: 'textiles', name: 'Textiles & Weaving', count: 38, icon: '??', subcategories: ['Scarves', 'Blankets', 'Rugs', 'Wall Hangings'] },
  { id: 'woodwork', name: 'Woodwork', count: 56, icon: '??', subcategories: ['Furniture', 'Carving', 'Utensils', 'Decorative'] },
  { id: 'jewelry', name: 'Jewelry', count: 67, icon: '??', subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets'] },
  { id: 'glass', name: 'Glass Art', count: 23, icon: '??', subcategories: ['Vases', 'Sculptures', 'Drinkware', 'Ornaments'] },
  { id: 'metal', name: 'Metalwork', count: 31, icon: '??', subcategories: ['Sculptures', 'Jewelry', 'Utensils', 'Decor'] },
  { id: 'leather', name: 'Leather Goods', count: 29, icon: '??', subcategories: ['Bags', 'Wallets', 'Belts', 'Accessories'] },
  { id: 'paper', name: 'Paper Crafts', count: 18, icon: '??', subcategories: ['Stationery', 'Origami', 'Bookbinding', 'Decor'] },
];

const materials = [
  'Clay', 'Wood', 'Metal', 'Glass', 'Fabric', 'Leather', 'Stone', 'Resin', 'Ceramic', 'Bamboo'
];

const locations = [
  'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'bestsellers', label: 'Bestsellers' },
];

export default function CategoryFilter({ 
  categories = defaultCategories,
  onFilterChange,
  initialFilters,
  className = ''
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || ['all']
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 1000]
  );
  const [minRating, setMinRating] = useState<number | null>(
    initialFilters?.rating || null
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    initialFilters?.materials || []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialFilters?.artisanLocation || []
  );
  const [sortBy, setSortBy] = useState<string>(
    initialFilters?.sortBy || 'featured'
  );
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    let newCategories;
    if (categoryId === 'all') {
      newCategories = ['all'];
    } else {
      newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories.filter(id => id !== 'all'), categoryId];
      
      if (newCategories.length === 0) newCategories = ['all'];
    }
    
    setSelectedCategories(newCategories);
    applyFilters({ categories: newCategories });
  };

  const handleMaterialToggle = (material: string) => {
    const newMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    
    setSelectedMaterials(newMaterials);
    applyFilters({ materials: newMaterials });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    
    setSelectedLocations(newLocations);
    applyFilters({ artisanLocation: newLocations });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    applyFilters({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number | null) => {
    setMinRating(rating);
    applyFilters({ rating });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters({ sortBy: value });
  };

  const applyFilters = (changes: Partial<FilterState>) => {
    const newFilters: FilterState = {
      priceRange,
      categories: selectedCategories,
      rating: minRating,
      artisanLocation: selectedLocations,
      materials: selectedMaterials,
      sortBy,
      ...changes
    };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedCategories(['all']);
    setPriceRange([0, 1000]);
    setMinRating(null);
    setSelectedMaterials([]);
    setSelectedLocations([]);
    setSortBy('featured');
    onFilterChange({
      priceRange: [0, 1000],
      categories: ['all'],
      rating: null,
      artisanLocation: [],
      materials: [],
      sortBy: 'featured'
    });
  };

  const activeFilterCount = [
    selectedCategories.filter(c => c !== 'all').length,
    minRating !== null ? 1 : 0,
    selectedMaterials.length,
    selectedLocations.length,
    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className={`${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${
            isMobileFiltersOpen ? 'rotate-180' : ''
          }`} />
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}
        space-y-8 p-6 bg-white border rounded-xl shadow-sm
      `}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Sort By */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.icon && <span>{category.icon}</span>}
                  {category.name}
                </span>
                <Badge variant="secondary">{category.count}</Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h4>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>$500</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
          <div className="flex gap-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(minRating === rating ? null : rating)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                  minRating === rating
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? 'text-amber-400' : 'text-gray-300'
                      }`}
                    >
                      ?
                    </div>
                  ))}
                </div>
                <span className="text-sm">& up</span>
              </button>
            ))}
            <button
              onClick={() => handleRatingChange(null)}
              className={`px-3 py-2 rounded-lg border ${
                minRating === null
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Any
            </button>
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Materials</h4>
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <Badge
                key={material}
                variant={selectedMaterials.includes(material) ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleMaterialToggle(material)}
              >
                {material}
                {selectedMaterials.includes(material) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Artisan Locations */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Artisan Location</h4>
          <ScrollArea className="h-40">
            <div className="space-y-2 pr-4">
              {locations.map((location) => (
                <div key={location} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories
                .filter(c => c !== 'all')
                .map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return category ? (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="gap-1"
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      {category.name}
                      <X className="w-3 h-3" />
                    </Badge>
                  ) : null;
                })}
              
              {minRating !== null && (
                <Badge variant="secondary" className="gap-1" onClick={() => handleRatingChange(null)}>
                  Rating: {minRating}+ stars
                  <X className="w-3 h-3" />
                </Badge>
              )}

              {selectedMaterials.map(material => (
                <Badge key={material} variant="secondary" className="gap-1" onClick={() => handleMaterialToggle(material)}>
                  {material}
                  <X className="w-3 h-3" />
                </Badge>
              ))}

              {selectedLocations.map(location => (
                <Badge key={location} variant="secondary" className="gap-1" onClick={() => handleLocationToggle(location)}>
                  {location}
                  <X className="w-3 h-3" />
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge 
                  variant="secondary" 
                  className="gap-1" 
                  onClick={() => handlePriceChange(0, 1000)}
                >
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <X className="w-3 h-3" />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

