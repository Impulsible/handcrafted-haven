/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  shipping?: number
  tax?: number
}

export function CartSummary({ totalItems, totalPrice, shipping = 0, tax = 0 }: CartSummaryProps) {
  const subtotal = totalPrice
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {shipping === 0 && (
        <p className="text-sm text-green-600 mb-4">
          🎉 You've got FREE shipping!
        </p>
      )}

      <Link href="/checkout">
        <Button className="w-full bg-amber-600 hover:bg-amber-700 mb-3">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/marketplace">
        <Button variant="outline" className="w-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}