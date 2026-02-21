// types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;  // Optional since not all products may have it
  image: string;
  category: string;
  inStock: boolean;
  artisan: string;  // Make required since all your products have it
  artisanSince: string;  // Add this field
  artisanImage: string;  // Add this field
  rating: number;  // Make required (all your products have it)
  reviews: number;  // Make required (all your products have it)
  tags: string[];  // Add this field
  bestSeller?: boolean;  // Optional
  discount?: number;  // Optional
  featured?: boolean;
}