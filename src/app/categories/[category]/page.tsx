import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/data/products";
import ProductCard from '../../../components/product/ProductCard';
import { ArrowLeft, Package, Filter, SortAsc, Grid3x3 } from "lucide-react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  // Find the category
  const categoryInfo = categories.find(c => c.slug === category);
  
  if (!categoryInfo) {
    notFound();
  }
  
  // Get products for this category
  const products = getProductsByCategory(category);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Category Header */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-primary font-medium">{categoryInfo.name}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl ${categoryInfo.color} bg-opacity-20 flex items-center justify-center`}>
                  <span className="text-4xl">{categoryInfo.icon}</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold">
                    {categoryInfo.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center text-text/60">
                      <Package className="w-4 h-4 mr-1" />
                      <span>{products.length} products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-card border border-primary/10 rounded-xl">
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-primary" />
                <span className="font-medium">Showing {products.length} products</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <SortAsc className="w-4 h-4" />
                  <span>Sort</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          // No products found
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-12 h-12 text-primary/40" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-3">No products found</h2>
            <p className="text-text/60 mb-8 max-w-md mx-auto">
              We couldn't find any products in this category. Check back soon or browse other categories.
            </p>
            <Link href="/categories">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:shadow-lg transition-shadow">
                Browse All Categories
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Related Categories */}
      <div className="bg-primary/5 border-t border-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold mb-8 text-center">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(c => c.slug !== category)
              .slice(0, 4)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group p-4 bg-card border border-primary/10 rounded-xl hover:shadow-organic-lg transition-all hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-lg ${cat.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text/60">{cat.count} items</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
