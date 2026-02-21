import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const artisans = [
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    craft: "Pottery Artist",
    location: "Oaxaca, Mexico",
    rating: 4.9,
    products: 42,
    story: "Specializing in traditional Zapotec pottery techniques passed down through generations.",
    image: "/images/artisans/elena.jpg",
  },
  {
    id: "james-watanabe",
    name: "James Watanabe",
    craft: "Woodworker",
    location: "Portland, OR",
    rating: 5.0,
    products: 28,
    story: "Creates sustainable furniture from reclaimed wood with Japanese joinery techniques.",
    image: "/images/artisans/james.jpg",
  },
];

export default function ArtisanSpotlight() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-playfair">
            Artisan <span className="text-gradient">Spotlight</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the talented creators behind our most beloved products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {artisans.map((artisan) => (
            <div
              key={artisan.name}
              className="bg-card border border-primary/10 rounded-2xl overflow-hidden card-hover"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Artisan Image */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <Image
                      src={artisan.image}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Artisan Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold font-playfair">
                          {artisan.name}
                        </h3>
                        <p className="text-lg text-primary">{artisan.craft}</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-semibold">{artisan.rating}</span>
                      </div>
                    </div>

                    {/* Location & Products */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {artisan.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {artisan.products} products
                      </div>
                    </div>

                    {/* Story */}
                    <p className="text-muted-foreground mb-6">
                      {artisan.story}
                    </p>

                    {/* Actions - FIXED with template strings */}
                    <div className="flex gap-4">
                      <Link href={`/artisans/${artisan.id}`}>
                        <Button variant="outline">View Profile</Button>
                      </Link>
                      <Link href={`/marketplace?artisan=${artisan.id}`}>
                        <Button>Shop Collection</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become Artisan CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-playfair">
              Ready to share your craft with the world?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join our community of artisans and start selling your handmade creations today.
            </p>
            <Link href="/become-artisan">
              <Button size="lg" className="px-8 group">
                Become an Artisan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}