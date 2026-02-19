"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturedArtisansContent() {
  const searchParams = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtisans() {
      try {
        setLoading(true);
        // Get category from URL params if exists
        const category = searchParams.get('category');
        const url = category 
          ? `/api/artisans?featured=true&category=${category}`
          : '/api/artisans?featured=true';
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setArtisans(data);
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Featured <span className="text-gradient">Artisans</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most talented and highly-rated artisans
          </p>
        </div>

        {/* Artisans Grid */}
        {artisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured artisans found.</p>
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
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white">
                    <Heart className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{artisan.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">{artisan.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{artisan.bio}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artisan.location}
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
