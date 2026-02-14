import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
  showHome?: boolean;
}

export default function Breadcrumbs({ items, className = '', showHome = true }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 ${className}`}>
      {showHome && (
        <>
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span>/</span>
        </>
      )}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
