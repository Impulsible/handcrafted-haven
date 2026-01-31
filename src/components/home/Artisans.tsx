import Image from "next/image";

const artisans = [
  {
    id: 1,
    name: "Elena Rodriguez",
    craft: "Pottery & Ceramics",
    location: "Oaxaca, Mexico",
    experience: "15 years",
    description: "Specializes in traditional Mexican pottery techniques passed down through generations.",
    image: "/images/artisans/elena.jpg",
    products: ["Bowls", "Mugs", "Vases", "Platters"],
  },
  {
    id: 2,
    name: "James Wilson",
    craft: "Woodworking",
    location: "Portland, Oregon",
    experience: "12 years",
    description: "Creates functional art from reclaimed and sustainably sourced woods.",
    image: "/images/artisans/james.jpg",
    products: ["Furniture", "Cutting Boards", "Bowls", "Sculptures"],
  },
  {
    id: 3,
    name: "Sophia Chen",
    craft: "Jewelry Making",
    location: "San Francisco, CA",
    experience: "8 years",
    description: "Blends traditional metalwork with contemporary design using ethically sourced materials.",
    image: "/images/artisans/sophia.jpg",
    products: ["Necklaces", "Earrings", "Rings", "Bracelets"],
  },
  {
    id: 4,
    name: "Michael Johnson",
    craft: "Leatherwork",
    location: "Austin, Texas",
    experience: "10 years",
    description: "Creates durable, beautiful leather goods using traditional vegetable tanning methods.",
    image: "/images/artisans/michael.jpg",
    products: ["Wallets", "Belts", "Bags", "Journal Covers"],
  },
];

export default function Artisans() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            Meet Our Artisans
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Skilled craftspeople dedicated to preserving traditional techniques while creating modern heirlooms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="artisan-card hover:shadow-organic-lg transition-all duration-300"
            >
              {/* Artisan Image */}
              <div className="relative h-64">
                <div className="absolute inset-0 rounded-t-lg overflow-hidden">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{artisan.name}</h3>
                  <p className="text-white/90">{artisan.craft}</p>
                </div>
              </div>

              {/* Artisan Details */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center text-text/60 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {artisan.location}
                  </div>
                  <div className="flex items-center text-text/60 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {artisan.experience} experience
                  </div>
                </div>

                <p className="text-text/80 mb-4">{artisan.description}</p>

                <div>
                  <h4 className="font-medium text-text mb-2">Specializes in:</h4>
                  <div className="flex flex-wrap gap-2">
                    {artisan.products.map((product) => (
                      <span
                        key={product}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
