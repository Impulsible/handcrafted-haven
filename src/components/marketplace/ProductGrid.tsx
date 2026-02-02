// src/components/marketplace/ProductGrid.tsx
'use client';

import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/marketplace';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function ProductGrid({ 
  products, 
  loading, 
  emptyMessage, 
  onAddToCart, 
  onQuickView, 
  onAddToWishlist 
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
    return <>{emptyMessage}</>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const hasDiscount = product.discountPercentage > 0;
        const discountText = hasDiscount ? `-${product.discountPercentage}%` : '';
        const formattedRating = product.rating.toFixed(1);

        return (
          <div key={product.id} className="group overflow-hidden">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square mb-4">
              {/* Product Image */}
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              />
              
              {/* Product Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-500 text-white border-0" suppressHydrationWarning>
                    New
                  </Badge>
                )}
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white border-0" suppressHydrationWarning>
                    {discountText}
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-yellow-500 text-white border-0" suppressHydrationWarning>
                    Best Seller
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => onQuickView(product)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              {/* Add to Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-12 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => onAddToWishlist(product)}
              >
                <Heart className="w-4 h-4" />
              </Button>

              {/* Add to Cart Button */}
              <Button
                className="absolute bottom-0 left-0 right-0 w-full rounded-t-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-full group-hover:translate-y-0"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    by {product.artisanName}
                  </p>
                </div>
                <div className="text-right">
                  {hasDiscount ? (
                    <>
                      <span className="font-bold text-gray-900">
                        ${product.currentPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-gray-900">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {formattedRating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Category & Stock */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {product.category}
                </span>
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}