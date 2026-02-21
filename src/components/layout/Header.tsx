/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ChevronDown,
  LayoutDashboard,
  Star,
  Clock,
  Award,
  TrendingUp,
  Bell,
  HelpCircle,
  LogIn,
  UserCircle,
  Bookmark,
  MapPin as MapPinIcon,
  Shield,
  Truck
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useFavorite } from '@/hooks/useFavorite';
import CartIcon from "@/components/cart/CartIcon";

// Promo messages
const promoMessages = [
  { id: 1, text: '✨ Free Shipping on Orders Over $50', type: 'shipping' },
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

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  is_artisan: boolean;
  created_at: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    wishlistItems: 0,
    reviews: 0,
    artisanProducts: 0
  });

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (data.authenticated) {
        setUser(data.user);
        fetchUserStats(data.user.id);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/stats?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        setIsUserMenuOpen(false);
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
                onClick={() => router.push('/dashboard/wishlist')}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors hidden sm:inline-flex relative group"
              >
                <Heart className="h-4.5 w-4.5 text-foreground group-hover:scale-110 transition-transform" />
                {stats.wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4.5 w-4.5 rounded-full bg-accent text-white text-[11px] flex items-center justify-center font-bold shadow-sm">
                    {stats.wishlistItems > 9 ? '9+' : stats.wishlistItems}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <CartIcon />

              {/* User Menu */}
              <div className="relative">
                {!isLoading && (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user ? getUserInitials() : '?'}
                      </span>
                    </div>
                    <span className="text-[15px] font-medium max-w-[100px] truncate">
                      {user ? user.name.split(' ')[0] : 'Sign In'}
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-background border border-primary/20 rounded-xl shadow-lg overflow-hidden z-50">
                    {user ? (
                      <>
                        {/* User Header */}
                        <div className="p-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-secondary/5">
                          <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-xl">
                                {getUserInitials()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {user.is_artisan ? 'Artisan' : 'Collector'}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Member since {new Date(user.created_at).getFullYear()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 p-3 bg-muted/30">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{stats.orders}</div>
                            <div className="text-xs text-muted-foreground">Orders</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{stats.wishlistItems}</div>
                            <div className="text-xs text-muted-foreground">Wishlist</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{stats.reviews}</div>
                            <div className="text-xs text-muted-foreground">Reviews</div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {/* Dashboard - Main Link */}
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors mb-2"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <span className="font-semibold text-primary">Dashboard</span>
                              <p className="text-xs text-muted-foreground">Manage your account</p>
                            </div>
                          </Link>

                          <div className="border-t border-primary/10 my-2"></div>

                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserCircle className="h-4 w-4 text-primary" />
                            <span>My Profile</span>
                          </Link>

                          <Link
                            href="/dashboard/orders"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="h-4 w-4 text-primary" />
                            <span className="flex-1">My Orders</span>
                            {stats.orders > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {stats.orders}
                              </Badge>
                            )}
                          </Link>

                          <Link
                            href="/dashboard/wishlist"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4 text-primary" />
                            <span className="flex-1">Wishlist</span>
                            {stats.wishlistItems > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {stats.wishlistItems}
                              </Badge>
                            )}
                          </Link>

                          <Link
                            href="/dashboard/reviews"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Star className="h-4 w-4 text-primary" />
                            <span className="flex-1">My Reviews</span>
                            {stats.reviews > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {stats.reviews}
                              </Badge>
                            )}
                          </Link>

                          <Link
                            href="/dashboard/addresses"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <MapPinIcon className="h-4 w-4 text-primary" />
                            <span>Addresses</span>
                          </Link>

                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 text-primary" />
                            <span>Settings</span>
                          </Link>

                          {user.is_artisan && (
                            <>
                              <div className="border-t border-primary/10 my-2"></div>
                              <Link
                                href="/dashboard/artisan"
                                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Award className="h-4 w-4 text-secondary" />
                                <span className="flex-1">Artisan Studio</span>
                                {stats.artisanProducts > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {stats.artisanProducts}
                                  </Badge>
                                )}
                              </Link>
                            </>
                          )}

                          <div className="border-t border-primary/10 my-2"></div>

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
                        <div className="p-6 text-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-1">Welcome!</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Sign in to access your dashboard and manage your account
                          </p>
                          <Button
                            className="w-full mb-2 bg-gradient-to-r from-primary to-secondary"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              router.push('/auth/signin');
                            }}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Button>
                          <Link
                            href="/auth/signup"
                            className="block w-full text-sm text-primary hover:underline"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Create an account
                          </Link>
                        </div>

                        <div className="border-t border-primary/10 p-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>New here?</span>
                            <Link href="/about" className="text-primary hover:underline">
                              Learn more
                            </Link>
                          </div>
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
              {/* User Section for Mobile */}
              {user && (
                <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{getUserInitials()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <Link
                      href="/dashboard"
                      className="p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="text-xs">Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="text-xs">Orders</span>
                    </Link>
                    <Link
                      href="/dashboard/wishlist"
                      className="p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Heart className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="text-xs">Wishlist</span>
                    </Link>
                  </div>
                </div>
              )}

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

              {/* Auth Section for Mobile */}
              {!user && (
                <div className="rounded-xl p-5 mb-7 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-sm">Welcome!</h3>
                      <p className="text-xs text-muted-foreground">Sign in to your account</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/auth/signin');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/auth/signup');
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              )}

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