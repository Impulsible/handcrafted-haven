import Link from "next/link";
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-dancing text-primary">
                  Handcrafted Haven
                </span>
              </div>
              <p className="text-muted-foreground">
                Connecting artisans with appreciative buyers worldwide. Every purchase supports a creative entrepreneur.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link href="/artisans" className="text-muted-foreground hover:text-primary transition-colors">Become an Artisan</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/category/pottery" className="text-muted-foreground hover:text-primary transition-colors">Pottery & Ceramics</Link></li>
                <li><Link href="/category/jewelry" className="text-muted-foreground hover:text-primary transition-colors">Jewelry</Link></li>
                <li><Link href="/category/woodwork" className="text-muted-foreground hover:text-primary transition-colors">Woodwork</Link></li>
                <li><Link href="/category/textiles" className="text-muted-foreground hover:text-primary transition-colors">Textiles</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Contact Us</h3>
              <p className="text-muted-foreground mb-4">
                Have questions? We&apos;re here to help artisans and buyers alike.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <Facebook className="h-5 w-5 text-foreground" />
                </a>
                <a href="#" className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <Instagram className="h-5 w-5 text-foreground" />
                </a>
                <a href="#" className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <Twitter className="h-5 w-5 text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Handcrafted Haven. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Crafted with <Heart className="inline h-4 w-4 text-secondary" /> by WDD 430 Students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
