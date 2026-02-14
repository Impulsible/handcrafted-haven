import type { Product } from './marketplace';

// Utility type to handle null values
export type Nullable<T> = T | null;

// Helper to safely access potentially undefined properties
export function safeValue<T>(value: T | undefined | null, defaultValue: T): T {
  return value ?? defaultValue;
}

// Type guard to check if a product is on sale
export function isOnSale(product: Product): boolean {
  return product.discountPercentage != null && product.discountPercentage > 0;
}

// Type guard to check if product is in stock
export function isInStock(product: Product): boolean {
  return product.stock != null ? product.stock > 0 : product.inStock;
}
