import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero1.jpg"
          alt="Artisan crafting pottery"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-secondary mr-2" />
            <span className="text-sm font-semibold text-primary">
              Discover Unique Handmade Crafts
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="font-playfair block mb-2">Where Creativity</span>
            <span className="text-gradient font-playfair">Meets Craftsmanship</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up animation-delay-150">
            Discover unique, handmade treasures crafted with passion by talented artisans worldwide. 
            Each piece tells a story of dedication, tradition, and creative expression.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
            <Button size="lg" className="group">
              Explore Marketplace
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Become an Artisan
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fade-in animation-delay-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2,000+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
