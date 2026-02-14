"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/marketplace";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  emptyMessage?: React.ReactNode;
}

// Fallback image URL (a gray placeholder)
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='20' fill='%23999' text-anchor='middle' dy='.3em'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";

export default function ProductGrid({ 
  products, 
  loading = false,
  onAddToCart,
  onQuickView,
  onAddToWishlist,
  emptyMessage = "No products found"
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {typeof emptyMessage === 'string' ? emptyMessage : "Try adjusting your filters or browse different categories."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        // Safely check for discount with optional chaining and nullish coalescing
        const hasDiscount = (product.discountPercentage ?? 0) > 0;
        const discountText = hasDiscount && product.discountPercentage ? `-${product.discountPercentage}%` : '';
        const formattedRating = product.rating.toFixed(1);
        const inStock = product.stock > 0;
        
        // Validate image URL - use fallback if empty or invalid
        const imageUrl = product.image && product.image.trim() !== "" 
          ? product.image 
          : FALLBACK_IMAGE;

        return (
          <div
            key={product.id}
            className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Discount Badge */}
            {hasDiscount && (
              <Badge 
                variant="destructive" 
                className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-bold"
              >
                {discountText}
              </Badge>
            )}

            {/* New Badge */}
            {product.isNew && !hasDiscount && (
              <Badge 
                variant="default" 
                className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-bold bg-blue-500 hover:bg-blue-600"
              >
                NEW
              </Badge>
            )}

            {/* Wishlist Button */}
            {onAddToWishlist && (
              <button
                onClick={() => onAddToWishlist(product)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            )}

            {/* Product Image */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                onError={(e) => {
                  // If image fails to load, replace with fallback
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
              />
              
              {/* Quick View Overlay */}
              {onQuickView && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      onQuickView(product);
                    }}
                    className="transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              )}
            </Link>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              
              {/* Product Name */}
              <Link href={`/product/${product.id}`} className="block hover:text-primary transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              {/* Artisan Name */}
              <p className="text-sm text-gray-600 mb-2">by {product.artisanName}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {formattedRating} ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  {hasDiscount && product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <span className={`text-xs ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Add to Cart Button */}
              {onAddToCart && inStock && (
                <Button
                  onClick={() => onAddToCart(product)}
                  className="w-full mt-4 bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}

              {!inStock && (
                <Button
                  disabled
                  variant="outline"
                  className="w-full mt-4 cursor-not-allowed"
                  size="sm"
                >
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
