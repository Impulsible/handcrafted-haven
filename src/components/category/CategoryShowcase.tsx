import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette, Gem, TreePine, Scissors, ChevronRight, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Pottery",
    description: "Hand-thrown ceramics & functional art",
    icon: <Palette className="h-8 w-8" />,
    image: "/images/artisans/pottery1.avif",
    count: "250+ items",
    color: "from-primary/20 to-secondary/20",
    gradient: "from-primary to-secondary",
    badgeColor: "bg-primary text-white",
    items: ["Bowls", "Mugs", "Vases", "Platters", "Planters"],
    slug: "pottery",
  },
  {
    name: "Jewelry",
    description: "Fine craftsmanship with precious materials",
    icon: <Gem className="h-8 w-8" />,
    image: "/images/artisans/jewelry1.jpg",
    count: "300+ items",
    color: "from-amber-100/30 to-yellow-100/30",
    gradient: "from-amber-500 to-yellow-500",
    badgeColor: "bg-amber-600 text-white",
    items: ["Necklaces", "Earrings", "Rings", "Bracelets", "Brooches"],
    slug: "jewelry",
  },
  {
    name: "Woodwork",
    description: "Sustainable wood crafted with precision",
    icon: <TreePine className="h-8 w-8" />,
    image: "/images/artisans/woodwork.jpg",
    count: "180+ items",
    color: "from-emerald-100/30 to-green-100/30",
    gradient: "from-emerald-600 to-green-600",
    badgeColor: "bg-emerald-700 text-white",
    items: ["Furniture", "Cutting Boards", "Bowls", "Sculptures", "Utensils"],
    slug: "woodwork",
  },
  {
    name: "Textiles",
    description: "Woven, embroidered, and dyed fabrics",
    icon: <Scissors className="h-8 w-8" />,
    image: "/images/artisans/textiles.jpg",
    count: "220+ items",
    color: "from-violet-100/30 to-purple-100/30",
    gradient: "from-violet-600 to-purple-600",
    badgeColor: "bg-violet-700 text-white",
    items: ["Blankets", "Scarves", "Wall Hangings", "Pillows", "Bags"],
    slug: "textiles",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Collections</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Explore by <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Discover handcrafted excellence across our carefully curated artisan collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="group block">
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-organic-lg transition-all duration-500 hover:-translate-y-2 h-full">
                <Link href={`/category/${category.slug}`}>
                  <div className="p-6 pb-0 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} mr-4`}>
                          <div className="text-primary">{category.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-text/60">{category.count}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-text/40 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>

                <Link href={`/category/${category.slug}`}>
                  <div className="relative h-48 mx-6 rounded-xl overflow-hidden cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1.5 ${category.badgeColor} rounded-full shadow-lg backdrop-blur-sm`}>
                        <span className="text-xs font-bold tracking-wide">FEATURED</span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-xs font-medium text-white">Handcrafted</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-6 pt-4">
                  <p className="text-text/70 mb-4">{category.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-text/50 mb-2">Popular items:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.items.slice(0, 3).map((item) => (
                        <span key={item} className="px-2 py-1 bg-background text-text/70 text-xs rounded-full border border-border/30">
                          {item}
                        </span>
                      ))}
                      {category.items.length > 3 && (
                        <span className="px-2 py-1 bg-background text-text/50 text-xs rounded-full border border-border/30">
                          +{category.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Link href={`/category/${category.slug}`} className="block">
                    <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 group-hover:border-primary group-hover:bg-primary/10">
                      Browse Collection
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center">
            <p className="text-text/60 mb-6 max-w-lg mx-auto">
              From functional pottery to statement jewelry, explore thousands of unique handmade pieces
            </p>
            <Link href="/categories">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                View All Categories
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
