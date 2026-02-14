"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid3x3, LayoutList, ChevronDown } from "lucide-react";

// Components
import dynamic from "next/dynamic";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dynamic imports for better performance
const ProductGrid = dynamic(() => import("@/components/marketplace/ProductGrid"), {
  loading: () => <div className="h-96 flex items-center justify-center">Loading products...</div>
});

const ProductFilters = dynamic(() => import("@/components/marketplace/ProductFilters"), {
  loading: () => <div className="h-96 flex items-center justify-center">Loading filters...</div>
});

const SortDropdown = dynamic(() => import("@/components/marketplace/SortDropdown"), {
  loading: () => <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
});

const CollectionSpotlight = dynamic(() => import("@/components/marketplace/CollectionSpotlight"), {
  loading: () => <div className="h-80 bg-gray-200 animate-pulse rounded-xl"></div>
});

const FeaturedArtisans = dynamic(() => import("@/components/marketplace/FeaturedArtisans"), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
});

// Types
import type { Product, FilterState } from "@/types/marketplace";
import type { SortOption } from "@/components/marketplace/SortDropdown";

// Simple adapter function - using object lookup to avoid TypeScript switch checking
const adaptSortOption = (sortBy: SortOption): FilterState['sortBy'] => {
  // Use a lookup object with string keys
  const sortMap: { [key: string]: FilterState['sortBy'] } = {
    'featured': 'featured',
    'newest': 'newest',
    'price-low': 'price-low',
    'price-high': 'price-high',
    'rating': 'rating',
    'bestsellers': 'bestsellers',
    'popularity': 'featured'
  };
  
  return sortMap[sortBy] || 'featured';
};

// Mock data for initial render - with ALL required Product properties
const mockProducts: Product[] = [
  {
    id: 1,
    slug: "handwoven-ceramic-vase",
    name: "Handwoven Ceramic Vase",
    description: "Beautiful handwoven ceramic vase with intricate patterns. Perfect for displaying your favorite flowers or as a standalone decorative piece.",
    shortDescription: "Handcrafted ceramic vase with unique patterns",
    artisanId: 101,
    artisanName: "Elena Pottery",
    artisanSlug: "elena-pottery",
    currentPrice: 89.99,
    originalPrice: 105.99,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5dd43?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Pottery",
    subcategory: "Vases",
    tags: ["handmade", "ceramic"],
    materials: ["Clay", "Glaze"],
    stock: 15,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    shipping: {
      isFreeShipping: true,
      estimatedDays: 3,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    slug: "solid-oak-cutting-board",
    name: "Solid Oak Cutting Board",
    description: "Premium solid oak cutting board with elegant design. Perfect for food preparation and serving.",
    shortDescription: "Handcrafted oak cutting board",
    artisanId: 102,
    artisanName: "Woodcraft by John",
    artisanSlug: "woodcraft-by-john",
    currentPrice: 65.50,
    originalPrice: 75.00,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Woodwork",
    subcategory: "Kitchen",
    tags: ["handmade", "kitchen", "oak"],
    materials: ["Oak", "Mineral Oil"],
    stock: 8,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    shipping: {
      isFreeShipping: true,
      estimatedDays: 4,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: 3,
    slug: "silver-leaf-earrings",
    name: "Silver Leaf Earrings",
    description: "Elegant silver leaf earrings handcrafted with attention to detail. Lightweight and comfortable for daily wear.",
    shortDescription: "Handmade silver leaf earrings",
    artisanId: 103,
    artisanName: "Sophia's Jewels",
    artisanSlug: "sophias-jewels",
    currentPrice: 45.00,
    originalPrice: 50.00,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Jewelry",
    subcategory: "Earrings",
    tags: ["handmade", "silver", "leaf"],
    materials: ["Silver", "Gemstone"],
    stock: 25,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    shipping: {
      isFreeShipping: false,
      estimatedDays: 5,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20"
  },
  {
    id: 4,
    slug: "wool-blend-throw-blanket",
    name: "Wool Blend Throw Blanket",
    description: "Cozy and warm wool blend throw blanket. Perfect for chilly evenings and adding texture to your home decor.",
    shortDescription: "Handwoven wool blend blanket",
    artisanId: 104,
    artisanName: "Cozy Knits",
    artisanSlug: "cozy-knits",
    currentPrice: 120.00,
    originalPrice: 150.00,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1580309137424-8f1f3e20cc2d?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Textiles",
    subcategory: "Blankets",
    tags: ["handmade", "wool", "blanket"],
    materials: ["Wool", "Cotton"],
    stock: 5,
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    shipping: {
      isFreeShipping: true,
      estimatedDays: 6,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: 5,
    slug: "stoneware-coffee-mug",
    name: "Stoneware Coffee Mug",
    description: "Beautiful stoneware coffee mug with comfortable handle. Perfect for your morning coffee or tea.",
    shortDescription: "Handmade ceramic coffee mug",
    artisanId: 101,
    artisanName: "Elena Pottery",
    artisanSlug: "elena-pottery",
    currentPrice: 28.50,
    originalPrice: 35.00,
    discountPercentage: 19,
    rating: 4.8,
    reviewCount: 103,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Pottery",
    subcategory: "Mugs",
    tags: ["handmade", "ceramic", "mug"],
    materials: ["Clay", "Glaze"],
    stock: 30,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    shipping: {
      isFreeShipping: true,
      estimatedDays: 3,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12"
  },
  {
    id: 6,
    slug: "leather-journal",
    name: "Leather Journal",
    description: "Handcrafted leather journal with premium paper. Perfect for writing, sketching, or as a unique gift.",
    shortDescription: "Genuine leather journal",
    artisanId: 105,
    artisanName: "Bound Creations",
    artisanSlug: "bound-creations",
    currentPrice: 35.00,
    originalPrice: 45.00,
    discountPercentage: 22,
    rating: 4.5,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=500&fit=crop",
    galleryImages: [],
    category: "Paper Crafts",
    subcategory: "Journals",
    tags: ["handmade", "leather", "journal"],
    materials: ["Leather", "Paper"],
    stock: 12,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    shipping: {
      isFreeShipping: false,
      estimatedDays: 4,
      locations: ["Worldwide"]
    },
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18"
  }
];

// Available categories for filters
const availableCategories = [
  { id: "pottery", name: "Pottery", count: 48, icon: "🏺", color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50", textColor: "text-orange-800" },
  { id: "woodwork", name: "Woodwork", count: 62, icon: "🪵", color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50", textColor: "text-emerald-800" },
  { id: "jewelry", name: "Jewelry", count: 72, icon: "💍", color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50", textColor: "text-blue-800" },
  { id: "textiles", name: "Textiles", count: 45, icon: "🧵", color: "from-pink-500 to-rose-500", bgColor: "bg-pink-50", textColor: "text-pink-800" },
  { id: "paper", name: "Paper Crafts", count: 28, icon: "📜", color: "from-yellow-600 to-amber-600", bgColor: "bg-amber-50", textColor: "text-amber-800" }
];

const availableMaterials = ["Clay", "Wood", "Metal", "Glass", "Fabric", "Leather", "Stone", "Paper"];
const availableLocations = ["North America", "Europe", "Asia", "Africa", "South America"];

export default function MarketplaceContent() {
  const searchParams = useSearchParams();
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Store search query separately since it's not in FilterState
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get("category") ? [searchParams.get("category")!] : [],
    priceRange: [0, 500],
    minRating: null,
    materials: [],
    artisanLocations: [],
    sortBy: "featured",
    inStockOnly: false,
    onSaleOnly: false
  });

  // Apply filters and sorting
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = [...products];

      // Apply category filter
      if (filters.categories.length > 0) {
        filtered = filtered.filter(p => 
          filters.categories.some(cat => 
            p.category.toLowerCase().includes(cat.toLowerCase())
          )
        );
      }

      // Apply price range filter
      filtered = filtered.filter(p => 
        p.currentPrice >= filters.priceRange[0] && p.currentPrice <= filters.priceRange[1]
      );

      // Apply rating filter
      if (filters.minRating) {
        filtered = filtered.filter(p => p.rating >= filters.minRating!);
      }

      // Apply materials filter
      if (filters.materials.length > 0) {
        filtered = filtered.filter(p => 
          p.materials?.some(m => filters.materials.includes(m))
        );
      }

      // Apply stock filter
      if (filters.inStockOnly) {
        filtered = filtered.filter(p => p.stock > 0);
      }

      // Apply sale filter
      if (filters.onSaleOnly) {
        filtered = filtered.filter(p => (p.discountPercentage || 0) > 0);
      }

      // Apply search filter (using separate searchQuery state)
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.artisanName.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case "price-high":
          filtered.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "bestsellers":
          filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
        default:
          // featured - keep original order
          filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, products, searchQuery]);

  const handleFilterChange = (newFilters: FilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, sortBy: adaptSortOption(sortBy) }));
  };

  const handleSearchChange = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
    // Implement actual add to cart functionality here
  };

  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product);
    // Implement quick view functionality here
  };

  const handleAddToWishlist = (product: Product) => {
    console.log("Add to wishlist:", product);
    // Implement wishlist functionality here
  };

  const clearFilters = () => {
    setIsLoading(true);
    setFilters({
      categories: [],
      priceRange: [0, 500],
      minRating: null,
      materials: [],
      artisanLocations: [],
      sortBy: "featured",
      inStockOnly: false,
      onSaleOnly: false
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-80 bg-gradient-to-r from-primary/90 to-secondary/90">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&h=400&fit=crop")',
            mixBlendMode: "overlay"
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Handcrafted Marketplace</h1>
          <p className="text-xl max-w-2xl">
            Discover unique handmade items from talented artisans around the world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products, artisans, or categories..."
              className="w-full px-6 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-lg"
            />
          </div>
        </div>

        {/* Collection Spotlight */}
        <CollectionSpotlight />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters 
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                availableCategories={availableCategories}
                availableMaterials={availableMaterials}
                availableLocations={availableLocations}
              />

              {/* Clear All Filters Button */}
              {(filters.categories.length > 0 || 
                filters.materials.length > 0 || 
                filters.artisanLocations.length > 0 || 
                filters.minRating !== null || 
                filters.inStockOnly || 
                filters.onSaleOnly ||
                filters.priceRange[0] > 0 || 
                filters.priceRange[1] < 500 ||
                searchQuery) && (
                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <Button 
                    variant='outline' 
                    onClick={clearFilters} 
                    className='w-full text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300'
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {(filters.categories.length > 0 || 
                filters.materials.length > 0 || 
                filters.artisanLocations.length > 0 || 
                filters.minRating !== null || 
                filters.inStockOnly || 
                filters.onSaleOnly ||
                filters.priceRange[0] > 0 || 
                filters.priceRange[1] < 500) && (
                <Badge variant="secondary" className="ml-2">
                  {[
                    filters.categories.length,
                    filters.materials.length,
                    filters.artisanLocations.length,
                    filters.minRating ? 1 : 0,
                    filters.inStockOnly ? 1 : 0,
                    filters.onSaleOnly ? 1 : 0,
                    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
                {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
              </p>
              <div className="hidden lg:flex items-center gap-4">
                <SortDropdown 
                  value={filters.sortBy}
                  onChange={handleSortChange}
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid 
              products={filteredProducts} 
              loading={isLoading}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />

            {/* Featured Artisans */}
            <div className="mt-16">
              <FeaturedArtisans />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileFilterOpen(false)}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <ProductFilters 
                onFilterChange={(newFilters) => {
                  handleFilterChange(newFilters);
                  setIsMobileFilterOpen(false);
                }}
                initialFilters={filters}
                availableCategories={availableCategories}
                availableMaterials={availableMaterials}
                availableLocations={availableLocations}
                mobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}