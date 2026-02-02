// src/app/marketplace/categories/page.tsx
export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Pottery & Ceramics", count: 42, color: "bg-amber-500" },
          { name: "Textiles & Weaving", count: 38, color: "bg-pink-500" },
          { name: "Woodwork", count: 56, color: "bg-yellow-700" },
          { name: "Jewelry", count: 67, color: "bg-purple-500" },
          { name: "Glass Art", count: 23, color: "bg-blue-400" },
          { name: "Metalwork", count: 31, color: "bg-gray-600" },
          { name: "Leather Goods", count: 29, color: "bg-brown-500" },
          { name: "Paper Crafts", count: 18, color: "bg-green-500" },
        ].map((category) => (
          <div
            key={category.name}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                <span className="text-white font-bold">{category.name.charAt(0)}</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{category.count}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-600 text-sm">
              Browse {category.count} unique handmade items in this category
            </p>
            
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Category
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
