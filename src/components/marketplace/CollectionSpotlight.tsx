"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, TrendingUp, Star, ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Collection {
  id: number;
  slug: string;
  name: string;
  description: string;
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
}

interface CollectionSpotlightProps {
  collections?: Collection[];
  title?: string;
  subtitle?: string;
  autoRotate?: boolean;
  rotationInterval?: number;
}

const defaultCollections: Collection[] = [
  {
    id: 1,
    slug: 'sustainable-living',
    name: 'Sustainable Living Collection',
    description: 'Eco-friendly products for conscious living',
    category: 'Lifestyle',
    featuredImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    productCount: 156,
    artisanCount: 42,
    rating: 4.8,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    isActive: true,
    isTrending: true,
    discountPercentage: 15,
    tags: ['Eco-Friendly', 'Natural Materials', 'Zero Waste'],
  },
  {
    id: 2,
    slug: 'valentine-gift-guide',
    name: 'Valentine Gift Guide 2026',
    description: 'Thoughtful handmade gifts for everyone',
    category: 'Seasonal',
    featuredImage: 'https://images.unsplash.com/photo-1512389148860-48096789ac5a?w=800&h=500&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=500&fit=crop',
    productCount: 234,
    artisanCount: 89,
    rating: 4.9,
    startDate: '2024-11-01',
    endDate: '2024-12-25',
    isActive: true,
    isTrending: true,
    discountPercentage: 20,
    tags: ['Gifts', 'Valentine', 'Personalized'],
  },
];

export default function CollectionSpotlight({
  collections = defaultCollections,
  title = "Collection Spotlight",
  subtitle = "Discover curated collections of exceptional handmade goods",
  autoRotate = true,
  rotationInterval = 5000
}: CollectionSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeCollection = collections[activeIndex];

  const nextCollection = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % collections.length);
  }, [collections.length]);

  const prevCollection = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + collections.length) % collections.length);
  }, [collections.length]);

  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const interval = setInterval(nextCollection, rotationInterval);
    return () => clearInterval(interval);
  }, [autoRotate, isPaused, rotationInterval, nextCollection]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute inset-0">
            <Image
              src={activeCollection.featuredImage}
              alt={activeCollection.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                  {activeCollection.category}
                </Badge>
                {activeCollection.isTrending && (
                  <Badge className="bg-red-500 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {activeCollection.discountPercentage && (
                  <Badge className="bg-green-500 text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {activeCollection.discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {activeCollection.name}
              </h3>
              
              <p className="text-xl text-white/95 mb-8 max-w-lg font-medium">
                {activeCollection.description}
              </p>

              <div className="flex flex-wrap items-center gap-8 mb-8">
                <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                  <div>
                    <p className="text-2xl font-bold">{activeCollection.productCount}</p>
                    <p className="text-sm opacity-95 font-medium">Products</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <Star className="w-5 h-5" />
                  <div>
                    <p className="text-2xl font-bold">{activeCollection.rating}</p>
                    <p className="text-sm opacity-95 font-medium">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <Eye className="w-5 h-5" />
                  <div>
                    <p className="text-2xl font-bold">{activeCollection.artisanCount}</p>
                    <p className="text-sm opacity-95 font-medium">Artisans</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-xl px-8 bg-amber-50 text-amber-900 hover:bg-amber-100 shadow-lg hover:shadow-xl transition-all border border-amber-200"
                >
                  <Link href={`/collections/${activeCollection.slug}`}>
                    Shop Collection
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="rounded-xl px-8 bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all border-amber-600"
                >
                  <Link href={`/collections/${activeCollection.slug}/artisans`}>
                    Meet the Artisans
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <button
            onClick={prevCollection}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            aria-label="Previous collection"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextCollection}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            aria-label="Next collection"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-8 left-8 flex gap-2">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to collection ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}