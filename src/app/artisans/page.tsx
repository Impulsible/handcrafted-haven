"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  Star, 
  Globe, 
  Instagram, 
  ShoppingBag,
  Award,
  ArrowRight,
  Search,
  Filter,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Define Artisan type from Supabase
interface Artisan {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  cover_image: string;
  location: string;
  specialty: string;
  story: string;
  bio: string;
  rating: number;
  review_count: number;
  product_count: number;
  badges: string[] | null;
  is_verified: boolean;
  social_links: {
    instagram?: string;
    website?: string;
  } | null;
  created_at: string;
}

// Artisan Card Component
const ArtisanCard = ({ artisan }: { artisan: Artisan }) => {
  return (
    <Link 
      href={`/artisans/${artisan.slug}`}
      className="group bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
        <Image
          src={artisan.avatar || '/images/artisans/default-avatar.jpg'}
          alt={artisan.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span>{artisan.rating?.toFixed(1) || '0.0'}</span>
        </div>

        {/* Verified Badge */}
        {artisan.is_verified && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-heading font-bold mb-1 group-hover:text-primary transition-colors">
          {artisan.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span>{artisan.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {artisan.bio || artisan.story}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {artisan.specialty}
          </span>
          <span className="text-xs text-muted-foreground">
            {artisan.product_count || 0} {artisan.product_count === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </Link>
  );
};

// Featured Artisan Component
const FeaturedArtisan = ({ artisan }: { artisan: Artisan }) => {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full mb-4">
            <Award className="w-4 h-4 mr-2 text-primary" />
            <span className="text-xs font-medium">Featured Artisan</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {artisan.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{artisan.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm">{artisan.rating?.toFixed(1) || '0.0'} ({artisan.review_count || 0} reviews)</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {artisan.bio || artisan.story}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm bg-card px-3 py-1 rounded-full border border-primary/10">
              {artisan.specialty} Specialist
            </span>
            <span className="text-sm bg-card px-3 py-1 rounded-full border border-primary/10">
              {artisan.product_count || 0} Products
            </span>
            <span className="text-sm bg-card px-3 py-1 rounded-full border border-primary/10">
              Since {new Date(artisan.created_at).getFullYear()}
            </span>
          </div>
          
          <div className="flex gap-3">
            <Link href={`/artisans/${artisan.slug}`}>
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex gap-2">
              {artisan.social_links?.instagram && (
                <a href={artisan.social_links.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {artisan.social_links?.website && (
                <a href={artisan.social_links.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={artisan.avatar || '/images/artisans/default-avatar.jpg'}
            alt={artisan.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default function ArtisansPage() {
  const router = useRouter();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [featuredArtisan, setFeaturedArtisan] = useState<Artisan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch artisans from Supabase
  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const { data, error } = await supabase
        .from('artisans')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setArtisans(data || []);
      
      // Set a random featured artisan
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setFeaturedArtisan(data[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching artisans:', error);
      toast.error('Failed to load artisans');
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique specialties for filter
  const specialties = useMemo(() => {
    const uniqueSpecialties = Array.from(new Set(artisans.map(a => a.specialty)));
    return ["all", ...uniqueSpecialties];
  }, [artisans]);

  // Filtered artisans
  const filteredArtisans = useMemo(() => {
    let filtered = [...artisans];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.bio || a.story || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(a => a.specialty === selectedSpecialty);
    }
    
    return filtered;
  }, [searchQuery, selectedSpecialty, artisans]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading artisans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4">
              Meet Our <span className="text-gradient">Artisans</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the talented craftspeople behind each unique piece. Every artisan has a story to tell and generations of skill to share.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search artisans by name, location, or craft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Show empty state if no artisans */}
        {artisans.length === 0 ? (
          <div className="text-center py-20 bg-card border border-primary/10 rounded-2xl">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Artisans Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Be the first to join our community of talented craftspeople and share your work with the world.
            </p>
            <Button 
              onClick={() => router.push('/become-artisan')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg"
            >
              Become an Artisan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Artisan */}
            {featuredArtisan && (
              <div className="mb-16">
                <FeaturedArtisan artisan={featuredArtisan} />
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-heading font-bold">
                All Artisans <span className="text-sm font-normal text-muted-foreground ml-2">({filteredArtisans.length})</span>
              </h2>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedSpecialty === specialty
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-card border border-primary/10 hover:bg-primary/5'
                    }`}
                  >
                    {specialty === 'all' ? 'All' : specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* Artisans Grid */}
            {filteredArtisans.length === 0 ? (
              <div className="text-center py-16 bg-card border border-primary/10 rounded-2xl">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No artisans found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSpecialty("all");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtisans.map((artisan) => (
                  <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Call to Action - Only show if there are artisans */}
      {artisans.length > 0 && (
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-primary/20 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Are You an <span className="text-gradient">Artisan?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of talented craftspeople and share your work with the world.
            </p>
            <Button 
              onClick={() => router.push('/become-artisan')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg"
            >
              Apply to Sell
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}