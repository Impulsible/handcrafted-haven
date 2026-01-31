import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Hand-Thrown Ceramic Bowl",
    category: "Pottery",
    description: "Beautiful hand-thrown ceramic bowl with natural glaze",
    price: 85.00,
    rating: 4.8,
    image: "/images/artisans/pottery1.jpg",
    artisan: "Elena Rodriguez",
    tags: ["Handmade", "Eco-friendly", "Microwave Safe"],
  },
  {
    id: 2,
    name: "Walnut Wood Coffee Table",
    category: "Woodwork",
    description: "Solid walnut table with dovetail joinery",
    price: 450.00,
    rating: 4.9,
    image: "/images/artisans/woodwork1.jpg",
    artisan: "James Wilson",
    tags: ["Solid Wood", "Hand Carved", "Heirloom Quality"],
  },
  {
    id: 3,
    name: "Silver & Turquoise Necklace",
    category: "Jewelry",
    description: "Handcrafted silver necklace with natural turquoise",
    price: 125.00,
    rating: 4.7,
    image: "/images/artisans/jewelry1.jpg",
    artisan: "Sophia Chen",
    tags: ["Sterling Silver", "Natural Stone", "Adjustable"],
  },
  {
    id: 4,
    name: "Artisan Mug Set",
    category: "Pottery",
    description: "Set of 4 hand-painted ceramic mugs",
    price: 120.00,
    rating: 4.6,
    image: "/images/artisans/pottery2.jpg",
    artisan: "Elena Rodriguez",
    tags: ["Set of 4", "Dishwasher Safe", "Food Safe"],
  },
  {
    id: 5,
    name: "Oak Cutting Board",
    category: "Woodwork",
    description: "End-grain oak cutting board with juice groove",
    price: 95.00,
    rating: 4.8,
    image: "/images/artisans/woodwork2.jpg",
    artisan: "James Wilson",
    tags: ["End Grain", "Juice Groove", "Conditioning Oil"],
  },
  {
    id: 6,
    name: "Gold Filigree Earrings",
    category: "Jewelry",
    description: "Delicate gold filigree drop earrings",
    price: 89.00,
    rating: 4.9,
    image: "/images/artisans/jewelry2.jpg",
    artisan: "Sophia Chen",
    tags: ["14K Gold", "Hypoallergenic", "Lightweight"],
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            Featured Artisan Products
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Each piece is uniquely crafted by skilled artisans using traditional techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="artisan-card group hover:shadow-organic-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-heading font-semibold text-text">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <p className="text-text/60 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-text/50 mb-2">By {product.artisan}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
