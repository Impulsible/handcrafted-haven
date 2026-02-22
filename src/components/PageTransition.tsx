/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Get transition intensity based on route change significance
const getTransitionIntensity = (oldPath: string, newPath: string) => {
  const oldSegments = oldPath.split('/').filter(Boolean)
  const newSegments = newPath.split('/').filter(Boolean)
  
  // Same route - no transition needed
  if (oldPath === newPath) return 0
  
  // Home to any page - medium transition
  if (oldPath === '/') return 0.7
  
  // Category to product - strong transition
  if (oldSegments[0] === 'categories' && newSegments[0] === 'product') return 1
  
  // Within same section - subtle transition
  if (oldSegments[0] === newSegments[0]) return 0.3
  
  // Default - medium transition
  return 0.6
}

// Dynamic variants based on transition intensity
const createVariants = (intensity: number) => ({
  initial: {
    opacity: 0,
    scale: 1 - (intensity * 0.05),
    filter: `blur(${intensity * 8}px)`,
    y: intensity * 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 1 + (intensity * 0.03),
    filter: `blur(${intensity * 8}px)`,
    y: -intensity * 20,
  }
})

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState(pathname)
  const [intensity, setIntensity] = useState(0.6)
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    if (prevPath !== pathname) {
      const newIntensity = getTransitionIntensity(prevPath, pathname)
      setIntensity(newIntensity)
      setPrevPath(pathname)
    }
  }, [pathname, prevPath])

  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  if (isFirstMount) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={createVariants(intensity)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.4 + (intensity * 0.2),
          ease: [0.4, 0, 0.2, 1],
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 200,
          }
        }}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}