import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Palette, Gem, TreePine, Scissors } from "lucide-react";

const categories = [
  {
    name: "Pottery",
    icon: <Palette className="h-8 w-8 text-primary" />,
    image: "/images/artisans/pottery.jpg",
    count: "250+ items",
    color: "from-amber-100 to-orange-100",
  },
  {
    name: "Jewelry",
    icon: <Gem className="h-8 w-8 text-primary" />,
    image: "/images/artisans/jewelry.jpg",
    count: "300+ items",
    color: "from-rose-100 to-pink-100",
  },
  {
    name: "Woodwork",
    icon: <TreePine className="h-8 w-8 text-primary" />,
    image: "/images/artisans/woodwork.jpg",
    count: "180+ items",
    color: "from-emerald-100 to-green-100",
  },
  {
    name: "Textiles",
    icon: <Scissors className="h-8 w-8 text-primary" />,
    image: "/images/artisans/textiles.jpg",
    count: "220+ items",
    color: "from-violet-100 to-purple-100",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-playfair">
            Explore by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our carefully curated collection of handmade crafts
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-card border border-primary/10 rounded-xl overflow-hidden card-hover h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold font-playfair">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {category.count} of handcrafted excellence
                  </p>
                  <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                    Browse Collection
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
}
