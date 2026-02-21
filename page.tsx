import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ArtisanSpotlight from "@/components/home/ArtisanSpotlight";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <ArtisanSpotlight />
      <Newsletter />
    </div>
  );
}