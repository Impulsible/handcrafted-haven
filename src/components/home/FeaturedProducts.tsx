import ProductCard from '../../../components/product/ProductCard'
import Link from 'next/link';
import { Award, Shield, Truck, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Hand-Thrown Stoneware Vase",
    category: "Pottery",
    description: "Elegant stoneware vase with natural flowing glaze, perfect for dried or fresh flowers. Each piece is uniquely crafted on the potter's wheel, featuring organic shapes and earth tones.",
    price: 89.99,
    image: "/images/products/pottery/vase-3.avif",
    rating: 4.8,
    reviews: 124,
    artisan: "Elena Chen",
    artisanSince: "2015",
    artisanImage: "/images/artisans/elena-chen.avif",
    tags: ["Handmade", "Eco-friendly", "Microwave Safe", "Dishwasher Safe"],
    inStock: true,
    bestSeller: true,
    discount: 0,
  },
  {
    id: 2,
    name: "Raku Ceramic Bowl Set",
    category: "Pottery",
    description: "Set of 4 Raku-fired bowls with iridescent copper finish. Each bowl has unique crackle patterns from the traditional Raku process, creating one-of-a-kind pieces.",
    price: 145.00,
    originalPrice: 180.00,
    image: "/images/products/pottery/bowl-set.avif",
    rating: 4.9,
    reviews: 89,
    artisan: "James Wilson",
    artisanSince: "2018",
    artisanImage: "/images/artisans/james-wilson.avif",
    tags: ["Raku", "Handmade", "Unique Pattern", "Set of 4"],
    inStock: true,
    bestSeller: true,
    discount: 19,
  },
  {
    id: 3,
    name: "Walnut End-Grain Board",
    category: "Woodwork",
    description: "Handcrafted end-grain walnut cutting board with juice groove. Expertly crafted from sustainable black walnut, oiled with food-safe mineral oil and beeswax.",
    price: 79.99,
    image: "/images/products/woodwork/boards.jpg",
    rating: 4.9,
    reviews: 312,
    artisan: "Robert Chen",
    artisanSince: "2012",
    artisanImage: "/images/artisans/robert-chen.avif",
    tags: ["Black Walnut", "Food Safe Oil", "Reversible", "Handmade"],
    inStock: true,
    bestSeller: true,
    discount: 0,
  },
  {
    id: 4,
    name: "Silver Filigree Earrings",
    category: "Jewelry",
    description: "Handcrafted sterling silver earrings with intricate filigree work. Lightweight and elegant, these earrings feature traditional patterns passed down through generations.",
    price: 89.00,
    image: "/images/products/jewelry/silver.avif",
    rating: 4.9,
    reviews: 156,
    artisan: "Anita Desai",
    artisanSince: "2014",
    artisanImage: "/images/artisans/anita-desai.avif",
    tags: ["Sterling Silver", "Handmade", "Gift Box", "Adjustable"],
    inStock: true,
    bestSeller: true,
    discount: 0,
  },
  {
    id: 5,
    name: "Handwoven Wool Blanket",
    category: "Textiles",
    description: "Luxuriously soft handwoven wool blanket featuring traditional patterns. Made from local sheep wool, naturally dyed with plants and minerals.",
    price: 245.00,
    originalPrice: 295.00,
    image: "/images/products/textiles/blanket-1.avif",
    rating: 4.8,
    reviews: 67,
    artisan: "Maria Gonzalez",
    artisanSince: "2010",
    artisanImage: "/images/artisans/maria-gonzalez.avif",
    tags: ["Sheep Wool", "Natural Dyes", "Handwoven", "Traditional"],
    inStock: true,
    bestSeller: true,
    discount: 17,
  },
  {
    id: 7,
    name: "Leather Messenger Bag",
    category: "Leather",
    description: "Hand-stitched full-grain leather messenger bag. Ages beautifully with use, developing a rich patina. Features brass hardware and adjustable strap.",
    price: 325.00,
    originalPrice: 395.00,
    image: "/images/products/leather/bag1.avif",
    rating: 4.9,
    reviews: 89,
    artisan: "Thomas Baker",
    artisanSince: "2013",
    artisanImage: "/images/artisans/thomas-baker.avif",
    tags: ["Full-Grain Leather", "Brass", "Handmade", "Adjustable"],
    inStock: true,
    bestSeller: true,
    discount: 18,
  }
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link href="/marketplace">
            <Button size="lg" variant="outline" className="border-primary text-primary px-8 hover:bg-primary hover:text-white transition-all duration-300">
              View All 30+ Products
            </Button>
          </Link>
          <p className="mt-4 text-text/60 text-sm">
            Free shipping on orders over $100 • 30-day return policy
          </p>
        </div>
      </div>
    </section>
  );
}