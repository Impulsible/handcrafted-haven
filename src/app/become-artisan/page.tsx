 
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { 
  ArrowLeft, 
  Upload, 
  Camera,
  Loader2,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { Users } from 'lucide-react'

export default function BecomeArtisanPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    location: '',
    country: 'USA',
    story: '',
    bio: '',
    yearsActive: '',
    instagram: '',
    website: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'avatar') {
        setAvatarFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setCoverFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setCoverPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${path}-${Date.now()}.${fileExt}`
      const filePath = `artisans/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('artisan-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('artisan-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let avatarUrl = '/images/artisans/default-avatar.jpg'
      let coverUrl = '/images/artisans/default-cover.jpg'

      if (avatarFile) {
        const uploadedUrl = await uploadImage(avatarFile, `avatar-${formData.name.replace(/\s+/g, '-')}`)
        if (uploadedUrl) avatarUrl = uploadedUrl
      }

      if (coverFile) {
        const uploadedUrl = await uploadImage(coverFile, `cover-${formData.name.replace(/\s+/g, '-')}`)
        if (uploadedUrl) coverUrl = uploadedUrl
      }

      const submissionData = {
        ...formData,
        avatar: avatarUrl,
        coverImage: coverUrl,
        yearsActive: formData.yearsActive || '1'
      }

      const response = await fetch('/api/artisans/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.'
      })
      
      setTimeout(() => {
        router.push('/artisans')
      }, 2000)
      
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Community",
      description: "Join thousands of artisans worldwide"
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Seller Protection",
      description: "Secure payments and fraud protection"
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Easy Listing",
      description: "Simple tools to showcase your work"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Marketing Support",
      description: "Promote your products to millions"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-amber-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become an Artisan</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join our community of talented creators and start sharing your craft with the world. 
            Fill out the form below to begin your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-8 py-12 text-white">
                <h2 className="text-3xl font-bold mb-2">Artisan Application</h2>
                <p className="text-amber-100">Tell us about yourself and your craft</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Image Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Profile Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-amber-500 transition-colors">
                        {avatarPreview ? (
                          <>
                            <Image src={avatarPreview} alt="Profile preview" fill className="object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setAvatarPreview(null)
                                setAvatarFile(null)
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg hover:bg-red-600"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-50">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'avatar')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image
                    </label>
                    <div className="relative h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-amber-500 transition-colors">
                      {coverPreview ? (
                        <>
                          <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setCoverPreview(null)
                              setCoverFile(null)
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg hover:bg-red-600"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload cover image</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'cover')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Craft Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Pottery, Woodworking, Jewelry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years Active
                    </label>
                    <Input
                      name="yearsActive"
                      type="number"
                      value={formData.yearsActive}
                      onChange={handleInputChange}
                      placeholder="5"
                      min="0"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram (optional)
                    </label>
                    <Input
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="@yourhandle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (optional)
                    </label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Story */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Story <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    required
                    placeholder="Share your journey as an artisan... How did you start? What inspires you?"
                    rows={3}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more about your craft, techniques, and what makes your work special..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 min-w-[150px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Why Join Us?</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-amber-600">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-sm text-amber-800 mb-2">
                    <span className="font-bold">15%</span> commission
                  </p>
                  <p className="text-xs text-amber-600">
                    Only pay when you sell. No hidden fees.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Have questions?{' '}
                  <Link href="/contact" className="text-amber-600 hover:underline">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-amber-50 rounded-xl p-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            What happens after you apply?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium">Application Review</p>
                <p className="text-sm text-gray-600">We'll review your application within 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium">Verification</p>
                <p className="text-sm text-gray-600">We may contact you for additional information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium">Welcome Aboard!</p>
                <p className="text-sm text-gray-600">Once approved, you can start listing your products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}