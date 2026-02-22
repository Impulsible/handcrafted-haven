import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'specialty', 'location', 'story', 'bio']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Generate a unique slug from the name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if email already exists
    const { data: existingByEmail } = await supabase
      .from('artisans')
      .select('email')
      .eq('email', body.email)
      .single()

    if (existingByEmail) {
      return NextResponse.json(
        { error: 'An artisan with this email already exists' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const { data: existingBySlug } = await supabase
      .from('artisans')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (existingBySlug) {
      return NextResponse.json(
        { error: 'An artisan with this name already exists' },
        { status: 400 }
      )
    }

    // Prepare the artisan data
    const newArtisan = {
      name: body.name,
      slug: slug,
      avatar: body.avatar || '/images/artisans/default-avatar.jpg',
      cover_image: body.coverImage || '/images/artisans/default-cover.jpg',
      location: body.location,
      country: body.country || 'USA',
      specialty: body.specialty,
      years_active: parseInt(body.yearsActive) || 1,
      story: body.story,
      bio: body.bio,
      rating: 0,
      review_count: 0,
      product_count: 0,
      follower_count: 0,
      is_featured: false,
      is_verified: false,
      badges: ["New Artisan"],
      social_links: {
        instagram: body.instagram || null,
        website: body.website || null
      },
      shop_policies: {
        shipping: "Shipping policy to be added",
        returns: "Return policy to be added",
        custom: false
      },
      workshops: [],
      status: 'pending',
      email: body.email,
      created_at: new Date().toISOString()
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('artisans')
      .insert([newArtisan])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create artisan profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully! We will review your application.',
      artisan: data 
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}