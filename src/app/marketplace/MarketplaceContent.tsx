"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
  ShoppingBag,
  Award,
  Truck,
  Shield,
  RefreshCw,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Components
import dynamic from 'next/dynamic';
import ProductFilters from '@/components/marketplace/ProductFilters';
import SortDropdown from '@/components/marketplace/SortDropdown';
import Pagination from '@/components/marketplace/Pagination';
import Breadcrumbs from '@/components/marketplace/Breadcrumbs';
import FeaturedArtisans from '@/components/marketplace/FeaturedArtisans';
import CollectionSpotlight from '@/components/marketplace/CollectionSpotlight';

// Dynamically import ProductGrid
const ProductGrid = dynamic(() => import('@/components/marketplace/ProductGrid'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  ),
});

// Types
import type { Product, FilterState } from '@/types/marketplace';

/* ----------------------------- Local Types ----------------------------- */
type Category = {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
};

/* ----------------------------- Mock Data ----------------------------- */
const mockProducts: Product[] = Array.from({ length: 44 }, (_, i) => {
  const categories = [
    { name: 'Pottery', sub: 'Mugs' },
    { name: 'Woodwork', sub: 'Bowls' },
    { name: 'Textiles', sub: 'Scarves' },
    { name: 'Jewelry', sub: 'Necklaces' },
    { name: 'Glass', sub: 'Vases' },
    { name: 'Metalwork', sub: 'Sculptures' },
    { name: 'Leather', sub: 'Wallets' },
    { name: 'Paper', sub: 'Art' },
  ];
  
  const catIndex = i % 8;
  const category = categories[catIndex];
  
  const basePrice = [25, 45, 65, 85, 120, 180, 250, 350][catIndex % 8];
  const discount = Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : 0;
  const currentPrice = Math.floor(basePrice * (1 - discount / 100));
  
  return {
    id: i + 1,
    name: `Handcrafted ${category.name} ${category.sub}`,
    description: `Beautifully crafted ${category.name.toLowerCase()} piece made with traditional techniques and premium materials.`,
    shortDescription: 'Handmade with love and care by skilled artisans',
    price: currentPrice,
    artisanId: (i % 12) + 1,
    artisanName: [
      'Elena Rodriguez', 'Kaito Tanaka', 'Sophie Martin', 'Marcus Chen', 
      'Aisha Patel', 'Carlos Silva', 'Yuki Nakamura', 'Fatima Al-Mansoori',
      'Oliver Stone', 'Maya Patel', 'Hiroshi Yamamoto', 'Isabella Rossi'
    ][i % 12],
    category: category.name,
    images: [`https://images.unsplash.com/photo-${157000000000 + i * 100}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80`],
    rating: 3.5 + Math.random() * 1.5,
    reviews: Math.floor(Math.random() * 200) + 20,
    inStock: true,
    createdAt: '2024-01-15',
    currentPrice,
    materials: [[category.name], ['Organic'], ['Natural'], ['Recycled']][i % 4] as string[],
    stock: Math.floor(Math.random() * 50) + 5,
    discountPercentage: discount,
    tags: ['Handmade', 'Artisanal', 'Sustainable', 'Unique', 'Premium'],
    isBestSeller: i % 8 === 0,
    isFeatured: i % 6 === 0,
    artisanSlug: `artisan-${(i % 12) + 1}`,
  };
});

const categories: Category[] = [
  { 
    id: 'pottery', 
    name: 'Pottery', 
    count: 48, 
    icon: '🏺', 
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800'
  },
  { 
    id: 'woodwork', 
    name: 'Woodwork', 
    count: 62, 
    icon: '🪵', 
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-800'
  },
  { 
    id: 'textiles', 
    name: 'Textiles', 
    count: 45, 
    icon: '🧵', 
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-800'
  },
  { 
    id: 'jewelry', 
    name: 'Jewelry', 
    count: 72, 
    icon: '💎', 
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800'
  },
  { 
    id: 'glass', 
    name: 'Glass Art', 
    count: 28, 
    icon: '🪞', 
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-800'
  },
  { 
    id: 'metal', 
    name: 'Metalwork', 
    count: 36, 
    icon: '⚒️', 
    color: 'from-gray-600 to-slate-600',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800'
  },
  { 
    id: 'leather', 
    name: 'Leather', 
    count: 34, 
    icon: '🧰', 
    color: 'from-yellow-600 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-800'
  },
];

const materials: string[] = ['Clay', 'Wood', 'Metal', 'Glass', 'Fabric', 'Leather', 'Stone', 'Resin', 'Paper', 'Ceramic'];
const locations: string[] = ['North America', 'Europe', 'Asia', 'Africa', 'South America'];

const ITEMS_PER_PAGE = 12;

/* --------------------------- UI Helpers --------------------------- */
function SoftCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        'rounded-2xl border border-gray-200 bg-white shadow-sm',
        'hover:shadow-md transition-shadow duration-200',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function HeroBanner({ totalCount }: { totalCount: number }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary/90 min-h-[500px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90 mix-blend-multiply" />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <Breadcrumbs 
          items={[{ label: 'Marketplace', href: '/marketplace' }]} 
          className="text-sm text-white/90" 
          showHome={false} 
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Discover authentic handmade crafts
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Find Your Perfect <span className="text-yellow-300">Handcrafted</span> Treasure
            </h1>

            <p className="mt-4 text-xl text-white/90 max-w-2xl">
              Explore unique creations from skilled artisans worldwide. Each piece tells a story of craftsmanship and passion.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-lg">
              <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Fast shipping</span>
              </div>
              <div className="inline-flex items-center gap-3 bg-emerald-500/30 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-200" />
                <span className="text-emerald-100 font-medium">Verified artisans</span>
              </div>
              <div className="inline-flex items-center gap-3 bg-blue-500/30 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 font-medium">{totalCount} unique pieces</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SoftCard className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/10">
                  <Zap className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Marketplace Stats</h2>
                  <p className="text-white/80 text-sm">Live updates from our artisan community</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-white">{totalCount}</div>
                  <div className="text-sm text-white/80 mt-1">Active Listings</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-white">250+</div>
                  <div className="text-sm text-white/80 mt-1">Verified Artisans</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/80 mt-1">Satisfaction Rate</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-bold text-white">24h</div>
                  <div className="text-sm text-white/80 mt-1">Avg. Ship Time</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">New this week:</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">+{Math.floor(totalCount * 0.1)} items</Badge>
                </div>
              </div>
            </SoftCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryChips({
  activeFilters,
  onToggleCategory,
}: {
  activeFilters: FilterState;
  onToggleCategory: (id: string) => void;
}) {
  return (
    <SoftCard className="p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Shop by Category</h3>
            <p className="text-sm text-gray-600">Browse our curated collections</p>
          </div>
        </div>
        <span className="text-sm text-gray-500">Tap to filter</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {categories.map((category) => {
          const isActive = activeFilters.categories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              className={`
                flex flex-col items-center p-4 rounded-xl transition-all duration-300
                ${isActive 
                  ? `bg-gradient-to-br ${category.color} text-white shadow-lg scale-[1.02] ring-2 ring-offset-2 ring-opacity-50` 
                  : `${category.bgColor} hover:scale-[1.02] hover:shadow-md`
                }
                ${isActive ? 'ring-primary' : 'hover:ring-2 hover:ring-primary/20'}
              `}
            >
              <span className="text-3xl mb-3">{category.icon}</span>
              <span className={`font-semibold text-sm ${isActive ? 'text-white' : category.textColor}`}>
                {category.name}
              </span>
              <span className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                {category.count} items
              </span>
            </button>
          );
        })}
      </div>
    </SoftCard>
  );
}

/* ----------------------------- Live Market Stats ----------------------------- */
function useLiveStats() {
  const [stats, setStats] = useState({
    artisans: 250,
    products: 5000,
    countries: 50,
    satisfaction: 98,
    lastUpdated: new Date(),
  });

  const hasInitializedRef = useRef(false);

  const updateStats = useCallback(() => {
    setStats({
      artisans: Math.floor(250 + Math.random() * 50),
      products: Math.floor(5000 + Math.random() * 1000),
      countries: Math.floor(50 + Math.random() * 10),
      satisfaction: Math.min(100, Math.floor(98 + Math.random() * 3 - 1.5)),
      lastUpdated: new Date(),
    });
  }, []);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      const timer = setTimeout(updateStats, 0);
      hasInitializedRef.current = true;
      return () => clearTimeout(timer);
    }
  }, [updateStats]);

  useEffect(() => {
    const interval = setInterval(updateStats, 86400000);
    return () => clearInterval(interval);
  }, [updateStats]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const hoursSinceUpdate = (Date.now() - stats.lastUpdated.getTime()) / (1000 * 60 * 60);
        if (hoursSinceUpdate >= 24) {
          setTimeout(updateStats, 0);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [stats.lastUpdated, updateStats]);

  return stats;
}

function QuickStats() {
  const stats = useLiveStats();
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - stats.lastUpdated.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeSinceUpdate(diffHours > 0 ? `Updated ${diffHours}h ago` : `Updated ${diffMinutes}m ago`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [stats.lastUpdated]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <SoftCard className="p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-orange-100">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{stats.artisans}+</div>
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 font-medium">Artisans</div>
            <div className="text-xs text-gray-400 mt-1">Live updates</div>
          </div>
        </div>
      </SoftCard>
      <SoftCard className="p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{stats.products.toLocaleString()}+</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-sm text-gray-600 font-medium">Products</div>
            <div className="text-xs text-gray-400 mt-1">Growing daily</div>
          </div>
        </div>
      </SoftCard>
      <SoftCard className="p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-100">
            <Truck className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{stats.countries}+</div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">+2 new</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Countries</div>
            <div className="text-xs text-gray-400 mt-1">Worldwide reach</div>
          </div>
        </div>
      </SoftCard>
      <SoftCard className="p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-100">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{stats.satisfaction}%</div>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
            <div className="text-xs text-gray-400 mt-1">{timeSinceUpdate}</div>
          </div>
        </div>
      </SoftCard>
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function MarketplacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const urlFilters: FilterState = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      categories: params.get('categories')?.split(',').filter(Boolean) || [],
      priceRange: [
        parseInt(params.get('minPrice') || '0', 10),
        parseInt(params.get('maxPrice') || '1000', 10),
      ] as [number, number],
      minRating: params.get('minRating') ? parseFloat(params.get('minRating')!) : null,
      materials: params.get('materials')?.split(',').filter(Boolean) || [],
      artisanLocations: params.get('locations')?.split(',').filter(Boolean) || [],
      sortBy: (params.get('sortBy') as FilterState['sortBy']) || 'featured',
      inStockOnly: params.get('inStock') === 'true',
      onSaleOnly: params.get('onSale') === 'true',
      category: '',
      artisan: '',
      inStock: false,
      search: searchQuery,
    };
  }, [searchParams, searchQuery]);

  const [activeFilters, setActiveFilters] = useState<FilterState>(urlFilters);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const searchProducts = useCallback((products: Product[], query: string) => {
    if (!query.trim()) return products;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return products.filter(product => {
      const searchableText = `
        ${product.name.toLowerCase()}
        ${product.category.toLowerCase()}
        ${product.description?.toLowerCase() || ''}
        ${product.artisanName.toLowerCase()}
        ${product.materials?.join(' ').toLowerCase() || ''}
        ${product.tags?.join(' ').toLowerCase() || ''}
      `;
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    if (debouncedSearchQuery.trim()) {
      filtered = searchProducts(filtered, debouncedSearchQuery);
    }

    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((p) => 
        activeFilters.categories.includes(p.category.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (p) => (p.currentPrice ?? p.price) >= activeFilters.priceRange[0] && 
             (p.currentPrice ?? p.price) <= activeFilters.priceRange[1]
    );

    if (activeFilters.minRating) {
      filtered = filtered.filter((p) => p.rating >= activeFilters.minRating!);
    }

    if (activeFilters.materials.length > 0) {
      filtered = filtered.filter((p) => 
        p.materials?.some(material => activeFilters.materials.includes(material)) ?? false
      );
    }

    if (activeFilters.inStockOnly) {
      filtered = filtered.filter((p) => (p.stock ?? 0) > 0);
    }
    
    if (activeFilters.onSaleOnly) {
      filtered = filtered.filter((p) => (p.discountPercentage ?? 0) > 0);
    }

    filtered.sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'newest':
          return new Date(b.createdAt || new Date()).getTime() - new Date(a.createdAt || new Date()).getTime();
        case 'price-low':
          return (a.currentPrice ?? a.price) - (b.currentPrice ?? b.price);
        case 'price-high':
          return (b.currentPrice ?? b.price) - (a.currentPrice ?? a.price);
        case 'rating':
          return b.rating - a.rating;
        case 'bestsellers':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

    return filtered;
  }, [activeFilters, debouncedSearchQuery, searchProducts]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [filteredProducts]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const activeFilterCount = [
    activeFilters.categories.length,
    activeFilters.minRating ? 1 : 0,
    activeFilters.materials.length,
    activeFilters.artisanLocations.length,
    activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 1000 ? 1 : 0,
    activeFilters.inStockOnly ? 1 : 0,
    activeFilters.onSaleOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const updateUrlParams = useCallback((filters: FilterState, page: number) => {
    const params = new URLSearchParams();

    if (filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','));
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      params.set('minPrice', filters.priceRange[0].toString());
      params.set('maxPrice', filters.priceRange[1].toString());
    }
    if (filters.minRating) {
      params.set('minRating', filters.minRating.toString());
    }
    if (filters.materials.length > 0) {
      params.set('materials', filters.materials.join(','));
    }
    if (filters.artisanLocations.length > 0) {
      params.set('locations', filters.artisanLocations.join(','));
    }
    if (filters.sortBy !== 'featured') {
      params.set('sortBy', filters.sortBy);
    }
    if (filters.inStockOnly) {
      params.set('inStock', 'true');
    }
    if (filters.onSaleOnly) {
      params.set('onSale', 'true');
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (page > 1) {
      params.set('page', page.toString());
    }

    const qs = params.toString();
    router.push(`/marketplace${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [router, searchQuery]);

  const handleFilterChange = useCallback((filters: FilterState) => {
    setActiveFilters({ ...filters, search: searchQuery });
    setTimeout(() => setIsLoading(true), 0);
    updateUrlParams({ ...filters, search: searchQuery }, 1);
  }, [updateUrlParams, searchQuery]);

  const handleSortChange = useCallback((sortBy: string) => {
    const next = { ...activeFilters, sortBy: sortBy as FilterState['sortBy'] };
    setActiveFilters(next);
    setTimeout(() => setIsLoading(true), 0);
    updateUrlParams(next, currentPage);
  }, [activeFilters, currentPage, updateUrlParams]);

  const handlePageChange = useCallback((page: number) => {
    updateUrlParams(activeFilters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeFilters, updateUrlParams]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setTimeout(() => setIsLoading(true), 0);
    updateUrlParams(activeFilters, 1);
  }, [activeFilters, updateUrlParams]);

  const clearAll = useCallback(() => {
    const defaultFilters: FilterState = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: null,
      materials: [],
      artisanLocations: [],
      sortBy: 'featured',
      inStockOnly: false,
      onSaleOnly: false,
      category: '',
      artisan: '',
      inStock: false,
      search: '',
    };
    setSearchQuery('');
    setTimeout(() => setIsLoading(true), 0);
    handleFilterChange(defaultFilters);
  }, [handleFilterChange]);

  const toggleCategory = useCallback((id: string) => {
    const isActive = activeFilters.categories.includes(id);
    const next = {
      ...activeFilters,
      categories: isActive 
        ? activeFilters.categories.filter((c) => c !== id) 
        : [...activeFilters.categories, id],
    };
    handleFilterChange(next);
  }, [activeFilters, handleFilterChange]);

  const handleAddToCart = useCallback((product: Product) => {
    console.log('Adding to cart:', product);
  }, []);

  const handleQuickView = useCallback((product: Product) => {
    console.log('Quick view:', product);
  }, []);

  const handleAddToWishlist = useCallback((product: Product) => {
    console.log('Adding to wishlist:', product);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <HeroBanner totalCount={filteredProducts.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SoftCard className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What are you looking for?
                </h2>
                <p className="text-gray-600 mb-4">
                  Search for handmade products, artisans, or materials
                </p>
                <div className="relative max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for pottery, jewelry, textiles, wooden items, leather goods..."
                    className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">Popular:</span>
                  <button onClick={() => handleSearch('pottery')} className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                    Pottery
                  </button>
                  <button onClick={() => handleSearch('jewelry')} className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                    Jewelry
                  </button>
                  <button onClick={() => handleSearch('wood')} className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                    Wooden Items
                  </button>
                  <button onClick={() => handleSearch('leather')} className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                    Leather Goods
                  </button>
                </div>
              </div>
            </div>
          </SoftCard>
        </div>

        <QuickStats />

        <CategoryChips activeFilters={activeFilters} onToggleCategory={toggleCategory} />

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <SoftCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Filter className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Refine Results</h2>
                      <p className="text-sm text-gray-600">Filter by your preferences</p>
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <Badge className="bg-primary text-white font-medium px-3 py-1">
                      {activeFilterCount} active
                    </Badge>
                  )}
                </div>

                <ProductFilters
                  onFilterChange={handleFilterChange}
                  initialFilters={activeFilters}
                  availableCategories={categories}
                  availableMaterials={materials}
                  availableLocations={locations}
                />

                {activeFilterCount > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      onClick={clearAll} 
                      className="w-full gap-2 hover:bg-gray-50 hover:border-gray-300"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </SoftCard>

              <SoftCard className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Featured Artisans</h3>
                </div>
                <FeaturedArtisans />
              </SoftCard>
            </div>
          </aside>

          <main className="flex-1">
            <SoftCard className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Products</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Showing {filteredProducts.length} items
                        {activeFilterCount > 0 && ` • ${activeFilterCount} active filters`}
                        {searchQuery && ` • Search: "${searchQuery}"`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <SortDropdown 
                    value={activeFilters.sortBy} 
                    onChange={handleSortChange} 
                  />

                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 border-gray-300"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge className="ml-1 bg-primary text-white">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>

                  {activeFilterCount > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={clearAll} 
                      className="hidden sm:inline-flex gap-2 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
            </SoftCard>

            {activeFilterCount > 0 && (
              <SoftCard className="p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="font-medium text-gray-900">Active Filters:</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAll}
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.categories.map((category) => {
                    const cat = categories.find(c => c.id === category);
                    return cat ? (
                      <Badge 
                        key={category} 
                        variant="secondary" 
                        className="gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      >
                        <span className="text-lg">{cat.icon}</span>
                        {cat.name}
                        <button
                          onClick={() => {
                            const newFilters = {
                              ...activeFilters,
                              categories: activeFilters.categories.filter(c => c !== category)
                            };
                            handleFilterChange(newFilters);
                          }}
                          className="ml-1 hover:text-red-600 p-0.5 rounded-full hover:bg-red-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              </SoftCard>
            )}

            <ProductGrid
              products={paginatedProducts}
              loading={isLoading}
              emptyMessage={
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {searchQuery ? `No results for "${searchQuery}"` : "No products found"}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {searchQuery 
                      ? "Try different search terms or browse our categories."
                      : "Try adjusting your filters or browse different categories."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={clearAll} className="gap-2 bg-primary hover:bg-primary/90">
                      <Sparkles className="w-4 h-4" />
                      Clear All Filters
                    </Button>
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleSearch('')}
                        className="gap-2 border-gray-300"
                      >
                        <X className="w-4 h-4" />
                        Clear Search
                      </Button>
                    )}
                  </div>
                </div>
              }
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />

            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-10">
                <SoftCard className="p-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                </SoftCard>
              </div>
            )}

            <div className="mt-16">
              <CollectionSpotlight />
            </div>

            <div className="lg:hidden mt-16">
              <SoftCard className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Featured Artisans</h3>
                </div>
                <FeaturedArtisans />
              </SoftCard>
            </div>
          </main>
        </div>
      </div>

      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 overflow-y-auto lg:hidden shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Filter className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <p className="text-sm text-gray-600">Refine your search</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close filters"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <ProductFilters
                onFilterChange={(filters: FilterState) => {
                  handleFilterChange(filters);
                  setShowMobileFilters(false);
                }}
                initialFilters={activeFilters}
                availableCategories={categories}
                availableMaterials={materials}
                availableLocations={locations}
              />

              <div className="sticky bottom-0 bg-white pt-6 mt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={clearAll} 
                    className="gap-2 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                  <Button 
                    onClick={() => setShowMobileFilters(false)}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
