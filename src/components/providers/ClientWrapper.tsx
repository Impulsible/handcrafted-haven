"use client";

import { ReactNode } from 'react';
import NavigationProgress from '@/components/ui/NavigationProgress';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
}
