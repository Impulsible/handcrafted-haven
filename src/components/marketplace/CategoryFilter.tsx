'use client'; // Add this for Next.js App Router

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13+ App Router
import { ChevronDown, Filter, X, Star, Palette, Scissors, TreePine, Gem, GlassWater, Hammer, ShoppingBag, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  count: number;
  subcategories?: string[];
  color: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  slug?: string;
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
  categories?: Category[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
  onCategoryClick?: (categoryId: string) => void;
}

// Category icons
const CategoryIcon = ({ categoryId, className = "w-5 h-5" }: { categoryId: string, className?: string }) => {
  switch (categoryId) {
    case 'pottery': return <Palette className={className} />;
    case 'textiles': return <Scissors className={className} />;
    case 'woodwork': return <TreePine className={className} />;
    case 'jewelry': return <Gem className={className} />;
    case 'glass': return <GlassWater className={className} />;
    case 'metal': return <Hammer className={className} />;
    case 'leather': return <ShoppingBag className={className} />;
    case 'paper': return <BookOpen className={className} />;
    default: return <div className={`${className} rounded-full bg-blue-600`} />;
  }
};

const defaultCategories: Category[] = [
  { 
    id: 'all', 
    name: 'All Products', 
    count: 245, 
    icon: <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />,
    color: 'bg-gradient-to-r from-blue-600 to-purple-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', // Darker background
    textColor: 'text-blue-900',
    borderColor: 'border-blue-500',
    slug: '/marketplace'
  },
  { 
    id: 'pottery', 
    name: 'Pottery & Ceramics', 
    count: 42, 
    icon: <CategoryIcon categoryId="pottery" />,
    subcategories: ['Mugs', 'Bowls', 'Vases', 'Sculptures'],
    color: 'bg-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200', // Darker
    textColor: 'text-amber-900',
    borderColor: 'border-amber-500',
    slug: '/category/pottery'
  },
  { 
    id: 'textiles', 
    name: 'Textiles & Weaving', 
    count: 38, 
    icon: <CategoryIcon categoryId="textiles" />,
    subcategories: ['Scarves', 'Blankets', 'Rugs', 'Wall Hangings'],
    color: 'bg-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200', // Darker
    textColor: 'text-pink-900',
    borderColor: 'border-pink-500',
    slug: '/category/textiles'
  },
  { 
    id: 'woodwork', 
    name: 'Woodwork', 
    count: 56, 
    icon: <CategoryIcon categoryId="woodwork" />,
    subcategories: ['Furniture', 'Carving', 'Utensils', 'Decorative'],
    color: 'bg-yellow-800',
    bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-200', // Darker
    textColor: 'text-yellow-900',
    borderColor: 'border-yellow-700',
    slug: '/category/woodwork'
  },
  { 
    id: 'jewelry', 
    name: 'Jewelry', 
    count: 67, 
    icon: <CategoryIcon categoryId="jewelry" />,
    subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets'],
    color: 'bg-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200', // Darker
    textColor: 'text-purple-900',
    borderColor: 'border-purple-500',
    slug: '/category/jewelry'
  },
  { 
    id: 'glass', 
    name: 'Glass Art', 
    count: 23, 
    icon: <CategoryIcon categoryId="glass" />,
    subcategories: ['Vases', 'Sculptures', 'Drinkware', 'Ornaments'],
    color: 'bg-blue-500',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100', // Darker
    textColor: 'text-blue-900',
    borderColor: 'border-blue-400',
    slug: '/category/glass'
  },
  { 
    id: 'metal', 
    name: 'Metalwork', 
    count: 31, 
    icon: <CategoryIcon categoryId="metal" />,
    subcategories: ['Sculptures', 'Jewelry', 'Utensils', 'Decor'],
    color: 'bg-gray-700',
    bgColor: 'bg-gradient-to-br from-gray-200 to-gray-300', // Darker
    textColor: 'text-gray-900',
    borderColor: 'border-gray-600',
    slug: '/category/metal'
  },
  { 
    id: 'leather', 
    name: 'Leather Goods', 
    count: 29, 
    icon: <CategoryIcon categoryId="leather" />,
    subcategories: ['Bags', 'Wallets', 'Belts', 'Accessories'],
    color: 'bg-brown-600',
    bgColor: 'bg-gradient-to-br from-amber-100 to-brown-200', // Darker
    textColor: 'text-brown-900',
    borderColor: 'border-brown-500',
    slug: '/category/leather'
  },
  { 
    id: 'paper', 
    name: 'Paper Crafts', 
    count: 18, 
    icon: <CategoryIcon categoryId="paper" />,
    subcategories: ['Stationery', 'Origami', 'Bookbinding', 'Decor'],
    color: 'bg-green-500',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100', // Darker
    textColor: 'text-green-900',
    borderColor: 'border-green-500',
    slug: '/category/paper'
  },
];

const materials = [
  { name: 'Clay', color: 'bg-amber-200', textColor: 'text-amber-900', borderColor: 'border-amber-300' },
  { name: 'Wood', color: 'bg-yellow-800', textColor: 'text-yellow-100', borderColor: 'border-yellow-900' },
  { name: 'Metal', color: 'bg-gray-400', textColor: 'text-gray-900', borderColor: 'border-gray-500' },
  { name: 'Glass', color: 'bg-blue-200', textColor: 'text-blue-900', borderColor: 'border-blue-300' },
  { name: 'Fabric', color: 'bg-pink-200', textColor: 'text-pink-900', borderColor: 'border-pink-300' },
  { name: 'Leather', color: 'bg-brown-200', textColor: 'text-brown-900', borderColor: 'border-brown-300' },
  { name: 'Stone', color: 'bg-gray-300', textColor: 'text-gray-900', borderColor: 'border-gray-400' },
  { name: 'Resin', color: 'bg-purple-200', textColor: 'text-purple-900', borderColor: 'border-purple-300' },
  { name: 'Ceramic', color: 'bg-red-200', textColor: 'text-red-900', borderColor: 'border-red-300' },
  { name: 'Bamboo', color: 'bg-green-200', textColor: 'text-green-900', borderColor: 'border-green-300' }
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
  className = '',
  onCategoryClick
}: CategoryFilterProps) {
  const router = useRouter();
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

  const handleCategoryToggle = (categoryId: string, slug?: string, event?: React.MouseEvent) => {
    // Prevent default behavior for anchor tags
    event?.preventDefault();
    
    // If category has a slug, navigate to the category page
    if (slug) {
      if (onCategoryClick) {
        onCategoryClick(categoryId);
      } else {
        router.push(slug);
      }
      return;
    }
    
    // Original filter logic
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
          className="w-full justify-between bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 hover:bg-gray-200 shadow-sm"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <span className="flex items-center gap-2 text-gray-900 font-semibold">
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-600 text-white font-bold">
                {activeFilterCount}
              </Badge>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${
            isMobileFiltersOpen ? 'rotate-180' : ''
          }`} />
        </Button>
      </div>

      {/* Filter Panel - DARKER BACKGROUND FOR BETTER CONTRAST */}
      <div className={`
        ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}
        space-y-8 p-6 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 rounded-xl shadow-lg
      `}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-400 pb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <p className="text-sm text-gray-800 mt-1">Refine your search</p>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm font-semibold text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-3 py-1"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Sort By - DARKER BACKGROUND */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
            Sort By
          </h4>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  sortBy === option.value
                    ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
                    : 'text-gray-900 hover:text-blue-800 bg-gray-50 border border-gray-400 hover:border-blue-500 hover:shadow-sm'
                }`}
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Categories - IMPROVED CONTRAST */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-700 rounded-full"></div>
              Categories
            </h4>
            <span className="text-xs text-gray-700 font-medium">
              Click to visit category page
            </span>
          </div>
          <div className="space-y-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <button
                  key={category.id}
                  onClick={(e) => handleCategoryToggle(category.id, category.slug, e)}
                  className={`group flex items-center justify-between w-full text-left p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? `border-2 ${category.borderColor || 'border-blue-600'} shadow-md`
                      : 'border border-gray-400 hover:border-gray-500'
                  } ${category.bgColor}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${category.color} ${
                      isSelected ? 'ring-2 ring-white ring-offset-2' : ''
                    }`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${category.textColor} group-hover:text-blue-900 flex items-center gap-2`}>
                        {category.name}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm text-gray-800 font-medium">
                        {category.subcategories?.slice(0, 2).join(', ')}
                        {category.subcategories && category.subcategories.length > 2 && '...'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`font-bold ${
                        isSelected 
                          ? `${category.color} text-white` 
                          : 'bg-gray-300 text-gray-900'
                      }`}
                    >
                      {category.count}
                    </Badge>
                    {category.slug && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* View All Categories Link - FIXED FUNCTIONALITY */}
          <div className="mt-4 pt-4 border-t border-gray-400">
            <button
              onClick={() => router.push('/marketplace/categories')}
              className="flex items-center justify-center gap-2 w-full text-blue-700 hover:text-blue-900 font-semibold text-sm hover:underline py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View all categories
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price Range - DARKER BACKGROUND */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-700 rounded-full"></div>
            Price Range
          </h4>
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
              <div className="text-sm text-gray-800 font-medium mt-1">
                Set your budget range
              </div>
            </div>
            
            <div className="relative pt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              </div>
              
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                className="absolute w-full h-2 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-700 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                className="absolute w-full h-2 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-700 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
              />
            </div>
            
            <div className="flex justify-between text-sm font-bold text-gray-900 px-1">
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mb-1"></div>
                $0
              </span>
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full mb-1"></div>
                $500
              </span>
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mb-1"></div>
                $1000+
              </span>
            </div>
          </div>
        </div>

        {/* Minimum Rating - DARKER BACKGROUND */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
            Minimum Rating
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-400">
            <div className="flex flex-wrap gap-3">
              {[4, 3, 2, 1].map((rating) => {
                const isSelected = minRating === rating;
                return (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(isSelected ? null : rating)}
                    className={`flex flex-col items-center px-4 py-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-gradient-to-b from-amber-200 to-amber-300 shadow-sm'
                        : 'border-gray-400 hover:border-amber-500 hover:bg-amber-100'
                    }`}
                  >
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < rating 
                              ? isSelected 
                                ? 'fill-amber-700 text-amber-700' 
                                : 'fill-amber-500 text-amber-500'
                              : 'fill-gray-400 text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-bold ${
                      isSelected ? 'text-amber-900' : 'text-gray-800'
                    }`}>
                      {rating}+ stars
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => handleRatingChange(null)}
                className={`flex flex-col items-center px-4 py-3 rounded-xl border font-bold transition-colors ${
                  minRating === null
                    ? 'border-gray-500 bg-gray-300 text-gray-900 shadow-sm'
                    : 'border-gray-400 hover:border-gray-500 hover:bg-gray-200'
                }`}
              >
                <div className="text-gray-600 mb-1">★ ★ ★ ★ ★</div>
                <span>Any rating</span>
              </button>
            </div>
          </div>
        </div>

        {/* Materials - DARKER BACKGROUND */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
            Materials
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-400">
            <div className="flex flex-wrap gap-2">
              {materials.map((material) => {
                const isSelected = selectedMaterials.includes(material.name);
                return (
                  <Badge
                    key={material.name}
                    variant="outline"
                    className={`cursor-pointer transition-all font-bold px-3 py-2 rounded-lg ${
                      isSelected
                        ? `${material.color} ${material.textColor} ${material.borderColor || 'border-current'} shadow-md`
                        : 'bg-gray-100 text-gray-900 border-gray-400 hover:border-gray-500 hover:shadow-sm'
                    }`}
                    onClick={() => handleMaterialToggle(material.name)}
                  >
                    {material.name}
                    {isSelected && (
                      <X className="w-3 h-3 ml-1.5" />
                    )}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* Artisan Locations - DARKER BACKGROUND */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            Artisan Locations
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-400 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {locations.map((location) => {
                const isSelected = selectedLocations.includes(location);
                return (
                  <div key={location} className="flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                    </div>
                    <input
                      type="checkbox"
                      id={`location-${location}`}
                      checked={isSelected}
                      onChange={() => handleLocationToggle(location)}
                      className="h-5 w-5 rounded border-2 border-gray-500 checked:border-blue-700 checked:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    />
                    <label
                      htmlFor={`location-${location}`}
                      className={`ml-3 text-sm font-bold flex-1 ${
                        isSelected ? 'text-blue-900' : 'text-gray-900'
                      }`}
                    >
                      {location}
                    </label>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="pt-6 border-t border-gray-400">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-700 rounded-full"></div>
              Active Filters ({activeFilterCount})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories
                .filter(c => c !== 'all')
                .map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return category ? (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="gap-2 px-3 py-2 bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 border border-blue-500 hover:from-blue-300 hover:to-blue-400 cursor-pointer font-bold"
                      onClick={(e) => handleCategoryToggle(category.id, category.slug, e)}
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      {category.name}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ) : null;
                })}
              
              {minRating !== null && (
                <Badge 
                  variant="secondary" 
                  className="gap-2 px-3 py-2 bg-gradient-to-r from-amber-200 to-amber-300 text-amber-900 border border-amber-500 hover:from-amber-300 hover:to-amber-400 cursor-pointer font-bold"
                  onClick={() => handleRatingChange(null)}
                >
                  <Star className="w-3 h-3 fill-amber-700 text-amber-700" />
                  Rating: {minRating}+ stars
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}

              {selectedMaterials.map(material => {
                const materialData = materials.find(m => m.name === material);
                return (
                  <Badge 
                    key={material} 
                    variant="secondary" 
                    className={`gap-2 px-3 py-2 ${materialData?.color || 'bg-gray-300'} ${materialData?.textColor || 'text-gray-900'} border ${materialData?.borderColor || 'border-gray-500'} hover:opacity-90 cursor-pointer font-bold`}
                    onClick={() => handleMaterialToggle(material)}
                  >
                    {material}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                );
              })}

              {selectedLocations.map(location => (
                <Badge 
                  key={location} 
                  variant="secondary" 
                  className="gap-2 px-3 py-2 bg-gradient-to-r from-red-200 to-red-300 text-red-900 border border-red-500 hover:from-red-300 hover:to-red-400 cursor-pointer font-bold"
                  onClick={() => handleLocationToggle(location)}
                >
                  <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                  {location}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge 
                  variant="secondary" 
                  className="gap-2 px-3 py-2 bg-gradient-to-r from-green-200 to-green-300 text-green-900 border border-green-500 hover:from-green-300 hover:to-green-400 cursor-pointer font-bold"
                  onClick={() => handlePriceChange(0, 1000)}
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-600 to-yellow-600"></div>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}