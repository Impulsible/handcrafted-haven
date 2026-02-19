"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Sparkles, Shield, Truck, Award, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

export default function MarketplaceHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic
      console.log('Searching for:', searchQuery);
    }
  };

  const featuredCollections = [
    {
      id: 1,
      name: 'Sustainable Crafts',
      description: 'Eco-friendly products from conscious artisans',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 2,
      name: 'Holiday Collection',
      description: 'Perfect handmade gifts for the season',
      image: 'https://images.unsplash.com/photo-1512389148860-48096789ac5a?w=800&h=400&fit=crop',
      color: 'from-red-500 to-pink-600',
    },
    {
      id: 3,
      name: 'Artisan Spotlight',
      description: 'Featured makers from around the world',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop',
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  const trustBadges = [
    { icon: Shield, label: 'Verified Artisans', description: 'All creators are vetted' },
    { icon: Truck, label: 'Global Shipping', description: 'Worldwide delivery' },
    { icon: Award, label: 'Quality Guarantee', description: '30-day returns' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Welcome to Handcrafted Haven
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover <span className="text-primary">Unique</span> Handmade{' '}
                <span className="text-secondary">Treasures</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                Explore authentic, one-of-a-kind creations from master artisans worldwide. 
                Each piece tells a story of tradition, skill, and passion.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pottery, jewelry, textiles, woodwork, or artisans..."
                  className="pl-12 pr-40 py-6 text-base rounded-2xl border-gray-300 focus:border-primary focus:ring-primary shadow-lg"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="rounded-xl px-6"
                  >
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Search Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Trending:</span>
                {['Ceramic Mugs', 'Handwoven Scarves', 'Wooden Bowls', 'Silver Jewelry'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm border">
                    <badge.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{badge.label}</p>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-xl px-8">
                Explore Marketplace
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8">
                <Link href="/artisans">
                  Meet Artisans
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Featured Collections */}
          <div className="space-y-6">
            <div className="grid gap-6">
              {featuredCollections.map((collection) => (
                <Link 
                  key={collection.id} 
                  href={`/collections/${collection.id}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="aspect-video relative overflow-hidden rounded-2xl">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${collection.color}/90 opacity-90`} />
                    <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-white/90 mb-4">{collection.description}</p>
                      <span className="inline-flex items-center text-white font-medium group-hover:translate-x-2 transition-transform">
                        Browse Collection
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-lg border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-gray-600">Artisans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">10K+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live customer support</span>
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <div className="text-sm text-gray-600">
          <span className="font-medium">Free shipping</span> on orders over $75
        </div>
      </div>
    </div>
  );
}

