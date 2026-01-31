import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, DollarSign, Star, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import type { FilterState } from '@/types/marketplace';

type CategoryOption = {
  id: string;
  name: string;
  count: number;
  icon?: string;  // ✅ allow extra fields from marketplace page
  color?: string; // ✅ allow extra fields from marketplace page
};

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  availableCategories: CategoryOption[];
  availableMaterials: string[];
  availableLocations: string[];
  className?: string;
  mobile?: boolean; // ✅ ADD THIS
}

export default function ProductFilters({
  onFilterChange,
  initialFilters,
  availableCategories,
  availableMaterials,
  availableLocations,
  className = '',
  mobile = false, // ✅ default
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      categories: [],
      priceRange: [0, 1000],
      minRating: null,
      materials: [],
      artisanLocations: [],
      sortBy: 'featured',
      inStockOnly: false,
      onSaleOnly: false,
    }
  );

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: false,
    materials: false,
    location: false,
    other: false,
  });

  const updateFilters = (changes: Partial<FilterState>) => {
    const newFilters = { ...filters, ...changes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];

    updateFilters({ categories: newCategories });
  };

  const handlePriceChange = (values: number[]) => {
    updateFilters({ priceRange: [values[0], values[1]] as [number, number] });
  };

  const handleRatingChange = (rating: number | null) => {
    updateFilters({ minRating: rating });
  };

  const handleMaterialToggle = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];

    updateFilters({ materials: newMaterials });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.artisanLocations.includes(location)
      ? filters.artisanLocations.filter((l) => l !== location)
      : [...filters.artisanLocations, location];

    updateFilters({ artisanLocations: newLocations });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 1000],
      minRating: null,
      materials: [],
      artisanLocations: [],
      sortBy: 'featured',
      inStockOnly: false,
      onSaleOnly: false,
    };

    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = [
    filters.categories.length,
    filters.minRating ? 1 : 0,
    filters.materials.length,
    filters.artisanLocations.length,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0,
    filters.inStockOnly ? 1 : 0,
    filters.onSaleOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={`${mobile ? 'space-y-5' : 'space-y-6'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-sm">
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((categoryId) => {
              const category = availableCategories.find((c) => c.id === categoryId);
              return category ? (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                  <X className="w-3 h-3" />
                </Badge>
              ) : null;
            })}

            {filters.minRating && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleRatingChange(null)}
              >
                <Star className="w-3 h-3" />
                {filters.minRating}+ stars
                <X className="w-3 h-3" />
              </Badge>
            )}

            {filters.materials.map((material) => (
              <Badge
                key={material}
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleMaterialToggle(material)}
              >
                {material}
                <X className="w-3 h-3" />
              </Badge>
            ))}

            {filters.artisanLocations.map((location) => (
              <Badge
                key={location}
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleLocationToggle(location)}
              >
                <MapPin className="w-3 h-3" />
                {location}
                <X className="w-3 h-3" />
              </Badge>
            ))}

            {filters.onSaleOnly && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => updateFilters({ onSaleOnly: false })}
              >
                <Tag className="w-3 h-3" />
                On Sale
                <X className="w-3 h-3" />
              </Badge>
            )}

            {filters.inStockOnly && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => updateFilters({ inStockOnly: false })}
              >
                In Stock Only
                <X className="w-3 h-3" />
              </Badge>
            )}

            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => updateFilters({ priceRange: [0, 1000] })}
              >
                <DollarSign className="w-3 h-3" />
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <X className="w-3 h-3" />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-gray-900">Categories</span>
          {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                  {category.name}
                  <span className="text-gray-500 ml-2">({category.count})</span>
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range */}
      <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection('price')}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            <Slider
              min={0}
              max={1000}
              step={10}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{filters.priceRange[0]}</span>
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{filters.priceRange[1]}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$250</span>
              <span>$500</span>
              <span>$750</span>
              <span>$1000+</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Minimum Rating */}
      <Collapsible open={expandedSections.rating} onOpenChange={() => toggleSection('rating')}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-gray-900">Minimum Rating</span>
          {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.minRating === rating}
                  onCheckedChange={() => handleRatingChange(filters.minRating === rating ? null : rating)}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer text-sm font-normal">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? 'fill-amber-400 text-amber-400'
                            : i < rating
                            ? 'fill-amber-400/50 text-amber-400/50'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">{rating}+ stars</span>
                </Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rating-any"
                checked={filters.minRating === null}
                onCheckedChange={() => handleRatingChange(null)}
              />
              <Label htmlFor="rating-any" className="cursor-pointer text-sm font-normal">
                Any rating
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Materials */}
      {availableMaterials.length > 0 && (
        <>
          <Collapsible open={expandedSections.materials} onOpenChange={() => toggleSection('materials')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <span className="font-medium text-gray-900">Materials</span>
              {expandedSections.materials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {availableMaterials.map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      checked={filters.materials.includes(material)}
                      onCheckedChange={() => handleMaterialToggle(material)}
                    />
                    <Label htmlFor={`material-${material}`} className="flex-1 cursor-pointer text-sm font-normal">
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Separator />
        </>
      )}

      {/* Artisan Locations */}
      {availableLocations.length > 0 && (
        <>
          <Collapsible open={expandedSections.location} onOpenChange={() => toggleSection('location')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <span className="font-medium text-gray-900">Artisan Location</span>
              {expandedSections.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {availableLocations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={filters.artisanLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                    />
                    <Label htmlFor={`location-${location}`} className="flex-1 cursor-pointer text-sm font-normal">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Separator />
        </>
      )}

      {/* Other Filters */}
      <Collapsible open={expandedSections.other} onOpenChange={() => toggleSection('other')}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-gray-900">Other Filters</span>
          {expandedSections.other ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => updateFilters({ inStockOnly: checked === true })}
              />
              <Label htmlFor="in-stock" className="cursor-pointer text-sm font-normal">
                In stock only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSaleOnly}
                onCheckedChange={(checked) => updateFilters({ onSaleOnly: checked === true })}
              />
              <Label htmlFor="on-sale" className="cursor-pointer text-sm font-normal">
                On sale only
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full mt-4">
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
