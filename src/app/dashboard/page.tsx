/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  Star,
  Settings,
  User,
  MapPin,
  CreditCard,
  Bell,
  ShoppingBag,
  Award,
  Eye,
  ShoppingCart,
  LogOut,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

interface Order {
  id: string;
  order_number: string;
  date: string;
  status: string;
  total: number;
}

interface DashboardStats {
  orders: number;
  wishlistItems: number;
  reviews: number;
  artisanProducts: number;
  totalSpent: number;
  recentOrders: Order[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    orders: 0,
    wishlistItems: 0,
    reviews: 0,
    artisanProducts: 0,
    totalSpent: 0,
    recentOrders: []
  });

  useEffect(() => {
    const init = async () => {
      await checkSession();
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (data.authenticated) {
        setUser(data.user);
        await fetchDashboardData(data.user.id);
      } else {
        router.push('/auth/signin');
      }
    } catch {
      router.push('/auth/signin');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async (userId: string) => {
    try {
      // Fetch stats
      const statsRes = await fetch(`/api/user/stats?userId=${userId}`);
      const statsData = await statsRes.json();

      // Mock recent orders - replace with actual API call
      const mockOrders: Order[] = [
        {
          id: '1',
          order_number: 'ORD-2024-001',
          date: '2024-02-15',
          status: 'delivered',
          total: 245.99
        },
        {
          id: '2',
          order_number: 'ORD-2024-002',
          date: '2024-02-10',
          status: 'processing',
          total: 129.50
        },
        {
          id: '3',
          order_number: 'ORD-2024-003',
          date: '2024-02-05',
          status: 'shipped',
          total: 89.99
        }
      ];

      if (statsData.success) {
        setStats({
          ...statsData.stats,
          recentOrders: mockOrders,
          totalSpent: 465.48
        });
      }
    } catch {
      toast.error('Failed to load dashboard data');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.push('/');
      }
    } catch {
      toast.error('Failed to sign out');
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-background border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">My Dashboard</h1>
              {user.is_artisan && (
                <Badge className="bg-secondary text-white">Artisan</Badge>
              )}
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl border border-primary/10 p-6 sticky top-24">
              {/* User Profile */}
              <div className="text-center mb-6">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                  {stats.orders > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {stats.orders}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/dashboard/wishlist"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                  {stats.wishlistItems > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {stats.wishlistItems}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/dashboard/reviews"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Star className="h-5 w-5" />
                  <span>My Reviews</span>
                  {stats.reviews > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {stats.reviews}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/dashboard/addresses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Addresses</span>
                </Link>
                <Link
                  href="/dashboard/payment"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </Link>
                <Link
                  href="/dashboard/notifications"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </nav>

              {user.is_artisan && (
                <>
                  <div className="border-t border-primary/10 my-4"></div>
                  <div className="space-y-1">
                    <Link
                      href="/dashboard/artisan"
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 text-secondary font-medium"
                    >
                      <Award className="h-5 w-5" />
                      <span>Artisan Studio</span>
                    </Link>
                    <Link
                      href="/dashboard/artisan/products"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>My Products</span>
                      {stats.artisanProducts > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {stats.artisanProducts}
                        </Badge>
                      )}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Welcome back, {user.name}! 👋
                    </h2>
                    <p className="text-muted-foreground">
                      Here's what's happening with your account today.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <ShoppingBag className="h-16 w-16 text-primary/30" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold mt-1">{stats.orders}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Wishlist Items</p>
                      <p className="text-2xl font-bold mt-1">{stats.wishlistItems}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                      <p className="text-2xl font-bold mt-1">{stats.reviews}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold mt-1">${stats.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist Preview</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your latest orders and their status
                    </p>
                  </CardHeader>
                  <CardContent>
                    {stats.recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {stats.recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Package className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Order #{order.order_number}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                              <span className="font-bold">${order.total.toFixed(2)}</span>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">No orders yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Start shopping to see your orders here
                        </p>
                        <Button onClick={() => router.push('/marketplace')}>
                          Browse Marketplace
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Wishlist Preview</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Items you've saved for later
                    </p>
                  </CardHeader>
                  <CardContent>
                    {stats.wishlistItems > 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-accent" />
                        <h3 className="font-semibold mb-2">
                          You have {stats.wishlistItems} items in your wishlist
                        </h3>
                        <Button
                          variant="outline"
                          onClick={() => router.push('/dashboard/wishlist')}
                        >
                          View All
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Your wishlist is empty</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Save items you love to your wishlist
                        </p>
                        <Button onClick={() => router.push('/marketplace')}>
                          Explore Products
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your recent interactions on the platform
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Eye className="h-4 w-4 text-primary" />
                        </div>
                        <p>You viewed <span className="font-medium">Hand-Thrown Stoneware Vase</span></p>
                        <span className="text-muted-foreground ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-accent" />
                        </div>
                        <p>Added <span className="font-medium">Silver Filigree Earrings</span> to wishlist</p>
                        <span className="text-muted-foreground ml-auto">Yesterday</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-green-500" />
                        </div>
                        <p>Purchased <span className="font-medium">Walnut End-Grain Board</span></p>
                        <span className="text-muted-foreground ml-auto">3 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on your browsing history and preferences
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/product/${i}`)}
                    >
                      <div className="aspect-square rounded-lg bg-muted mb-2 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform"></div>
                      </div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        Product Name
                      </h4>
                      <p className="text-sm text-muted-foreground">$XX.XX</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}