/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  ArrowUpDown,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  stockQuantity: number;
  soldCount: number;
  views: number;
  status: 'active' | 'draft' | 'out_of_stock';
  createdAt: string;
}

export default function ArtisanProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchProducts();
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
      }
    } catch {
      router.push('/auth/signin');
    }
  };

  const fetchProducts = async () => {
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Hand-Thrown Stoneware Vase",
          description: "Elegant stoneware vase with natural flowing glaze",
          price: 89.99,
          image: "/images/products/pottery/vase-1.avif",
          category: "Pottery",
          inStock: true,
          stockQuantity: 15,
          soldCount: 89,
          views: 1240,
          status: 'active',
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          name: "Silver Filigree Earrings",
          description: "Handcrafted sterling silver earrings",
          price: 89.00,
          originalPrice: 120.00,
          image: "/images/products/jewelry/earrings-1.avif",
          category: "Jewelry",
          inStock: true,
          stockQuantity: 8,
          soldCount: 134,
          views: 1890,
          status: 'active',
          createdAt: "2024-01-20"
        },
        {
          id: 3,
          name: "Walnut End-Grain Board",
          description: "Handcrafted end-grain walnut cutting board",
          price: 79.99,
          image: "/images/products/woodwork/cutting-board-1.avif",
          category: "Woodwork",
          inStock: false,
          stockQuantity: 0,
          soldCount: 245,
          views: 3450,
          status: 'out_of_stock',
          createdAt: "2024-01-10"
        },
        {
          id: 4,
          name: "Handwoven Wool Blanket",
          description: "Luxuriously soft handwoven wool blanket",
          price: 245.00,
          originalPrice: 295.00,
          image: "/images/products/textiles/blanket-1.avif",
          category: "Textiles",
          inStock: true,
          stockQuantity: 5,
          soldCount: 45,
          views: 670,
          status: 'active',
          createdAt: "2024-02-01"
        },
        {
          id: 5,
          name: "New Ceramic Mug Design",
          description: "Hand-painted ceramic mug collection",
          price: 45.00,
          image: "/images/products/ceramics/mug-1.avif",
          category: "Ceramics",
          inStock: true,
          stockQuantity: 20,
          soldCount: 0,
          views: 234,
          status: 'draft',
          createdAt: "2024-02-15"
        }
      ];

      setProducts(mockProducts);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProducts(products.filter(p => p.id !== deleteProductId));
      toast.success('Product deleted successfully');
      setDeleteProductId(null);
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicateProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newProduct: Product = {
      ...product,
      id: Date.now(),
      name: `${product.name} (Copy)`,
      soldCount: 0,
      views: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts([newProduct, ...products]);
    toast.success('Product duplicated successfully');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  const getStockStatus = (product: Product) => {
    if (!product.inStock) return <Badge variant="destructive">Out of Stock</Badge>;
    if (product.stockQuantity < 5) return <Badge variant="secondary" className="bg-yellow-500">Low Stock ({product.stockQuantity})</Badge>;
    return <Badge className="bg-green-500">In Stock ({product.stockQuantity})</Badge>;
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'popular':
        return b.soldCount - a.soldCount;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
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
              <ShoppingBag className="h-6 w-6 text-secondary" />
              <h1 className="text-2xl font-bold">My Products</h1>
              <Badge variant="secondary" className="ml-2">
                {products.length} total
              </Badge>
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
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your product listings, track performance, and update inventory
            </p>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="popular">Most Sold</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Table */}
            {sortedProducts.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20"></div>
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                ID: #{product.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${product.price.toFixed(2)}</p>
                            {product.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>{getStockStatus(product)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.soldCount}</p>
                            <p className="text-xs text-muted-foreground">units</p>
                          </div>
                        </TableCell>
                        <TableCell>{product.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => router.push(`/products/${product.id}`)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/artisan/products/${product.id}/edit`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateProduct(product.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteProductId(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Start by adding your first product'}
                </p>
                {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push('/dashboard/artisan/products/new')}
                    className="bg-gradient-to-r from-secondary to-primary"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                )}
              </div>
            )}

            {/* Summary Stats */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Active Products</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">
                    {products.reduce((sum, p) => sum + p.soldCount, 0)}
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {products.filter(p => p.inStock && p.stockQuantity < 5).length}
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-500">
                    {products.filter(p => !p.inStock).length}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => !isDeleting && setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
              This will permanently remove the product from your shop.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Product'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}