"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartDebugPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalPrice, itemCount } = useCart();

  // Test product to add
  const testProduct = {
    id: 999,
    name: "Test Product",
    price: 29.99,
    quantity: 1,
    image: "/test.jpg",
    artisan: "Test Artisan"
  };

  const handleAddTestProduct = () => {
    addItem(testProduct);
    toast.success("Test product added to cart");
  };

  const handleShowCart = () => {
    console.log("Current cart items:", items);
    toast.info(`Cart has ${itemCount} items`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart Debug Page</h1>
      
      <div className="grid gap-6">
        {/* Cart Status */}
        <div className="bg-card border border-primary/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Status</h2>
          <div className="space-y-2">
            <p><strong>Item Count:</strong> {itemCount}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <p><strong>Number of Items:</strong> {items.length}</p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-card border border-primary/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {items.length === 0 ? (
            <p className="text-text/60">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-text/60">by {item.artisan}</p>
                    <p className="text-sm">Qty: {item.quantity} x ${item.price}</p>
                  </div>
                  <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-card border border-primary/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleAddTestProduct}>
              Add Test Product
            </Button>
            <Button onClick={handleShowCart} variant="outline">
              Log Cart to Console
            </Button>
            <Button onClick={clearCart} variant="destructive">
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
