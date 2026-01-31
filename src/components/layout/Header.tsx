"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, Heart, X, ChevronRight, Home, Store, Users, Grid, Info, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const promoMessages = [
  { id: 1, text: "🚚 Free Shipping on Orders Over $50", type: "shipping" },
  { id: 2, text: "✨ New Artisan Collection Just Dropped", type: "new" },
  { id: 3, text: "🎨 Artisan Spotlight: Meet Our Featured Creator", type: "spotlight" },
  { id: 4, text: "🔥 Flash Sale: 24 Hours Only - 30% Off Textiles", type: "sale" },
  { id: 5, text: "🎭 Upcoming Workshop: Pottery Basics This Saturday", type: "event" },
  { id: 6, text: "💝 Valentine's Collection - Limited Edition Pieces", type: "seasonal" },
  { id: 7, text: "🌿 Sustainable Crafting Month - Eco-friendly Products", type: "sustainable" }
];

const APP_VERSION = "v2.1.4";

const navigationItems = [
  { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "/marketplace", label: "Marketplace", icon: <Store className="h-5 w-5" /> },
  { href: "/artisans", label: "Artisans", icon: <Users className="h-5 w-5" /> },
  { href: "/categories", label: "Categories", icon: <Grid className="h-5 w-5" /> },
  { href: "/about", label: "About", icon: <Info className="h-5 w-5" /> },
] as const;


export default function Header() {
  const pathname = usePathname();
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Auto-rotate promo messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const nextPromo = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length);
  };

  const prevPromo = () => {
    setCurrentPromoIndex((prev) => (prev - 1 + promoMessages.length) % promoMessages.length);
  };

  const getPromoColor = (type: string) => {
    switch(type) {
      case 'sale': return 'bg-secondary text-white';
      case 'new': return 'bg-accent text-white';
      case 'event': return 'bg-primary text-white';
      default: return 'bg-primary/10 text-primary';
    }
  };

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Promo Animation Bar - Always visible */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <button 
              onClick={prevPromo}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Previous promo"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>

            <div className="flex-1 flex justify-center items-center px-12">
              <div className="text-center overflow-hidden">
                <div 
                  key={promoMessages[currentPromoIndex].id}
                  className="inline-flex items-center gap-2 animate-slide-in"
                >
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPromoColor(promoMessages[currentPromoIndex].type)}`}>
                    {promoMessages[currentPromoIndex].type.toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {promoMessages[currentPromoIndex].text}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={nextPromo}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Next promo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
              {promoMessages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoIndex(index)}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${index === currentPromoIndex ? 'bg-primary' : 'bg-primary/30'}`}
                  aria-label={`Go to promo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-dancing text-primary group-hover:text-primary/90 transition-colors">
                  Handcrafted Haven
                </span>
              </Link>
            </div>

            {/* Desktop Navigation with Animated Active State */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                    onMouseEnter={() => setHoveredNav(item.href)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {/* Animated Background */}
                    <div className={`
                      absolute inset-0 rounded-lg transition-all duration-300
                      ${active 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-organic' 
                        : hoveredNav === item.href 
                          ? 'bg-primary/5' 
                          : ''
                      }
                    `} />
                    
                    {/* Animated Dot Indicator */}
                    <div className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary transition-all duration-300
                      ${active ? 'w-8 opacity-100' : 'opacity-0 group-hover:w-4 group-hover:opacity-70'}
                    `} />
                    
                    {/* Text */}
                    <span className={`
                      relative z-10 font-medium transition-all duration-300
                      ${active 
                        ? 'text-primary font-semibold' 
                        : 'text-foreground group-hover:text-primary'
                      }
                    `}>
                      {item.label}
                    </span>
                    
                    {/* Hover Effect */}
                    <div className={`
                      absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300
                      group-hover:border-primary/20
                    `} />
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 hover:bg-accent/10 rounded-full transition-colors hidden sm:inline-flex relative group">
                <Search className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Search
                </span>
              </button>
              <button className="p-2 hover:bg-accent/10 rounded-full transition-colors hidden sm:inline-flex relative group">
                <Heart className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Wishlist
                </span>
              </button>
              <button className="p-2 hover:bg-accent/10 rounded-full transition-colors relative group">
                <ShoppingBag className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                  3
                </span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Cart (3 items)
                </span>
              </button>
              <Button 
                variant="outline" 
                className="hidden sm:flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-all duration-300 relative group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-foreground rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-foreground group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {isMobileMenuOpen ? "Close Menu" : "Menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Mobile Menu with Animated Active Nav */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background z-50 animate-slide-in-horizontal overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-primary/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-dancing text-primary">Handcrafted Haven</h2>
                    <p className="text-sm text-muted-foreground">Artisan Marketplace</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Animated Mobile Navigation */}
            <div className="p-6">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {/* Animated Background */}
                      <div className={`
                        absolute inset-0 rounded-xl transition-all duration-300
                        ${active 
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10' 
                          : 'group-hover:bg-primary/5'
                        }
                      `} />
                      
                      {/* Animated Border */}
                      <div className={`
                        absolute inset-0 rounded-xl border-2 transition-all duration-300
                        ${active 
                          ? 'border-primary/30' 
                          : 'border-transparent group-hover:border-primary/10'
                        }
                      `} />
                      
                      {/* Icon */}
                      <div className={`
                        relative z-10 transition-all duration-300
                        ${active 
                          ? 'text-primary scale-110' 
                          : 'text-primary/70 group-hover:text-primary group-hover:scale-110'
                        }
                      `}>
                        {item.icon}
                      </div>
                      
                      {/* Label */}
                      <span className={`
                        relative z-10 text-lg font-medium transition-all duration-300 flex-1
                        ${active 
                          ? 'text-primary font-semibold' 
                          : 'text-foreground group-hover:text-primary'
                        }
                      `}>
                        {item.label}
                      </span>
                      
                      {/* Active Indicator */}
                      <div className={`
                        relative z-10 h-2 w-2 rounded-full transition-all duration-300
                        ${active 
                          ? 'bg-primary scale-100' 
                          : 'bg-transparent scale-0'
                        }
                      `} />
                      
                      {/* Chevron */}
                      <ChevronRight className={`
                        relative z-10 h-4 w-4 transition-all duration-300
                        ${active 
                          ? 'text-primary' 
                          : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'
                        }
                      `} />
                    </Link>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="my-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <input
                    type="search"
                    placeholder="Search artisans or products..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  className="flex flex-col items-center justify-center p-4 h-auto bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Wishlist</span>
                </Button>
                <Button 
                  className="flex flex-col items-center justify-center p-4 h-auto bg-secondary/5 hover:bg-secondary/10 border border-secondary/10 hover:border-secondary/20 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="h-6 w-6 text-secondary mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Cart (3)</span>
                </Button>
              </div>

              {/* User Section */}
              <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-2xl p-6 mb-8 transition-all duration-300 hover:from-primary/10">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center hover:scale-105 transition-transform">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Welcome to Handcrafted Haven</h3>
                    <p className="text-sm text-muted-foreground mt-1">Sign in to access your account</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-organic-lg transition-all duration-300 hover:scale-[1.02]">
                  Sign In / Register
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">support@handcraftedhaven.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">123 Artisan Street, Creative City</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with App Version */}
            <div className="sticky bottom-0 bg-background border-t border-primary/10 p-6 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Handcrafted Haven {APP_VERSION}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  © {new Date().getFullYear()} All artisan works are authentic and handmade
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}