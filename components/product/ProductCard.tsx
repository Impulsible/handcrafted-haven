'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    
    addItem({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      artisan: product.artisan
    })

    toast.success('Added to cart!', {
      description: product.name,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      }
    })

    setTimeout(() => setIsAdding(false), 500)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <div className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden card-hover">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
          <div className="relative h-full w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-primary/40" />
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist()
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Quick Add Button (visible on hover) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              disabled={isAdding || !product.inStock}
              className="w-full rounded-none bg-primary hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {isAdding ? 'Adding...' : !product.inStock ? 'Out of Stock' : 'Quick Add'}
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">by {product.artisan}</p>
            </div>
            <span className="text-lg font-bold text-primary">
              
            </span>
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
        </Link>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}


