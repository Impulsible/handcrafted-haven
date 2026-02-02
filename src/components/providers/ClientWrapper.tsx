// src/components/providers/ClientWrapper.tsx
"use client";

import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "sonner";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      {children}
    </CartProvider>
  );
}
