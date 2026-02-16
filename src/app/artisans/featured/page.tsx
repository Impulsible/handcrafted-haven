"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  MapPin, 
  Award,
  Verified,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedArtisans } from "@/data/artisans";

export default function FeaturedArtisansPage() {
  const featuredArtisans = getFeaturedArtisans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-semibold text-primary">CREATOR SPOTLIGHT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Featured <span className="text-gradient">Artisans</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Meet our exceptional creators who are pushing the boundaries of their craft.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Artisans Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredArtisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisans/${artisan.slug}`}
              className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-organic-lg transition-all hover:-translate-y-2"
            >
              {/* Cover Image with Gradient */}
              <div className="relative h-48 bg-gradient-to-r from-primary to-secondary">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    Featured Artisan
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative -mt-16 h-24 w-24 rounded-full border-4 border-card bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
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

                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-heading font-semibold group-hover:text-primary transition-colors">
                        {artisan.name}
                      </h3>
                      {artisan.isVerified && (
                        <Verified className="h-5 w-5 text-primary fill-primary" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{artisan.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{artisan.yearsActive} years</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story */}
                <div className="mt-4 mb-6">
                  <p className="text-muted-foreground italic">&ldquo;{artisan.story}&rdquo;</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {artisan.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-primary/10">
                  <div>
                    <div className="text-xl font-bold text-primary">{artisan.productCount}</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xl font-bold text-primary">{artisan.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{artisan.reviewCount} reviews</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{artisan.followerCount}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                </div>

                {/* View Profile Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white group-hover:shadow-lg transition-shadow">
                  View Full Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Artisans Link */}
        <div className="text-center mt-12">
          <Link href="/artisans/all">
            <Button variant="outline" className="border-primary text-primary px-8 py-6 text-lg">
              View All Artisans
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
