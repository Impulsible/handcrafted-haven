import Link from "next/link";
import { ShoppingBag, Search, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-dancing text-primary">
                Handcrafted Haven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors font-medium">
              Marketplace
            </Link>
            <Link href="/artisans" className="text-foreground hover:text-primary transition-colors font-medium">
              Artisans
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors font-medium">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent/10 rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-accent/10 rounded-full transition-colors">
              <Heart className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-accent/10 rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <Button variant="outline" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <button className="md:hidden p-2 hover:bg-accent/10 rounded-full transition-colors">
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
