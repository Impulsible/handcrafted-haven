export interface Product {
  id: number;
  name: string;
  artisanName: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  subcategory?: string;
  tags: string[];
  stock: number;
  inStock?: boolean;
  fastDelivery?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  description?: string;
  shortDescription?: string;
  artisanId?: number;
  artisanSlug?: string;
  materials?: string[];
  shipping?: {
    isFreeShipping: boolean;
    estimatedDays: number;
    locations: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number | null;
  materials: string[];
  artisanLocations: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestsellers';
  inStockOnly: boolean;
  onSaleOnly: boolean;
  category?: string;
  artisan?: string;
  inStock?: boolean;
  fastDelivery?: boolean;
  search?: string;
  tags?: string[];
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestsellers';

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  emptyMessage?: React.ReactNode;
}

export interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
  availableCategories: Array<{ id: string; name: string; count: number; icon?: string }>;
  availableMaterials: string[];
  availableLocations: string[];
  mobile?: boolean;
}
