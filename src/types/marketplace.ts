export interface Product {
  id: number
  slug: string
  name: string
  description: string
  shortDescription: string
  currentPrice: number
  originalPrice: number
  discountPercentage: number
  category: string
  subcategory: string
  image: string
  images?: string[]
  galleryImages?: string[]
  rating: number
  reviewCount: number
  stock: number
  isNew?: boolean
  isBestSeller?: boolean
  isFeatured?: boolean
  tags: string[]
  materials?: string[]
  shipping?: {
    isFreeShipping: boolean
    estimatedDays: number
    locations: string[]
  }
  artisanId: number | string
  artisanName: string
  artisanSlug?: string
  artisanAvatar?: string
  artisanLocation?: string
  inStock?: boolean
  stockQuantity?: number
  isOnSale?: boolean
  dimensions?: string
  weight?: string
  createdAt: string
  updatedAt: string
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  minRating: number | null
  materials: string[]
  artisanLocations: string[]
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestsellers'
  inStockOnly: boolean
  onSaleOnly: boolean
}

