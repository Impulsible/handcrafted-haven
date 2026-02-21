/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from 'next/image'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { useState } from 'react'
import { useFavorite } from '@/hooks/useFavorite';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any // Using any temporarily to handle both types
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { handleFavoriteAction } = useFavorite();
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements (buttons)
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true)

    // Ensure we have all required fields
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '/images/placeholder.jpg',
      artisan: product.artisan || 'Artisan'
    }

    console.log('Adding to cart:', cartItem)
    addItem(cartItem)

    toast.success('Added to cart!', {
      description: product.name,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      }
    })

    setTimeout(() => setIsAdding(false), 500)
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  return (
    <div 
      className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden card-hover cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="relative h-full w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-primary/40" />
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Quick Add Button (visible on hover) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
            className="w-full rounded-none bg-primary hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isAdding ? 'Adding...' : !product.inStock ? 'Out of Stock' : 'Quick Add'}
          </Button>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Best Seller Badge */}
        {product.bestSeller && (
          <div className="absolute top-4 left-4 z-20 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
            Best Seller
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">by {product.artisan}</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} reviews)
          </span>
          {!product.inStock && (
            <span className="text-xs text-red-500 ml-auto">Out of Stock</span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 2).map((tag: string, index: number) => (
              <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                +{product.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}