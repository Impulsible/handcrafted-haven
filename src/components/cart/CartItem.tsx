'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

interface CartItemProps {
  item: {
    id: number
    name: string
    price: number
    quantity: number
    image?: string
  }
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <Image
          src={item.image || '/images/placeholder.jpg'}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <Link href={`/product/${item.id}`}>
            <h3 className="font-semibold hover:text-amber-600">{item.name}</h3>
          </Link>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-amber-600 font-bold">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 border rounded-l-md hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center border-t border-b py-1">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 border rounded-r-md hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}