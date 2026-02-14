/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Award, Users, CheckCircle, Heart, ShoppingCart, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// Import your cart context/hook
import { useCart } from '@/contexts/CartContext';

export interface Artisan {
  id: number;
  slug: string;
  name: string;
  bio: string;
  specialty: string;
  location: string;
  country: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  avatarUrl?: string;
  coverImageUrl?: string;
  isVerified: boolean;
  isFeatured: boolean;
  badges: string[];
  materials: string[];
  story: string;
  joinedDate: string;
}

// Real product data for artisans - UPDATED to match CartContext
const artisanProducts = [
  // Products for artisan 1
  {
    id: 'prod_101',
    name: 'Hand-Thrown Ceramic Mug',
    price: 34.99,
    artisanName: 'Sarah Pottery',
    artisanId: '1', // String type to match CartContext
    image: '/mug.jpg', // Changed from imageUrl to image
  },
  {
    id: 'prod_102',
    name: 'Clay Serving Bowl Set',
    price: 89.99,
    artisanName: 'Sarah Pottery',
    artisanId: '1',
    image: '/bowl.jpg',
  },
  
  // Products for artisan 2
  {
    id: 'prod_201',
    name: 'Woven Wool Throw Blanket',
    price: 129.99,
    artisanName: 'Weaver\'s Guild',
    artisanId: '2',
    image: '/blanket.jpg',
  },
  {
    id: 'prod_202',
    name: 'Handwoven Silk Scarf',
    price: 45.99,
    artisanName: 'Weaver\'s Guild',
    artisanId: '2',
    image: '/scarf.jpg',
  },
  
  // Products for artisan 3
  {
    id: 'prod_301',
    name: 'Oak Wood Cutting Board',
    price: 54.99,
    artisanName: 'Woodcraft Studio',
    artisanId: '3',
    image: '/board.jpg',
  },
  
  // Products for artisan 4
  {
    id: 'prod_401',
    name: 'Sterling Silver Pendant',
    price: 78.99,
    artisanName: 'Silver Smith',
    artisanId: '4',
    image: '/pendant.jpg',
  }
];

// Get products for a specific artisan
const getArtisanProducts = (artisanId: number) => {
  return artisanProducts.filter(product => product.artisanId === artisanId.toString());
};

interface FeaturedArtisansProps {
  artisans?: Artisan[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  onFollow?: (artisanId: number) => void;
  compact?: boolean;
  showAddToCart?: boolean;
}

function formatFollowers(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}m`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < full ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function FeaturedArtisans({
  artisans = [],
  title = 'Top Artisans',
  subtitle = 'Meet the makers behind our best-selling crafts',
  viewAllLink = '/marketplace',
  onFollow,
  compact = false,
  showAddToCart = true,
}: FeaturedArtisansProps) {
  // Use your cart context
  const { addToCart, itemCount } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const handleFollow = (e: React.MouseEvent, artisanId: number) => {
    e.preventDefault();
    e.stopPropagation();
    onFollow?.(artisanId);
  };

  const handleAddToCart = (e: React.MouseEvent, artisanId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get products for this artisan
    const products = getArtisanProducts(artisanId);
    if (products.length === 0) return;
    
    // Add the first available product that hasn't been added yet
    const productToAdd = products.find(p => !addedProducts.has(p.id)) || products[0];
    
    // CORRECTED: Send the exact structure that CartContext expects
    addToCart({
      id: productToAdd.id,
      name: productToAdd.name,
      price: productToAdd.price,
      image: productToAdd.image, // Changed from imageUrl to image
      artisanId: productToAdd.artisanId, // Already string type
      artisanName: productToAdd.artisanName,
    });
    
    // Mark as added
    setAddedProducts(prev => new Set(prev).add(productToAdd.id));
    
    // Show success toast
    toast.success(`Added ${productToAdd.name} to cart!`, {
      description: `Cart now has ${itemCount + 1} item(s)`,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart',
      },
    });
  };

  // Check if artisan has products
  const hasProducts = (artisanId: number) => {
    return getArtisanProducts(artisanId).length > 0;
  };

  // Get first product for artisan (for button text)
  const getFirstProductId = (artisanId: number) => {
    const products = getArtisanProducts(artisanId);
    return products.length > 0 ? products[0].id : null;
  };

  // Empty state
  if (artisans.length === 0) {
    return (
      <div className={compact ? '' : 'py-10'}>
        {!compact && (
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3 px-4 py-1">
              <Award className="w-4 h-4 mr-2" />
              Curated
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
        )}

        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No artisans to display right now.</p>
        </div>
      </div>
    );
  }

  /* ------------------ COMPACT (sidebar widget) ------------------ */
  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">Verified makers</p>
          </div>

          <Link href={viewAllLink} className="text-xs text-primary hover:underline">
            View all 200+ Productions
          </Link>
        </div>

        <div className="space-y-3">
          {artisans.slice(0, 4).map((a) => {
            const firstProductId = getFirstProductId(a.id);
            const isAdded = firstProductId ? addedProducts.has(firstProductId) : false;
            
            return (
              <Link
                key={a.id}
                href={`/artisans/${a.slug}`}
                className="block rounded-xl border border-primary/10 bg-white/60 hover:bg-primary/5 transition-colors"
              >
                <div className="p-3 flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                    {a.avatarUrl ? (
                      <img src={a.avatarUrl} alt={a.name} className="h-full w-full object-cover" />
                    ) : (
                      <Users className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-foreground truncate">{a.name}</p>
                      {a.isVerified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>

                    <p className="text-xs text-muted-foreground truncate">{a.specialty}</p>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-foreground">{a.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({a.reviewCount})</span>
                      </div>

                      <span className="text-xs text-muted-foreground">{formatFollowers(a.followerCount)} followers</span>
                    </div>

                    {/* Add to Cart Button in compact view */}
                    {showAddToCart && hasProducts(a.id) && (
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-primary font-medium">
                          {getArtisanProducts(a.id).length} products available
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, a.id)}
                          disabled={isAdded}
                          className={`text-xs flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                            isAdded 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-primary/10 hover:bg-primary/20 text-primary'
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          {isAdded ? 'Added!' : 'Add to Cart'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  /* ------------------ FULL (grid section) ------------------ */
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Award className="w-4 h-4 mr-2" />
            Curated Selection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {artisans.map((artisan) => {
            const firstProductId = getFirstProductId(artisan.id);
            const isAdded = firstProductId ? addedProducts.has(firstProductId) : false;
            
            return (
              <Link key={artisan.id} href={`/artisans/${artisan.slug}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          {artisan.avatarUrl ? (
                            <img src={artisan.avatarUrl} alt={artisan.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-10 h-10 text-primary" />
                          )}
                        </div>

                        {artisan.isVerified && (
                          <div className="absolute bottom-0 right-0">
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {artisan.name}
                      </h3>

                      <p className="text-gray-600 mb-2">{artisan.specialty}</p>

                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {artisan.location}, {artisan.country}
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Stars rating={artisan.rating} />
                        <span className="text-sm text-gray-600">({artisan.reviewCount})</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{artisan.yearsExperience}+</p>
                          <p className="text-xs text-gray-500">Years</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{artisan.productCount}</p>
                          <p className="text-xs text-gray-500">Products</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{formatFollowers(artisan.followerCount)}</p>
                          <p className="text-xs text-gray-500">Followers</p>
                        </div>
                      </div>

                      {/* Product availability indicator */}
                      {showAddToCart && hasProducts(artisan.id) && (
                        <div className="mb-4 flex items-center justify-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-primary font-medium">
                            {getArtisanProducts(artisan.id).length} products ready to ship
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                          onClick={(e) => handleFollow(e, artisan.id)}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Follow
                        </Button>

                        {showAddToCart && hasProducts(artisan.id) && (
                          <Button
                            className={`w-full transition-colors ${
                              isAdded 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gradient-to-r from-primary to-secondary'
                            }`}
                            onClick={(e) => handleAddToCart(e, artisan.id)}
                            disabled={isAdded}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {isAdded ? 'Added!' : 'Add to Cart'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Productions Button */}
        <div className="text-center">
          <Link href={viewAllLink}>
            <Button size="lg" variant="outline" className="px-8">
              View All 200+ Productions <span className="ml-2">?</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
