import React from 'react';
import type { Product } from '@/types/marketplace';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  emptyMessage?: React.ReactNode;
}

export default function ProductGrid({ 
  products, 
  loading = false,
  onAddToCart,
  onQuickView,
  onAddToWishlist,
  emptyMessage 
}: ProductGridProps) {
  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (products.length === 0) {
    return emptyMessage || <div className="text-center py-10">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.currentPrice}</p>
          <p className="text-sm text-gray-500">by {product.artisanName}</p>
        </div>
      ))}
    </div>
  );
}
