export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  subcategory: string;
  artisanId: number;
  artisanName: string;
  artisanSlug: string;
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  tags: string[];
  materials: string[];
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    unit?: string;
  };
  shipping: {
    isFreeShipping: boolean;
    estimatedDays: number;
    locations: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Artisan {
  id: number;
  slug: string;
  name: string;
  bio: string;
  fullBio: string;
  specialty: string;
  location: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  avatarUrl: string;
  coverImageUrl: string;
  galleryImages: string[];
  isVerified: boolean;
  isFeatured: boolean;
  badges: string[];
  materials: string[];
  techniques: string[];
  story: string;
  awards?: Array<{
    name: string;
    year: number;
    organization: string;
  }>;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  joinedDate: string;
  lastActive: string;
}

export interface Collection {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  featuredImage: string;
  secondaryImage: string;
  productCount: number;
  artisanCount: number;
  rating: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isTrending: boolean;
  discountPercentage?: number;
  tags: string[];
  featuredProducts: Array<{
    id: number;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
    artisanName: string;
    artisanSlug: string;
  }>;
  curator?: {
    name: string;
    title: string;
    avatarUrl: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  productCount: number;
  subcategories: Array<{
    id: string;
    name: string;
    slug: string;
    productCount: number;
  }>;
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
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface MarketplaceStats {
  totalProducts: number;
  totalArtisans: number;
  totalCountries: number;
  totalSales: number;
  averageRating: number;
  featuredCount: number;
}
