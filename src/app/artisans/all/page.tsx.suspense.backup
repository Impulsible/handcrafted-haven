"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  MapPin, 
  Star, 
  Search, 
  Filter,
  Award,
  Verified,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { artisans } from "@/data/artisans";

export default function AllArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  
  const specialties = ["all", ...Array.from(new Set(artisans.map(a => a.specialty)))];
  
  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || artisan.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-semibold text-primary">MEET THE MAKERS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our <span className="text-gradient">Artisans</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Discover the talented creators behind our handcrafted collection. Each artisan brings unique skills, 
              traditions, and passion to their work.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <span className="font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialty === specialty
                    ? "bg-primary text-white"
                    : "bg-card border border-primary/10 hover:bg-primary/5 text-muted-foreground"
                }`}
              >
                {specialty === "all" ? "All Specialties" : specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisans/${artisan.slug}`}
              className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-organic-lg transition-all hover:-translate-y-2"
            >
              {/* Cover Image */}
              <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              </div>
              
              {/* Avatar */}
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="relative h-24 w-24 rounded-full border-4 border-card bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                  {artisan.avatar ? (
                    <Image
                      src={artisan.avatar}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-white">{artisan.name[0]}</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-2 text-center">
                {/* Name & Verification */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-heading font-semibold group-hover:text-primary transition-colors">
                    {artisan.name}
                  </h3>
                  {artisan.isVerified && (
                    <Verified className="h-5 w-5 text-primary fill-primary" />
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{artisan.location}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {artisan.badges.slice(0, 2).map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                  {artisan.badges.length > 2 && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      +{artisan.badges.length - 2}
                    </span>
                  )}
                </div>

                {/* Specialty */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Specialty:</span>
                  <p className="font-semibold">{artisan.specialty}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-primary/10">
                  <div>
                    <div className="text-xl font-bold text-primary">{artisan.productCount}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xl font-bold text-primary">{artisan.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{artisan.reviewCount} reviews</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{artisan.followerCount}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                </div>

                {/* View Profile Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white group-hover:shadow-lg transition-shadow">
                  View Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No artisans found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-primary/20 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Become an <span className="text-gradient">Artisan</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of talented makers and share your craft with the world.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg">
              Apply to Become an Artisan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

