/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show count
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingBag className="h-5 w-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center font-bold">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}