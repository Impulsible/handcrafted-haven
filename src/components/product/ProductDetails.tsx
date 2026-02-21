'use client'

import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ProductDetailsProps {
  product: {
    id: number
    name: string
    price: number
    description: string
    image: string
    rating: number
    reviews: number
    artisan: string
    inStock: boolean
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-96 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">by {product.artisan}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-600">({product.reviews} reviews)</span>
        </div>
        
        <p className="text-3xl font-bold text-amber-600 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        
        <p className={product.inStock ? 'text-green-600' : 'text-red-600'}>
          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </p>
      </div>
    </div>
  )
}