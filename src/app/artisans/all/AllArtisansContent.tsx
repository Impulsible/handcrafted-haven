"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllArtisansContent() {
  const searchParams = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchArtisans() {
      try {
        setLoading(true);
        // Get filter params from URL
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'newest';
        
        // Build query string
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        if (sort) params.append('sort', sort);
        
        const response = await fetch(`/api/artisans?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setArtisans(data.artisans || data);
        
        // Fetch categories for filter
        const catsResponse = await fetch('/api/categories');
        if (catsResponse.ok) {
          const catsData = await catsResponse.json();
          setCategories(catsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 bg-primary/10 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">
              All <span className="text-gradient">Artisans</span>
            </h1>
            <p className="text-muted-foreground">
              Discover talented artisans from around the world
            </p>
          </div>
          
          {/* Filter dropdown - you can expand this */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select 
              className="bg-background border border-input rounded-md px-3 py-2"
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set('sort', e.target.value);
                window.history.pushState({}, '', `?${params.toString()}`);
              }}
              value={searchParams.get('sort') || 'newest'}
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Categories filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={!searchParams.get('category') ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete('category');
                window.history.pushState({}, '', `?${params.toString()}`);
              }}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={searchParams.get('category') === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('category', cat.slug);
                  window.history.pushState({}, '', `?${params.toString()}`);
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}

        {/* Artisans Grid */}
        {artisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artisans found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                window.history.pushState({}, '', window.location.pathname);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="bg-card border border-primary/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={artisan.image || "/placeholder-artisan.jpg"}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{artisan.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">{artisan.rating || '5.0'}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {artisan.bio || 'Talented artisan creating unique handmade items.'}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artisan.location || 'Various locations'}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/artisans/${artisan.id}`} className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
