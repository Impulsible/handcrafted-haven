"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Heart, Globe, Shield, Award, Star, Users, Sparkles } from "lucide-react";

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
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-dancing text-primary">
                  Handcrafted Haven
                </span>
              </div>
              <p className="text-muted-foreground">
                Connecting artisans with appreciative buyers worldwide. Every purchase supports a creative entrepreneur.
              </p>
              <div className="flex items-center space-x-2 pt-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Verified Artisans Only</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Marketplace</h3>
              <ul className="space-y-2">
                <li><Link href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Sparkles className="h-3 w-3" />Discover Collections</Link></li>
                <li><Link href="/artisans/apply" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Users className="h-3 w-3" />Become an Artisan</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Award className="h-3 w-3" />Our Story</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Star className="h-3 w-3" />Creator Spotlight</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Shop By Category</h3>
              <ul className="space-y-2">
                <li><Link href="/category/pottery" className="text-muted-foreground hover:text-primary transition-colors">Pottery & Ceramics</Link></li>
                <li><Link href="/category/jewelry" className="text-muted-foreground hover:text-primary transition-colors">Handcrafted Jewelry</Link></li>
                <li><Link href="/category/woodwork" className="text-muted-foreground hover:text-primary transition-colors">Artisan Woodwork</Link></li>
                <li><Link href="/category/textiles" className="text-muted-foreground hover:text-primary transition-colors">Textiles & Weaving</Link></li>
                <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium mt-2 inline-block">View All Categories →</Link></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-playfair">Connect With Us</h3>
              <p className="text-muted-foreground mb-4">
                Join our community of creators and collectors.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="p-2 hover:bg-primary/10 rounded-full transition-colors hover:scale-110" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-foreground hover:text-blue-600" />
                </a>
                <a href="#" className="p-2 hover:bg-primary/10 rounded-full transition-colors hover:scale-110" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-foreground hover:text-pink-600" />
                </a>
                <a href="#" className="p-2 hover:bg-primary/10 rounded-full transition-colors hover:scale-110" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-foreground hover:text-blue-400" />
                </a>
                <a href="#" className="p-2 hover:bg-primary/10 rounded-full transition-colors hover:scale-110" aria-label="Website">
                  <Globe className="h-5 w-5 text-foreground hover:text-green-600" />
                </a>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  💌 Subscribe to our newsletter for artisan stories & exclusive offers.
                </p>
                <div className="mt-2 flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button className="px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Handcrafted Haven. All artisan works are authentic and handmade.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sustainability" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sustainability Pledge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}