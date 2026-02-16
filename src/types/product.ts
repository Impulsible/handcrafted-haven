export interface Product {
  id: number;  // Change from string to number to match your data
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  artisan?: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}
