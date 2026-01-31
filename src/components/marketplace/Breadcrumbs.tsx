'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export default function Breadcrumbs({ items, className, showHome = true }: BreadcrumbsProps) {
  // Add home item at the beginning
  const allItems = showHome 
    ? [{ label: 'Home', href: '/', isCurrent: false }, ...items]
    : [...items];
  
  // Mark the last item as current
  if (allItems.length > 0) {
    allItems.forEach((item, index) => {
      item.isCurrent = index === allItems.length - 1;
    });
  }

  return (
    <nav 
      className={cn('flex items-center text-sm text-muted-foreground', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap">
        {allItems.map((item, index) => (
          <li 
            key={`${item.href}-${index}-${Date.now()}`} // Generate unique key
            className="flex items-center"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
            )}
            
            {item.isCurrent ? (
              <span 
                className="font-medium text-foreground"
                aria-current="page"
              >
                {index === 0 && showHome ? (
                  <Home className="w-4 h-4 inline mr-1" />
                ) : null}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-200 hover:underline decoration-primary/50 underline-offset-2"
              >
                {index === 0 && showHome ? (
                  <>
                    <Home className="w-4 h-4 inline mr-1" />
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}