'use client'

import { Star, ThumbsUp } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
}

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={review.avatar} alt={review.user} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h4 className="font-semibold">{review.user}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <h5 className="font-semibold mb-2">{review.title}</h5>
              <p className="text-gray-600 mb-3">{review.content}</p>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}