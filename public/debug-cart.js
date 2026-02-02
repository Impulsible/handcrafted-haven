// Quick debug script - run this in browser console
function debugCart() {
  console.log("=== CART DEBUG ===");
  
  // Check localStorage
  const cartData = localStorage.getItem("handcrafted-haven-cart");
  console.log("LocalStorage cart data:", cartData ? JSON.parse(cartData) : "Empty");
  
  // Check if CartContext is available
  if (window.__cartDebug) {
    console.log("Cart context available");
    window.__cartDebug();
  } else {
    console.log("Cart context not found in window");
  }
  
  // Force a cart update
  const event = new Event("cartUpdated");
  window.dispatchEvent(event);
  console.log("Dispatched cartUpdated event");
}

// Add to global scope
window.debugCart = debugCart;
console.log("debugCart() function added to window. Run debugCart() in console.");
