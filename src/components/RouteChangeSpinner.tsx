'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function RouteChangeSpinner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleStart = () => {
      timeoutId = setTimeout(() => setLoading(true), 300) // Delay to avoid flash for fast loads
    }
    
    const handleComplete = () => {
      clearTimeout(timeoutId)
      setLoading(false)
    }

    // Trigger on route change
    handleStart()
    
    // Simulate loading completion after a short delay
    // In a real app, this would be tied to actual navigation events
    timeoutId = setTimeout(handleComplete, 600)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          {/* Optional inner circle for effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}