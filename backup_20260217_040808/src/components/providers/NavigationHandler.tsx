"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NavigationHandler({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleStart = () => {
      clearTimeout(timeout);
      setIsLoading(true);
    };

    const handleComplete = () => {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Minimum display time for smooth UX
    };

    handleStart();
    handleComplete();

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <LoadingSpinner size="lg" text="Navigating..." />
        </div>
      )}
      {children}
    </>
  );
}
