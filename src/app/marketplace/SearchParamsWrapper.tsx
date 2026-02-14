"use client";

import { Suspense } from "react";
import MarketplaceContent from "./MarketplaceContent";

export default function SearchParamsWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-80 bg-gradient-to-r from-primary/90 to-secondary/90 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading marketplace...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  );
}
