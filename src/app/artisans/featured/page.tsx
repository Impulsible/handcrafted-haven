import { Suspense } from "react";
import FeaturedArtisansContent from "./FeaturedArtisansContent";

export const dynamic = "force-dynamic";

export default function FeaturedArtisansPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="ml-3 text-muted-foreground">Loading featured artisans...</span>
      </div>
    }>
      <FeaturedArtisansContent />
    </Suspense>
  );
}
