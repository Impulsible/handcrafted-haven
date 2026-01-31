import Image from "next/image";
import { Star, Heart, ShoppingBag, Clock, Shield, Truck, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Hand-Thrown Ceramic Bowl Set",
    category: "Pottery",
    description: "Set of 3 beautifully hand-thrown ceramic bowls with natural ash glaze. Each bowl is unique in shape and pattern.",
    price: 145.00,
    originalPrice: 185.00,
    rating: 4.8,
    reviewCount: 42,
    image: "/images/artisans/pottery1.jpg",
    artisan: "Elena Rodriguez",
    artisanSince: "2010",
    artisanImage: "/images/artisans/elena.jpg",
    tags: ["Handmade", "Eco-friendly", "Microwave Safe", "Dishwasher Safe"],
    inStock: true,
    fastDelivery: true,
    bestSeller: true,
    discount: 22,
  },
  {
    id: 2,
    name: "Solid Walnut Coffee Table",
    category: "Woodwork",
    description: "Mid-century modern coffee table crafted from solid walnut with hand-carved tapered legs.",
    price: 850.00,
    originalPrice: 950.00,
    rating: 4.9,
    reviewCount: 38,
    image: "/images/artisans/woodwork1.jpg",
    artisan: "James Wilson",
    artisanSince: "2008",
    artisanImage: "/images/artisans/james.jpg",
    tags: ["Solid Walnut", "Hand Carved", "Heirloom Quality", "Sustainable"],
    inStock: true,
    fastDelivery: false,
    bestSeller: true,
    discount: 11,
  },
  {
    id: 3,
    name: "Turquoise & Silver Statement Necklace",
    category: "Jewelry",
    description: "Handcrafted sterling silver necklace featuring natural turquoise stones.",
    price: 189.00,
    originalPrice: 225.00,
    rating: 4.7,
    reviewCount: 56,
    image: "/images/artisans/jewelry1.jpg",
    artisan: "Sophia Chen",
    artisanSince: "2015",
    artisanImage: "/images/artisans/sophia.jpg",
    tags: ["Sterling Silver", "Natural Turquoise", "Adjustable", "Gift Box"],
    inStock: true,
    fastDelivery: true,
    bestSeller: false,
    discount: 16,
  },
  {
    id: 4,
    name: "Artisan Stoneware Mug Collection",
    category: "Pottery",
    description: "Collection of 6 unique hand-painted stoneware mugs.",
    price: 165.00,
    originalPrice: 195.00,
    rating: 4.6,
    reviewCount: 87,
    image: "/images/artisans/pottery2.jpg",
    artisan: "Elena Rodriguez",
    artisanSince: "2010",
    artisanImage: "/images/artisans/elena.jpg",
    tags: ["Set of 6", "Dishwasher Safe", "Food Safe", "Oven Safe"],
    inStock: true,
    fastDelivery: true,
    bestSeller: true,
    discount: 15,
  },
  {
    id: 5,
    name: "Professional End-Grain Cutting Board",
    category: "Woodwork",
    description: "Professional end-grain oak cutting board with juice groove.",
    price: 125.00,
    originalPrice: 150.00,
    rating: 4.8,
    reviewCount: 94,
    image: "/images/artisans/woodwork2.jpg",
    artisan: "James Wilson",
    artisanSince: "2008",
    artisanImage: "/images/artisans/james.jpg",
    tags: ["End Grain", "Juice Groove", "Food Safe Oil", "Reversible"],
    inStock: true,
    fastDelivery: true,
    bestSeller: false,
    discount: 17,
  },
  {
    id: 6,
    name: "14K Gold Filigree Earrings",
    category: "Jewelry",
    description: "Exquisite 14K gold filigree drop earrings with freshwater pearls.",
    price: 245.00,
    originalPrice: 295.00,
    rating: 4.9,
    reviewCount: 63,
    image: "/images/artisans/jewelry2.jpg",
    artisan: "Sophia Chen",
    artisanSince: "2015",
    artisanImage: "/images/artisans/sophia.jpg",
    tags: ["14K Gold", "Freshwater Pearls", "Hypoallergenic", "Elegant Box"],
    inStock: true,
    fastDelivery: true,
    bestSeller: true,
    discount: 17,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Award className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary">CURATED COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-gradient">Artisan Masterpieces</span>
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of exceptional craftsmanship
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center px-4 py-2 bg-primary/5 rounded-full">
              <Shield className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium">Quality Guarantee</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-primary/5 rounded-full">
              <Truck className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium">Secure Shipping</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-primary/5 rounded-full">
              <Users className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium">Artisan Direct</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-organic-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-warning text-white text-sm font-bold rounded-full">
                  -{product.discount}%
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-text/60 hover:text-primary" />
              </button>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-text text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Artisan Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-primary/20">
                    <Image
                      src={product.artisanImage}
                      alt={product.artisan}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-text/60">Crafted by</p>
                    <p className="font-medium">{product.artisan}</p>
                  </div>
                  <div className="ml-auto text-sm text-text/40">
                    Since {product.artisanSince}
                  </div>
                </div>

                {/* Product Name & Rating */}
                <div className="mb-3">
                  <h3 className="text-xl font-heading font-semibold text-text mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-warning text-warning"
                              : "text-text/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{product.rating}</span>
                    <span className="mx-2 text-text/40">•</span>
                    <span className="text-sm text-text/60">{product.reviewCount} reviews</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text/60 mb-4 line-clamp-2">{product.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-background text-text/70 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price & Stock */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-3 text-text/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm">
                    {product.inStock ? (
                      <span className="text-success flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                        In Stock
                      </span>
                    ) : (
                      <span className="text-error flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Backorder
                      </span>
                    )}
                    {product.fastDelivery && (
                      <span className="ml-4 text-text/60 flex items-center">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast Delivery
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 group-hover:scale-[1.02] transition-transform">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-primary text-primary px-8">
            View All 200+ Products
          </Button>
          <p className="mt-4 text-text/60 text-sm">
            Free shipping on orders over $100 • 30-day return policy
          </p>
        </div>
      </div>
    </section>
  );
}
