export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  artisan: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  artisan?: string
}
