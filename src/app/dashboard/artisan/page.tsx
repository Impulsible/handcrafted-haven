/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Package,
  ShoppingBag,
  TrendingUp,
  PlusCircle,
  Eye,
  DollarSign,
  Star,
  Clock,
  Calendar,
  Users,
  Settings,
  BarChart3,
  Edit,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtisanStats {
  totalProducts: number;
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  viewsThisMonth: number;
  conversionRate: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

interface TopProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  sales: number;
  revenue: number;
  views: number;
}

export default function ArtisanDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [artisan, setArtisan] = useState<any>(null);
  const [stats, setStats] = useState<ArtisanStats>({
    totalProducts: 0,
    totalSales: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
    viewsThisMonth: 0,
    conversionRate: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchArtisanData();
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (!data.authenticated || !data.user.is_artisan) {
        router.push('/dashboard');
      } else {
        setArtisan(data.user);
      }
    } catch {
      router.push('/auth/signin');
    }
  };

  const fetchArtisanData = async () => {
    try {
      // Mock data - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStats({
        totalProducts: 24,
        totalSales: 187,
        totalOrders: 156,
        totalRevenue: 15234.50,
        averageRating: 4.8,
        totalReviews: 89,
        viewsThisMonth: 3456,
        conversionRate: 3.2
      });

      setRecentOrders([
        {
          id: '1',
          orderNumber: 'ORD-2024-045',
          customer: 'Sarah Johnson',
          date: '2024-02-20',
          total: 245.99,
          status: 'pending',
          items: 3
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-044',
          customer: 'Michael Chen',
          date: '2024-02-19',
          total: 129.50,
          status: 'processing',
          items: 2
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-043',
          customer: 'Emma Wilson',
          date: '2024-02-18',
          total: 89.99,
          status: 'shipped',
          items: 1
        },
        {
          id: '4',
          orderNumber: 'ORD-2024-042',
          customer: 'David Brown',
          date: '2024-02-17',
          total: 399.99,
          status: 'delivered',
          items: 4
        }
      ]);

      setTopProducts([
        {
          id: 1,
          name: 'Hand-Thrown Stoneware Vase',
          image: '/images/products/pottery/vase-1.avif',
          price: 89.99,
          sales: 45,
          revenue: 4049.55,
          views: 1234
        },
        {
          id: 2,
          name: 'Silver Filigree Earrings',
          image: '/images/products/jewelry/earrings-1.avif',
          price: 89.00,
          sales: 38,
          revenue: 3382.00,
          views: 987
        },
        {
          id: 3,
          name: 'Walnut End-Grain Board',
          image: '/images/products/woodwork/cutting-board-1.avif',
          price: 79.99,
          sales: 32,
          revenue: 2559.68,
          views: 856
        }
      ]);
    } catch {
      toast.error('Failed to load artisan data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading artisan studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-secondary" />
              <h1 className="text-2xl font-bold">Artisan Studio</h1>
            </div>
            <Button
              className="bg-gradient-to-r from-secondary to-primary"
              onClick={() => router.push('/dashboard/artisan/products/new')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {artisan?.name}! 🎨
                </h2>
                <p className="text-muted-foreground">
                  Here's how your shop is performing today.
                </p>
              </div>
              <div className="hidden md:block">
                <Award className="h-16 w-16 text-secondary/30" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalProducts}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold mt-1">{stats.averageRating}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Views This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.viewsThisMonth.toLocaleString()}</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500">+12.5% from last month</span>
              </div>
              <Progress value={75} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500">+0.8% from last month</span>
              </div>
              <Progress value={stats.conversionRate * 10} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReviews}</div>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(stats.averageRating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs ml-2">({stats.averageRating} avg)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Latest orders from customers
                  </p>
                </div>
                <Button variant="outline" onClick={() => router.push('/dashboard/artisan/orders')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer} • {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>
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
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Your best-selling items this month
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20"></div>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)} • {product.sales} sold
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-primary">${product.revenue.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{product.views} views</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your product listings
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Product management coming soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visit the Products page to manage your listings
                  </p>
                  <Button onClick={() => router.push('/dashboard/artisan/products')}>
                    Go to Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track and manage customer orders
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Order management coming soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visit the Orders page to manage orders
                  </p>
                  <Button onClick={() => router.push('/dashboard/artisan/orders')}>
                    Go to Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your shop's performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Analytics coming soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics will be available shortly
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}