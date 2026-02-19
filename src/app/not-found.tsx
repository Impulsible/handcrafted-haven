import Link from "next/link";
import { Suspense } from "react";
import { Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

function NotFoundContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <span className="text-7xl font-heading font-bold text-primary/30">404</span>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Page Not Found
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Oops! <span className="text-gradient">Lost your way?</span>
        </h1>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-5 text-base w-full sm:w-auto">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" className="border-primary text-primary px-6 py-5 text-base w-full sm:w-auto">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Marketplace
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="text-sm text-muted-foreground mb-4">
            Popular destinations:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/categories" className="text-sm text-primary hover:underline">
              Categories
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/artisans" className="text-sm text-primary hover:underline">
              Artisans
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/cart" className="text-sm text-primary hover:underline">
              Cart
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/about" className="text-sm text-primary hover:underline">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-40 h-40 mx-auto rounded-full bg-primary/10 mb-8"></div>
          <div className="h-8 w-64 bg-primary/10 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-96 bg-primary/10 rounded mx-auto"></div>
        </div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}