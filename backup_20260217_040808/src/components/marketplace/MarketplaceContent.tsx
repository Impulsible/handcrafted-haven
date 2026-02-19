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

// Mock data for initial render - with ALL required Product properties
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Handwoven Ceramic Vase",
    description: "Beautiful handwoven ceramic vase with intricate patterns. Perfect for displaying your favorite flowers or as a standalone decorative piece.",
    shortDescription: "Handcrafted ceramic vase with unique patterns",
    price: 89.99,
    artisanId: 101,
    artisanName: "Elena Pottery",
    category: "Pottery",
    images: ["https://images.unsplash.com/photo-1612196808214-b7e239e5dd43?w=500&h=500&fit=crop"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    createdAt: "2024-01-15",
    currentPrice: 89.99,
    materials: ["Clay", "Glaze"],
    stock: 15,
    discountPercentage: 0,
    tags: ["handmade", "ceramic"],
    isBestSeller: false,
    isFeatured: true,
    artisanSlug: "elena-pottery"
  },
  {
    id: 2,
    name: "Solid Oak Cutting Board",
    description: "Premium solid oak cutting board with elegant design. Perfect for food preparation and serving.",
    shortDescription: "Handcrafted oak cutting board",
    price: 65.50,
    artisanId: 102,
    artisanName: "Woodcraft by John",
    category: "Woodwork",
    images: ["https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&h=500&fit=crop"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    createdAt: "2024-01-10",
    currentPrice: 65.50,
    materials: ["Oak", "Mineral Oil"],
    stock: 8,
    discountPercentage: 0,
    tags: ["handmade", "kitchen", "oak"],
    isBestSeller: true,
    isFeatured: true,
    artisanSlug: "woodcraft-by-john"
  },
  {
    id: 3,
    name: "Silver Leaf Earrings",
    description: "Elegant silver leaf earrings handcrafted with attention to detail. Lightweight and comfortable for daily wear.",
    shortDescription: "Handmade silver leaf earrings",
    price: 45.00,
    artisanId: 103,
    artisanName: "Sophia's Jewels",
    category: "Jewelry",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop"],
    rating: 4.7,
    reviews: 56,
    inStock: true,
    createdAt: "2024-01-20",
    currentPrice: 45.00,
    materials: ["Silver", "Gemstone"],
    stock: 25,
    discountPercentage: 0,
    tags: ["handmade", "silver", "leaf"],
    isBestSeller: false,
    isFeatured: true,
    artisanSlug: "sophias-jewels"
  },
  {
    id: 4,
    name: "Wool Blend Throw Blanket",
    description: "Cozy and warm wool blend throw blanket. Perfect for chilly evenings and adding texture to your home decor.",
    shortDescription: "Handwoven wool blend blanket",
    price: 120.00,
    artisanId: 104,
    artisanName: "Cozy Knits",
    category: "Textiles",
    images: ["https://images.unsplash.com/photo-1580309137424-8f1f3e20cc2d?w=500&h=500&fit=crop"],
    rating: 4.6,
    reviews: 42,
    inStock: true,
    createdAt: "2024-01-05",
    currentPrice: 120.00,
    materials: ["Wool", "Cotton"],
    stock: 5,
    discountPercentage: 0,
    tags: ["handmade", "wool", "blanket"],
    isBestSeller: false,
    isFeatured: false,
    artisanSlug: "cozy-knits"
  },
  {
    id: 5,
    name: "Stoneware Coffee Mug",
    description: "Beautiful stoneware coffee mug with comfortable handle. Perfect for your morning coffee or tea.",
    shortDescription: "Handmade ceramic coffee mug",
    price: 28.50,
    artisanId: 101,
    artisanName: "Elena Pottery",
    category: "Pottery",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop"],
    rating: 4.8,
    reviews: 103,
    inStock: true,
    createdAt: "2024-01-12",
    currentPrice: 28.50,
    materials: ["Clay", "Glaze"],
    stock: 30,
    discountPercentage: 0,
    tags: ["handmade", "ceramic", "mug"],
    isBestSeller: true,
    isFeatured: false,
    artisanSlug: "elena-pottery"
  },
  {
    id: 6,
    name: "Leather Journal",
    description: "Handcrafted leather journal with premium paper. Perfect for writing, sketching, or as a unique gift.",
    shortDescription: "Genuine leather journal",
    price: 35.00,
    artisanId: 105,
    artisanName: "Bound Creations",
    category: "Paper Crafts",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=500&fit=crop"],
    rating: 4.5,
    reviews: 28,
    inStock: true,
    createdAt: "2024-01-18",
    currentPrice: 35.00,
    materials: ["Leather", "Paper"],
    stock: 12,
    discountPercentage: 0,
    tags: ["handmade", "leather", "journal"],
    isBestSeller: false,
    isFeatured: false,
    artisanSlug: "bound-creations"
  }
];

// Available categories for filters
const availableCategories = [
  { id: "pottery", name: "Pottery", count: 48, icon: "🏺" },
  { id: "woodwork", name: "Woodwork", count: 62, icon: "🪵" },
  { id: "jewelry", name: "Jewelry", count: 72, icon: "💍" },
  { id: "textiles", name: "Textiles", count: 45, icon: "🧵" },
  { id: "paper", name: "Paper Crafts", count: 28, icon: "📜" }
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
  
  // Store search query separately
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    minRating: null,
    materials: [],
    artisanLocations: [],
    sortBy: "featured",
    inStockOnly: false,
    onSaleOnly: false,
    category: "",
    artisan: "",
    inStock: false,
    search: ""
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
        (p.currentPrice ?? p.price) >= filters.priceRange[0] && 
        (p.currentPrice ?? p.price) <= filters.priceRange[1]
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
        filtered = filtered.filter(p => (p.stock ?? 0) > 0);
      }

      // Apply sale filter
      if (filters.onSaleOnly) {
        filtered = filtered.filter(p => (p.discountPercentage ?? 0) > 0);
      }

      // Apply search filter
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
          filtered.sort((a, b) => (a.currentPrice ?? a.price) - (b.currentPrice ?? b.price));
          break;
        case "price-high":
          filtered.sort((a, b) => (b.currentPrice ?? b.price) - (a.currentPrice ?? a.price));
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

  const handleSortChange = (sortBy: string) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, sortBy: sortBy as FilterState['sortBy'] }));
  };

  const handleSearchChange = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product);
  };

  const handleAddToWishlist = (product: Product) => {
    console.log("Add to wishlist:", product);
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
      onSaleOnly: false,
      category: "",
      artisan: "",
      inStock: false,
      search: ""
    });
    setSearchQuery("");
  };

  // Count active filters
  const activeFilterCount = 
    filters.categories.length +
    filters.materials.length +
    filters.artisanLocations.length +
    (filters.minRating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-primary/90 to-secondary/90">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&h=400&fit=crop")'
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
              {activeFilterCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="w-full text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300"
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
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
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
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}