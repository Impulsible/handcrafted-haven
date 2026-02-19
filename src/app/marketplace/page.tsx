"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Grid3x3, 
  List, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Star,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  Users,
  Package,
  DollarSign,
  Globe,
  RefreshCw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

// Live Market Stats Component with Persistence
const MarketStats = () => {
  // Initialize stats from localStorage or with default values
  const [stats, setStats] = useState(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('marketStats');
      if (savedStats) {
        try {
          const parsed = JSON.parse(savedStats);
          // Convert lastUpdated string back to Date object
          return {
            ...parsed,
            lastUpdated: new Date(parsed.lastUpdated)
          };
        } catch (e) {
          console.error('Failed to parse saved stats', e);
        }
      }
    }
    // Default values
    return {
      activeArtisans: 245,
      totalProducts: 1523,
      avgOrderValue: 89,
      countriesServed: 34,
      lastUpdated: new Date()
    };
  });
  
  const [timeUntilUpdate, setTimeUntilUpdate] = useState(() => {
    // Calculate time until next update based on last updated time
    if (typeof window !== 'undefined') {
      const lastUpdateTime = stats.lastUpdated.getTime();
      const now = new Date().getTime();
      const elapsedSeconds = Math.floor((now - lastUpdateTime) / 1000);
      const remainingSeconds = Math.max(0, (60 * 60) - elapsedSeconds); // 60 minutes - elapsed time
      return remainingSeconds;
    }
    return 60 * 60; // Default 60 minutes
  });
  
  const [isUpdating, setIsUpdating] = useState(false);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('marketStats', JSON.stringify(stats));
    }
  }, [stats]);

  // Simulate live data updates every 60 minutes
  useEffect(() => {
    const updateStats = () => {
      setIsUpdating(true);
      
      // Simulate fetching new data
      setTimeout(() => {
        const newStats = {
          activeArtisans: Math.floor(Math.random() * 50) + 220,
          totalProducts: Math.floor(Math.random() * 200) + 1400,
          avgOrderValue: Math.floor(Math.random() * 30) + 75,
          countriesServed: Math.floor(Math.random() * 10) + 30,
          lastUpdated: new Date()
        };
        
        setStats(newStats);
        setIsUpdating(false);
        setTimeUntilUpdate(60 * 60); // Reset to 60 minutes
      }, 1000);
    };

    const timer = setInterval(() => {
      setTimeUntilUpdate((prev) => {
        if (prev <= 1) {
          updateStats();
          return 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time until next update
  const formatTimeUntil = () => {
    const hours = Math.floor(timeUntilUpdate / 3600);
    const minutes = Math.floor((timeUntilUpdate % 3600) / 60);
    const seconds = timeUntilUpdate % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    setIsUpdating(true);
    
    // Simulate fetching new data
    setTimeout(() => {
      const newStats = {
        activeArtisans: Math.floor(Math.random() * 50) + 220,
        totalProducts: Math.floor(Math.random() * 200) + 1400,
        avgOrderValue: Math.floor(Math.random() * 30) + 75,
        countriesServed: Math.floor(Math.random() * 10) + 30,
        lastUpdated: new Date()
      };
      
      setStats(newStats);
      setIsUpdating(false);
      setTimeUntilUpdate(60 * 60); // Reset to 60 minutes
    }, 1000);
  };

  const statItems = [
    { 
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />, 
      label: "Active Artisans", 
      value: stats.activeArtisans,
      change: "+12%",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Package className="h-5 w-5 sm:h-6 sm:w-6" />, 
      label: "Total Products", 
      value: stats.totalProducts,
      change: "+8%",
      color: "from-emerald-500 to-teal-500"
    },
    { 
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />, 
      label: "Avg. Order Value", 
      value: `$${stats.avgOrderValue}`,
      change: "+5%",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />, 
      label: "Countries Served", 
      value: stats.countriesServed,
      change: "+3",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-4 sm:p-6 border border-primary/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-heading font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Live Market Stats
          </h2>
          <button
            onClick={handleManualRefresh}
            disabled={isUpdating}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50"
            title="Refresh stats now"
          >
            <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>Updates in {formatTimeUntil()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-card rounded-xl p-3 sm:p-4 border border-primary/10 overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 text-primary`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {item.change}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-center text-muted-foreground">
        Last updated: {stats.lastUpdated.toLocaleTimeString()} • Stats persist across page reloads
      </div>
    </div>
  );
};

// Hero Carousel Component (Full Screen)
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: "Handcrafted with Passion",
      subtitle: "Discover unique pieces from master artisans around the world",
      image: "https://images.unsplash.com/photo-1578749559196-482c53fba63b?w=1200&h=600&fit=crop",
      cta: "Shop Now",
      link: "/marketplace",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      id: 2,
      title: "Sustainable Craftsmanship",
      subtitle: "Eco-friendly materials and traditional techniques meet modern design",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=600&fit=crop",
      cta: "Explore",
      link: "/categories/woodwork",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      id: 3,
      title: "Artisan Jewelry Collection",
      subtitle: "Handcrafted pieces that tell a story, each one unique",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop",
      cta: "Discover",
      link: "/categories/jewelry",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      id: 4,
      title: "Timeless Pottery",
      subtitle: "Ancient techniques reimagined for modern living",
      image: "https://images.unsplash.com/photo-1580309137429-bc160a2bded5?w=1200&h=600&fit=crop",
      cta: "View Collection",
      link: "/categories/pottery",
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] w-full overflow-hidden rounded-2xl">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply" />
          </div>
          
          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm font-medium">Artisan Marketplace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-lg">
                {slide.subtitle}
              </p>
              <Link href={slide.link}>
                <Button className="bg-white text-primary hover:bg-white/90 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg group">
                  {slide.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Category Carousel Component
const CategoryCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  const nextCategories = () => {
    setStartIndex((prev) => Math.min(prev + 1, categories.length - itemsPerPage));
  };

  const prevCategories = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-heading font-bold">
          Shop by <span className="text-gradient">Category</span>
        </h2>
        <Link href="/categories" className="text-primary hover:underline text-sm sm:text-base flex items-center group">
          View All
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative">
        {/* Categories Grid/Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(startIndex, startIndex + 6).map((category) => (
            <Link
              key={category.id}
              href={`/marketplace?category=${category.slug}`}
              className="group relative bg-card border border-primary/10 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`aspect-square ${category.color} bg-opacity-10 flex flex-col items-center justify-center p-4`}>
                <span className="text-3xl sm:text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <h3 className="text-xs sm:text-sm font-medium text-center line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{category.count} items</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        {startIndex > 0 && (
          <button
            onClick={prevCategories}
            className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex p-2 rounded-full bg-background border border-primary/20 shadow-lg hover:bg-primary/5 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {startIndex + 6 < categories.length && (
          <button
            onClick={nextCategories}
            className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex p-2 rounded-full bg-background border border-primary/20 shadow-lg hover:bg-primary/5 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// Quick Filter Row
const QuickFilters = ({ currentFilter, onFilterChange }: { currentFilter: string, onFilterChange: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Products', icon: <Package className="h-4 w-4" /> },
    { id: 'featured', label: 'Featured', icon: <Award className="h-4 w-4" /> },
    { id: 'best-sellers', label: 'Best Sellers', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'new-arrivals', label: 'New Arrivals', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'on-sale', label: 'On Sale', icon: <Clock className="h-4 w-4" /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentFilter === filter.id
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
              : 'bg-card border border-primary/10 text-muted-foreground hover:bg-primary/5 hover:text-primary'
          }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-primary/10 bg-card hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-4 py-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 rounded-lg transition-all ${
              currentPage === page
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-110'
                : 'border border-primary/10 bg-card hover:bg-primary/5'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-primary/10 bg-card hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    // Initialize with category from URL if present
    const categorySlug = searchParams.get('category');
    return categorySlug ? [categorySlug] : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Get filtered products based on all criteria
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply quick filter
    switch (activeFilter) {
      case 'featured':
        filtered = filtered.filter(p => p.featured);
        break;
      case 'best-sellers':
        filtered = filtered.filter(p => p.bestSeller);
        break;
      case 'new-arrivals':
        filtered = filtered.filter(p => p.newArrival);
        break;
      case 'on-sale':
        filtered = filtered.filter(p => p.onSale);
        break;
      default:
        // all products - no filter
        break;
    }

    // Apply category filter from URL or sidebar
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      filtered = filtered.filter(p => p.categorySlug === categorySlug);
    } else if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.categorySlug));
    }

    // Apply price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  
  // Pagination settings - 3 pages with different items per page
  const getItemsPerPage = (page: number) => {
    if (page === 1) return 9;  // Page 1: 9 products
    if (page === 2) return 11; // Page 2: 11 products
    return 10; // Page 3: 10 products
  };

  const itemsPerPage = getItemsPerPage(currentPage);
  
  // Calculate total pages based on filtered products count
  const totalPages = Math.ceil(filteredProducts.length / 10); // Using 10 as base for calculation

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortBy("featured");
    setActiveFilter('all');
    setCurrentPage(1);
  };

  const currentItems = getCurrentPageItems();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Carousel - Full Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
        <HeroCarousel />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Live Market Stats with Persistence */}
        <div className="mb-8 sm:mb-12">
          <MarketStats />
        </div>

        {/* Category Carousel */}
        <div className="mb-8 sm:mb-12">
          <CategoryCarousel />
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <QuickFilters currentFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>

        {/* Marketplace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
              Artisan <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {filteredProducts.length} unique handmade items
              {currentPage > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
          </div>

          {/* View Toggle and Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-card border border-primary/10 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5"
            >
              <Filter className="h-5 w-5" />
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`
            lg:w-72 xl:w-80 shrink-0
            ${isFilterOpen ? 'block' : 'hidden lg:block'}
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            bg-background lg:bg-transparent
            p-4 lg:p-0
            overflow-y-auto lg:overflow-visible
          `}>
            {/* Mobile Close Button */}
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-lg hover:bg-primary/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-card border border-primary/10 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </h2>
                {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500 || activeFilter !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={() => toggleCategory(category.slug)}
                          className="rounded border-primary/30 text-primary focus:ring-primary/30"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      min="0"
                      max={priceRange[1]}
                      className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      min={priceRange[0]}
                      max="500"
                      className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* In Stock Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-primary/30 text-primary focus:ring-primary/30" />
                  <span className="text-sm text-muted-foreground">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500 || activeFilter !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {activeFilter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    <button onClick={() => setActiveFilter('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategories.map((slug) => {
                  const category = categories.find(c => c.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {category?.name}
                      <button onClick={() => toggleCategory(slug)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
                {priceRange[0] > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Min: ${priceRange[0]}
                    <button onClick={() => setPriceRange([0, priceRange[1]])}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {priceRange[1] < 500 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Max: ${priceRange[1]}
                    <button onClick={() => setPriceRange([priceRange[0], 500])}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Display */}
            {currentItems.length === 0 ? (
              <div className="text-center py-12 bg-card border border-primary/10 rounded-xl">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {currentItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentItems.map((product) => (
                      <div
                        key={product.id}
                        className="bg-card border border-primary/10 rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="sm:w-32 h-32 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 128px"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground">by {product.artisan}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm ml-1">{product.rating}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    ({product.reviews} reviews)
                                  </span>
                                  {product.reviews && (
                                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                      {product.reviews} sold
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-xl font-bold text-primary">
                                  ${product.price.toFixed(2)}
                                </div>
                                {product.originalPrice && (
                                  <div className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </div>
                                )}
                                <Button className="mt-3 bg-gradient-to-r from-primary to-secondary" size="sm">
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}

                {/* Page Info */}
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-primary/20 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
              Stay <span className="text-gradient">Inspired</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive updates on new artisans, exclusive collections, and crafting stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}