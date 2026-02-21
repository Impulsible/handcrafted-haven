'use client'

import { useCart } from '@/contexts/CartContext'

export default function CartDebugContent() {
  const cartContext = useCart()
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Debug</h1>
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Cart Context:</h2>
        <pre>{JSON.stringify(cartContext, null, 2)}</pre>
      </div>
    </div>
  )
}
