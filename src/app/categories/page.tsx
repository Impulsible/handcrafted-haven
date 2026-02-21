import Link from "next/link";
import { categories } from "@/data/products";
import { ArrowRight, Package, Sparkles } from "lucide-react";

export default function CategoriesPage() {
  // Calculate total products
  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-semibold text-primary">BROWSE COLLECTIONS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Artisan <span className="text-gradient">Categories</span>
            </h1>
            <p className="text-xl text-text/70 mb-8">
              Explore {totalProducts}+ unique handmade items across {categories.length} categories, 
              each crafted with passion by talented artisans.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center px-4 py-2 bg-primary/5 rounded-full">
                <Package className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium">{totalProducts} Total Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-organic-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${category.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{category.icon}</span>
                </div>

                {/* Category Info */}
                <h3 className="text-2xl font-heading font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-text/60 mb-4">
                  {category.count} unique handmade items
                </p>

                {/* Product Preview */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-card"
                      />
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-medium">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Categories CTA */}
      <div className="bg-primary/5 border-t border-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-text/70 mb-8 max-w-2xl mx-auto">
            Browse all products in our marketplace or search for specific items
          </p>
          <Link href="/marketplace">
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:shadow-lg transition-shadow">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}