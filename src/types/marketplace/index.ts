export interface Product {
  id: number;
  slug?: string;
  name: string;
  description?: string;
  shortDescription?: string;
  artisanId?: number;
  artisanName: string;
  artisanSlug?: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages?: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  materials?: string[];
  stock: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  shipping?: {
    isFreeShipping?: boolean;
    estimatedDays?: number;
    locations?: string[];
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
  search?: string;
  inStock?: boolean;
}
