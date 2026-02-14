export interface Product {
  id: number
  name: string
  description: string
  shortDescription?: string
  price: number
  artisanId: number
  artisanName: string
  artisanSlug?: string  // Add this
  category: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  createdAt: string
  slug?: string
  currentPrice?: number
  materials?: string[]
  stock?: number
  discountPercentage?: number
  tags?: string[]
  isBestSeller?: boolean
  isFeatured?: boolean
}

export interface Artisan {
  id: number
  name: string
  avatar: string
  bio: string
  location: string
  products: number
  rating: number
  joinDate: string
  slug?: string
}

export interface Collection {
  id: number
  name: string
  description: string
  image: string
  productCount: number
  curator: string
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating' | 'featured' | 'bestsellers'

export interface ProductFilters {
  category?: string
  priceRange?: [number, number]
  artisan?: string
  inStock?: boolean
  minRating?: number
  search?: string
  sortBy?: SortOption
  materials?: string[]
  artisanLocations?: string[]
  inStockOnly?: boolean
  onSaleOnly?: boolean
  categories?: string[]
}

export interface FilterState {
  category: string
  categories: string[]
  priceRange: [number, number]
  artisan: string
  inStock: boolean
  minRating: number | null  // Allow null
  search: string
  sortBy: SortOption
  materials: string[]
  artisanLocations: string[]
  inStockOnly: boolean
  onSaleOnly: boolean
}

// Default filter state
export const defaultFilterState: FilterState = {
  category: 'all',
  categories: [],
  priceRange: [0, 1000],
  artisan: 'all',
  inStock: false,
  minRating: null,
  search: '',
  sortBy: 'featured',
  materials: [],
  artisanLocations: [],
  inStockOnly: false,
  onSaleOnly: false
};
