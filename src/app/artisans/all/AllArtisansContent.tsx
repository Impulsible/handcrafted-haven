/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Artisan {
  id: string
  name: string
  specialty: string
  location: string
  image: string
  rating: number
  productCount: number
}

export default function AllArtisansContent() {
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArtisans: Artisan[] = [
      {
        id: '1',
        name: 'Emma Watson',
        specialty: 'Pottery',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1578749559196-482c53fba63b?w=400&h=400&fit=crop',
        rating: 4.8,
        productCount: 24
      },
      {
        id: '2',
        name: 'James Chen',
        specialty: 'Jewelry',
        location: 'San Francisco',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
        rating: 4.9,
        productCount: 18
      },
      {
        id: '3',
        name: 'Maria Garcia',
        specialty: 'Textiles',
        location: 'Miami',
        image: 'https://images.unsplash.com/photo-1580309137429-bc160a2bded5?w=400&h=400&fit=crop',
        rating: 4.7,
        productCount: 32
      }
    ]
    
    setArtisans(mockArtisans)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading artisans...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Artisans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <Link 
            href={`/artisans/${artisan.id}`}  // ✅ FIXED: Using template string with artisan.id
            key={artisan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={artisan.image}
                alt={artisan.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{artisan.name}</h2>
              <p className="text-gray-600 mb-2">{artisan.specialty}</p>
              <p className="text-gray-600 mb-2">{artisan.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-600">★ {artisan.rating}</span>
                <span className="text-gray-600">{artisan.productCount} products</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}