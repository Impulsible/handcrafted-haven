"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Package, 
  Truck, 
  Shield,
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
// Loading skeleton component
const CartSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-primary/10 rounded mb-8"></div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-primary/10 rounded-2xl p-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-primary/10 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-48 bg-primary/10 rounded"></div>
                  <div className="h-4 w-32 bg-primary/10 rounded"></div>
                  <div className="h-4 w-24 bg-primary/10 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-96">
          <div className="bg-card border border-primary/10 rounded-2xl p-6 space-y-4">
            <div className="h-6 w-32 bg-primary/10 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-primary/10 rounded"></div>
              <div className="h-4 w-full bg-primary/10 rounded"></div>
              <div className="h-4 w-full bg-primary/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, totalPrice, itemCount } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    // Simulate loading state for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingId(id);
    // Simulate async update
    await new Promise(resolve => setTimeout(resolve, 300));
    updateQuantity(id, newQuantity);
    setUpdatingId(null);
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast.success("Item removed", {
      description: `${name} has been removed from your cart.`,
      duration: 3000,
    });
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    
    clearCart();
    toast.info("Cart cleared", {
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty", {
        description: "Add some items before proceeding to checkout.",
      });
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/marketplace');
  };

  // Calculate shipping (free over $100)
  const shipping = totalPrice > 100 ? 0 : 4.99;
  const tax = totalPrice * 0.08; // 8% tax
  const orderTotal = totalPrice + shipping + tax;
  const freeShippingRemaining = 100 - totalPrice;

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Empty State Illustration */}
            <div className="relative mb-12">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <ShoppingBag className="w-24 h-24 text-primary/30" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Your cart is empty
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Your Cart is <span className="text-gradient">Empty</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Discover unique handcrafted treasures from talented artisans around the world.
              Start your journey into artisan craftsmanship today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={handleContinueShopping}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg"
              >
                Explore Marketplace
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/categories')}
                className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
              >
                Browse Categories
              </Button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary/10">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $100</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">SSL encrypted checkout</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Artisan Quality</h3>
                <p className="text-sm text-muted-foreground">Handmade with care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-medium">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
              Your <span className="text-gradient">Shopping Cart</span>
            </h1>
            <p className="text-muted-foreground">
              You have {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-card border border-primary/10 rounded-2xl overflow-hidden">
              <div className="divide-y divide-primary/10">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-6 hover:bg-primary/5 transition-colors ${
                      updatingId === item.id ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="sm:w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <Package className="w-12 h-12 text-primary/40" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <Link 
                              href={`/products/${item.id}`}
                              className="text-lg font-semibold hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            {item.artisan && (
                              <p className="text-sm text-muted-foreground mt-1">
                                by {item.artisan}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/20 hover:bg-primary/10"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updatingId === item.id}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/20 hover:bg-primary/10"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={updatingId === item.id}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80 hover:bg-primary/10"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="link"
                onClick={handleContinueShopping}
                className="text-primary hover:text-primary/80 p-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              
              {/* Item Count Badge */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{items.length} unique items</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-card border border-primary/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <div className="text-right">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {/* Promo Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                    />
                    <Button variant="outline" className="border-primary/20">
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Order Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Shipping and taxes calculated at checkout
                  </p>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {totalPrice < 100 && (
                <div className="mb-6 p-4 bg-primary/5 rounded-xl">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>
                      Add <span className="font-semibold text-primary">${freeShippingRemaining.toFixed(2)}</span> more for 
                      <span className="font-semibold text-green-600 ml-1">FREE shipping</span>
                    </span>
                  </div>
                  <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${(totalPrice / 100) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-6 text-lg mb-4 hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>Artisan Guaranteed</span>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-2">
                  <div className="px-2 py-1 bg-primary/5 rounded text-xs">Visa</div>
                  <div className="px-2 py-1 bg-primary/5 rounded text-xs">Mastercard</div>
                  <div className="px-2 py-1 bg-primary/5 rounded text-xs">Amex</div>
                  <div className="px-2 py-1 bg-primary/5 rounded text-xs">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
