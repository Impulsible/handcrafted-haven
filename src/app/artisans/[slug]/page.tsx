/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  MapPin, 
  Calendar, 
  Award, 
  ShoppingBag, 
  Instagram, 
  Facebook,
  Globe,
  Mail,
  ChevronRight,
  CheckCircle,
  Shield,
  Truck,
  Users,
  Clock,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { artisans, getArtisanBySlug } from '@/data/artisans'
import { products } from '@/data/products'

export default async function ArtisanProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params to get the slug (Next.js 15 requirement)
  const { slug } = await params
  const artisan = getArtisanBySlug(slug)
  
  if (!artisan) {
    notFound()
  }

  // Get products by this artisan
  const artisanProducts = products.filter(p => p.artisan === artisan.name).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={artisan.coverImage}
          alt={artisan.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Verified Badge */}
        {artisan.isVerified && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold">Verified Artisan</span>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={artisan.avatar}
                alt={artisan.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {artisan.name}
                </h1>
                {artisan.isVerified && (
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <p className="text-xl text-amber-600 mb-2">{artisan.specialty}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {artisan.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {artisan.yearsActive} years active
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                  {artisan.rating} ({artisan.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Users className="h-4 w-4 mr-2" />
              Follow ({artisan.followerCount})
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">About {artisan.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{artisan.bio}</p>
              <p className="text-gray-600 italic">{artisan.story}</p>
            </div>

            {/* Badges */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recognition</h2>
              <div className="flex flex-wrap gap-3">
                {artisan.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-amber-50 text-amber-700 px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            {artisanProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Featured Products</h2>
                  <Link href={`/marketplace?artisan=${artisan.id}`} className="text-amber-600 hover:underline flex items-center">
                    View All ({artisan.productCount})
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artisanProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group">
                      <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="font-semibold group-hover:text-amber-600 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-amber-600 font-bold">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Workshops */}
            {artisan.workshops && artisan.workshops.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Upcoming Workshops</h2>
                <div className="space-y-4">
                  {artisan.workshops.map((workshop) => (
                    <div key={workshop.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{workshop.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(workshop.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {workshop.spots} spots left
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shop Policies */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600" />
                Shop Policies
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Truck className="h-4 w-4 text-amber-600" />
                    Shipping
                  </div>
                  <p className="text-sm text-gray-600">{artisan.shopPolicies.shipping}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Clock className="h-4 w-4 text-amber-600" />
                    Returns
                  </div>
                  <p className="text-sm text-gray-600">{artisan.shopPolicies.returns}</p>
                </div>
                {artisan.shopPolicies.custom && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <CheckCircle className="h-4 w-4" />
                    Custom Orders Available
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Artisan Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products</span>
                  <span className="font-semibold">{artisan.productCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">{artisan.followerCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years Active</span>
                  <span className="font-semibold">{artisan.yearsActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-semibold">{artisan.reviewCount}</span>
                </div>
              </div>
            </div>

            {/* Connect Card */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-3">
                {artisan.socialLinks.website && (
                  <a href={artisan.socialLinks.website} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
                    <Globe className="h-4 w-4" />
                    {artisan.socialLinks.website.replace('https://', '').replace('http://', '')}
                  </a>
                )}
                {artisan.socialLinks.instagram && (
                  <a href={artisan.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
                {artisan.socialLinks.facebook && (
                  <a href={artisan.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                )}
              </div>
            </div>

            {/* Shop Button */}
            <Link href={`/marketplace?artisan=${artisan.id}`}>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}