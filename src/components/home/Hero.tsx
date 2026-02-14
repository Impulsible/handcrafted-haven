import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero1.jpg"
          alt="Handcrafted Artisan Products"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 animate-fade-in">
          Handcrafted Haven
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 animate-fade-in animation-delay-200">
          Discover unique artisan crafts made with passion and tradition. 
          Each piece tells a story of skill, dedication, and natural beauty.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Shop Collection
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
          >
            Meet Artisans
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
