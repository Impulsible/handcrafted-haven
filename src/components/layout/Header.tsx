"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  Heart,
  X,
  ChevronRight,
  Home,
  Store,
  Users,
  Grid,
  Info,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Package,
  LogOut,
  Settings,
  CreditCard,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useFavorite } from '@/hooks/useFavorite';
import CartIcon from "@/components/cart/CartIcon";

// Promo messages
const promoMessages = [
  { id: 1, text: '✨ Free Shipping on Orders Over ', type: 'shipping' },
  { id: 2, text: '🎨 New Artisan Collection Just Dropped', type: 'new' },
  { id: 3, text: '🌟 Artisan Spotlight: Meet Our Featured Creator', type: 'spotlight' },
  { id: 4, text: '⚡ Flash Sale: 24 Hours Only - 30% Off Textiles', type: 'sale' },
  { id: 5, text: '🎭 Upcoming Workshop: Pottery Basics This Saturday', type: 'event' },
  { id: 6, text: '🍀 Spring Collection - Fresh Designs for the Season', type: 'seasonal' },
  { id: 7, text: '🌱 Sustainable Crafting Month - Eco-friendly Products', type: 'sustainable' }
];

const APP_VERSION = "v2.1.4";

// Navigation with dropdown support
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  dropdown?: {
    label: string;
    items: Array<{ href: string; label: string; description?: string }>;
  };
}

const navigationItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: <Home className="h-5 w-5" />
  },
  {
    href: "/marketplace",
    label: "Marketplace",
    icon: <Store className="h-5 w-5" />,
    dropdown: {
      label: "Marketplace",
      items: [
        { href: "/marketplace/all", label: "All Products", description: "Browse all handmade items" },
        { href: "/marketplace/featured", label: "Featured", description: "Curated collections" },
        { href: "/marketplace/new", label: "New Arrivals", description: "Fresh from artisans" },
        { href: "/marketplace/best-sellers", label: "Best Sellers", description: "Community favorites" },
        { href: "/marketplace/sale", label: "On Sale", description: "Special discounts" }
      ]
    }
  },
  {
    href: "/artisans",
    label: "Artisans",
    icon: <Users className="h-5 w-5" />,
    dropdown: {
      label: "Artisans",
      items: [
        { href: "/artisans/all", label: "All Artisans", description: "Meet our creators" },
        { href: "/artisans/featured", label: "Featured Artisans", description: "Spotlight creators" },
        { href: "/artisans/nearby", label: "Local Artisans", description: "Discover nearby makers" },
        { href: "/artisans/workshops", label: "Workshops", description: "Learn from experts" },
        { href: "/artisans/stories", label: "Stories", description: "Behind the craft" }
      ]
    }
  },
  {
    href: "/categories",
    label: "Categories",
    icon: <Grid className="h-5 w-5" />,
    dropdown: {
      label: "Categories",
      items: [
        { href: "/categories/pottery", label: "Pottery & Ceramics", description: "Hand-thrown pieces" },
        { href: "/categories/textiles", label: "Textiles & Weaving", description: "Woven wonders" },
        { href: "/categories/jewelry", label: "Jewelry", description: "Handcrafted adornments" },
        { href: "/categories/woodwork", label: "Woodwork", description: "Carved creations" },
        { href: "/categories/glass", label: "Glass Art", description: "Blown glass pieces" },
        { href: "/categories/metal", label: "Metalwork", description: "Forged and formed" },
        { href: "/categories/paper", label: "Paper Crafts", description: "Delicate paper art" }
      ]
    }
  },
  {
    href: "/about",
    label: "About",
    icon: <Info className="h-5 w-5" />
  }
];

// Mock user data
const mockUser = {
  isLoggedIn: false,
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "AJ",
  orders: 3,
  wishlistItems: 12
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const { handleFavoriteAction } = useFavorite();

  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
        setIsUserMenuOpen(false);
        
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  
  // User menu handlers
  const handleLogin = () => {
    toast.success("Welcome back! Redirecting to dashboard...");
    setIsUserMenuOpen(false);
    router.push('/auth/signin');
  };

  const handleLogout = () => {
    toast.info("Logged out successfully");
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Promo Animation Bar */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 overflow-hidden py-1.5">
        <div className="container mx-auto px-3 py-1.5">
          <div className="flex items-center justify-between">
            <button
              onClick={prevPromo}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Previous promo"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            </button>

            <div className="flex-1 flex justify-center items-center px-10">
              <div className="text-center overflow-hidden">
                <div
                  key={promoMessages[currentPromoIndex].id}
                  className="inline-flex items-center gap-1.5"
                >
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getPromoColor(promoMessages[currentPromoIndex].type)}`}>
                    {promoMessages[currentPromoIndex].type.toUpperCase()}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {promoMessages[currentPromoIndex].text}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={nextPromo}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Next promo"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5">
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
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors tracking-tight whitespace-nowrap font-dancing">
                  Handcrafted Haven
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1.5 dropdown-container">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.href)}
                    onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 rounded-lg transition-all duration-300 group flex items-center gap-1"
                      onMouseEnter={() => setHoveredNav(item.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      <div className={`
                        absolute inset-0 rounded-lg transition-all duration-300
                        ${active
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30'
                          : hoveredNav === item.href
                            ? 'bg-primary/5'
                            : ''
                        }
                      `} />

                      <div className={`
                        absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary transition-all duration-300
                        ${active ? 'w-7 opacity-100' : 'opacity-0 group-hover:w-4 group-hover:opacity-70'}
                      `} />

                      <span className={`
                        relative z-10 text-[15px] font-medium transition-all duration-300 whitespace-nowrap
                        ${active
                          ? 'text-primary font-semibold'
                          : 'text-foreground group-hover:text-primary'
                        }
                      `}>
                        {item.label}
                      </span>

                      {item.dropdown && (
                        <ChevronDown className={`
                          relative z-10 h-3.5 w-3.5 transition-transform duration-300 ml-0.5
                          ${activeDropdown === item.href ? 'rotate-180 text-primary' : 'text-muted-foreground'}
                        `} />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.dropdown && activeDropdown === item.href && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-primary/20 rounded-xl shadow-lg overflow-hidden z-50">
                        <div className="p-4 border-b border-primary/10 bg-primary/5">
                          <h3 className="font-semibold text-primary">{item.dropdown.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Browse all options</p>
                        </div>
                        <div className="p-2">
                          {item.dropdown.items.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex flex-col p-3 rounded-lg hover:bg-primary/5 transition-colors group/item"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="font-medium text-foreground group-hover/item:text-primary">
                                {dropdownItem.label}
                              </span>
                              {dropdownItem.description && (
                                <span className="text-sm text-muted-foreground mt-1">
                                  {dropdownItem.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 dropdown-container">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="pl-9 pr-3 py-2 w-40 rounded-full border border-primary/20 bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Wishlist */}
              <button
                onClick={() => handleFavoriteAction("view")}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors hidden sm:inline-flex relative group"
              >
                <Heart className="h-4.5 w-4.5 text-foreground group-hover:scale-110 transition-transform" />
                {mockUser.wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4.5 w-4.5 rounded-full bg-accent text-white text-[11px] flex items-center justify-center font-bold shadow-sm">
                    {mockUser.wishlistItems > 9 ? '9+' : mockUser.wishlistItems}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <CartIcon />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {mockUser.isLoggedIn ? mockUser.avatar : '?'}
                    </span>
                  </div>
                  <span className="text-[15px] font-medium">
                    {mockUser.isLoggedIn ? mockUser.name : 'Sign In'}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-primary/20 rounded-xl shadow-lg overflow-hidden z-50">
                    {mockUser.isLoggedIn ? (
                      <>
                        <div className="p-4 border-b border-primary/10 bg-primary/5">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {mockUser.avatar}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{mockUser.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">
                                {mockUser.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4 text-primary" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="h-4 w-4 text-primary" />
                            <span>My Orders ({mockUser.orders})</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4 text-primary" />
                            <span>Wishlist ({mockUser.wishlistItems})</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 text-primary" />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 w-full text-left transition-colors text-destructive"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 border-b border-primary/10 bg-primary/5">
                          <h3 className="font-semibold text-primary">Welcome!</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Sign in to access your account
                          </p>
                        </div>

                        <div className="p-4">
                          <Button
                            className="w-full mb-3 bg-gradient-to-r from-primary to-secondary"
                            onClick={handleLogin}
                          >
                            Sign In
                          </Button>
                          <Link
                            href="/auth/register"
                            className="block w-full text-center text-sm text-primary hover:underline"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Create an account
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-foreground" />
                  ) : (
                    <Menu className="h-6 w-6 text-foreground" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4 pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search artisans, products, categories..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-primary/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <ShoppingBag className="h-6.5 w-6.5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary tracking-tight font-dancing">
                      Handcrafted Haven
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Cart: {itemCount} items
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ${totalPrice.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5.5 w-5.5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="p-5">
              <nav className="space-y-1.5">
                {navigationItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <div key={item.href} className="space-y-1">
                      <Link
                        href={item.href}
                        className={`relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${active ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${active ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                            {item.icon}
                          </div>
                          <span className={`font-medium ${active ? 'text-primary font-semibold' : 'text-foreground'}`}>
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="my-7">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3.5 mb-7">
                <div className="text-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="text-xl font-bold text-primary">{itemCount}</div>
                  <div className="text-xs text-muted-foreground">Items</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
                  <div className="text-xl font-bold text-secondary">${totalPrice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors">
                  <div className="text-xl font-bold text-accent">{mockUser.wishlistItems}</div>
                  <div className="text-xs text-muted-foreground">Wishlist</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3.5 mb-7">
                <Button
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/cart');
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Cart ({itemCount} items)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/checkout');
                  }}
                >
                  <CreditCard className="h-5 w-5" />
                  Proceed to Checkout
                </Button>
              </div>

              {/* User Section */}
              <div className="rounded-xl p-5 mb-7 bg-gradient-to-r from-primary/5 to-transparent">
                {mockUser.isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{mockUser.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-sm">{mockUser.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{mockUser.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-3.5"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-sm">Welcome!</h3>
                        <p className="text-xs text-muted-foreground">Sign in to your account</p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3.5 bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogin();
                      }}
                    >
                      Sign In / Register
                    </Button>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3.5">
                <h4 className="font-semibold text-foreground text-sm">Contact Information</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="text-xs">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="text-xs">support@handcraftedhaven.com</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-xs">123 Artisan Street, Creative City</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with App Version */}
            <div className="sticky bottom-0 bg-background border-t border-primary/10 p-5 mt-7">
              <div className="text-center">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Handcrafted Haven {APP_VERSION}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  Ãƒâ€šÃ‚Â© {new Date().getFullYear()} All artisan works are authentic and handmade
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}







