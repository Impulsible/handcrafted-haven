'use client';

import { CartProvider } from "@/contexts/CartContext";
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  console.log('Providers rendering with CartProvider'); // Debug log
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
