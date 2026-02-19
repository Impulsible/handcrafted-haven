"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
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
      }, 500); // Minimum display time for smooth UX
    };

    // Show loader on route change
    handleStart();
    handleComplete();

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1">
      <div className="relative h-full w-full overflow-hidden bg-primary/20">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-progress"
          style={{
            width: '30%',
            animation: 'progress 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
