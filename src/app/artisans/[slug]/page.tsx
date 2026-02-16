"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  MapPin, 
  Star, 
  Globe, 
  Instagram, 
  Twitter,
  ShoppingBag,
  Award,
  Calendar,
  Mail,
  Shield,
  Truck,
  Heart,
  ArrowLeft,
  Share2,
  Facebook,
  Linkedin,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

// Generate unique artisans from products
const getUniqueArtisans = () => {
  const artisanMap = new Map();
  
  products.forEach(product => {
    if (!artisanMap.has(product.artisan)) {
      artisanMap.set(product.artisan, {
        id: product.artisanId || `artisan-${product.id}`,
        name: product.artisan,
        location: product.artisanLocation || "Location unavailable",
        avatar: product.artisanAvatar || `https://i.pravatar.cc/300?u=${product.artisan}`,
        coverImage: "https://images.unsplash.com/photo-1578749559196-482c53fba63b?w=1200&h=400&fit=crop",
        specialty: product.category,
        products: [product],
        rating: product.rating,
        totalReviews: product.reviews,
        joinDate: product.createdAt || new Date().toISOString(),
        bio: `${product.artisan} is a master ${product.category.toLowerCase()} artisan with years of experience creating unique handmade pieces.`,
        longBio: `With over a decade of experience in traditional ${product.category.toLowerCase()}, ${product.artisan} has dedicated their life to preserving and innovating within their craft. Their work has been featured in galleries and collections worldwide, and they continue to inspire the next generation of artisans through workshops and mentorship.`,
        story: `The journey began in a small workshop, where ${product.artisan} first discovered the magic of creating something beautiful with their own hands. Today, they combine traditional techniques passed down through generations with contemporary design sensibilities.`,
        process: `Each piece begins with carefully selected materials, sourced sustainably from local suppliers. Using techniques refined over years of practice, every item is crafted with attention to detail and a commitment to quality that ensures it will be treasured for generations.`,
        social: {
          instagram: "#",
          twitter: "#",
          facebook: "#",
          linkedin: "#",
          website: "#"
        },
        awards: [
          "Best Artisan Award 2023",
          "Traditional Craft Excellence 2022",
          "Innovation in Craftsmanship 2021"
        ],
        certifications: [
          "Fair Trade Certified",
          "Sustainable Materials Verified",
          "Master Artisan Status"
        ],
        shippingCountries: ["United States", "Canada", "United Kingdom", "European Union", "Australia"],
        returnPolicy: "30-day satisfaction guarantee",
        responseTime: "< 24 hours"
      });
    } else {
      const existing = artisanMap.get(product.artisan);
      existing.products.push(product);
      existing.rating = (existing.rating + product.rating) / 2;
      existing.totalReviews += product.reviews;
    }
  });
  
  return Array.from(artisanMap.values());
};

export default function ArtisanProfilePage() {
  const params = useParams();
  const [artisan, setArtisan] = useState<any>(null);
  const [artisanProducts, setArtisanProducts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "story" | "reviews">("products");

  useEffect(() => {
    setIsMounted(true);
    const slug = params.slug as string;
    const artisans = getUniqueArtisans();
    
    // Find artisan by slug (convert slug back to name)
    const found = artisans.find(a => 
      a.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (found) {
      setArtisan(found);
      setArtisanProducts(found.products);
    }
  }, [params.slug]);

  if (!isMounted || !artisan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          <div className="h-96 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
        <Link 
          href="/artisans" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Artisans
        </Link>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={artisan.coverImage}
          alt={`${artisan.name}'s workspace`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Profile Avatar - Positioned to overlap cover and content */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
          <div className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
            <Image
              src={artisan.avatar}
              alt={artisan.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-primary/10 rounded-2xl p-6 sticky top-24">
              <h1 className="text-2xl font-heading font-bold mb-2">{artisan.name}</h1>
              
              <div className="flex items-center gap-1 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{artisan.location}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{artisan.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({artisan.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">Master Artisan</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                  {artisan.specialty}
                </span>
                <span className="text-xs bg-card border border-primary/10 px-3 py-1.5 rounded-full">
                  Since {new Date(artisan.joinDate).getFullYear()}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                {artisan.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2 mb-6">
                {artisan.social.instagram && (
                  <a href={artisan.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {artisan.social.twitter && (
                  <a href={artisan.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {artisan.social.facebook && (
                  <a href={artisan.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {artisan.social.linkedin && (
                  <a href={artisan.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {artisan.social.website && (
                  <a href={artisan.social.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5">
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                <button className="p-2 rounded-lg bg-card border border-primary/10 hover:bg-primary/5 ml-auto">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              {/* Contact Button */}
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white mb-4">
                <Mail className="mr-2 h-4 w-4" />
                Contact Artisan
              </Button>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center py-4 border-t border-primary/10">
                <div>
                  <div className="font-bold">{artisan.products.length}</div>
                  <div className="text-xs text-muted-foreground">Products</div>
                </div>
                <div>
                  <div className="font-bold">{artisan.totalReviews}</div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
                <div>
                  <div className="font-bold">{artisan.awards.length}</div>
                  <div className="text-xs text-muted-foreground">Awards</div>
                </div>
              </div>
              
              {/* Certifications */}
              <div className="pt-4 border-t border-primary/10">
                <h3 className="font-semibold mb-3">Certifications</h3>
                <div className="space-y-2">
                  {artisan.certifications.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="pt-4 border-t border-primary/10">
                <h3 className="font-semibold mb-3">Shipping & Policies</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Ships to {artisan.shippingCountries.length} countries</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>{artisan.returnPolicy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Response time: {artisan.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Tabs and Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-primary/10 mb-6">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === "products"
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Products ({artisan.products.length})
                {activeTab === "products" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === "story"
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Story & Process
                {activeTab === "story" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === "reviews"
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Reviews ({artisan.totalReviews})
                {activeTab === "reviews" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === "products" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">Products by {artisan.name}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {artisanProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "story" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">The Story</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {artisan.story}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">The Process</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {artisan.process}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Awards & Recognition</h2>
                  <div className="space-y-2">
                    {artisan.awards.map((award: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="text-center py-12 bg-card border border-primary/10 rounded-2xl">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
                <p className="text-muted-foreground">
                  Customer reviews will be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}