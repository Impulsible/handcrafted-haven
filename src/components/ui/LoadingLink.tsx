"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LoadingLink({ href, children, className }: LoadingLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
    // Reset loading after navigation (fallback)
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Navigating..." />
        </div>
      )}
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    </>
  );
}
