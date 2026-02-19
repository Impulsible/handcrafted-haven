"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define types
interface Artisan {
  id: string;
  name: string;
  bio: string;
  image: string;
  location: string;
  rating: number;
  category: string;
}

export default function AllArtisansContent() {
  const searchParams = useSearchParams();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get filter from URL
  const categoryFilter = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  useEffect(() => {
    async function fetchArtisans() {
      try {
        setLoading(true);
        // Build query string from URL params
        const params = new URLSearchParams();
        if (categoryFilter) params.append('category', categoryFilter);
        if (sortBy) params.append('sort', sortBy);
        if (searchTerm) params.append('search', searchTerm);
        
        const response = await fetch(`/api/artisans?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch artisans');
        const data = await response.json();
        setArtisans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, [categoryFilter, sortBy, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-80 bg-primary/10 rounded-xl animate-pulse" />
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            All <span className="text-gradient">Artisans</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of talented artisans
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search artisans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing {artisans.length} artisan{artisans.length !== 1 ? 's' : ''}
        </p>

        {/* Artisans Grid */}
        {artisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No artisans found.</p>
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
                      <span className="ml-1 text-sm">{artisan.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {artisan.bio}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{artisan.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {artisan.category}
                    </span>
                  </div>
                  <Link href={`/artisans/${artisan.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}