export interface Artisan {
  id: number
  name: string
  slug: string
  avatar: string
  coverImage: string
  location: string
  country: string
  specialty: string
  yearsActive: number
  story: string
  bio: string
  rating: number
  reviewCount: number
  productCount: number
  followerCount: number
  isFeatured: boolean
  isVerified: boolean
  badges: string[]
  socialLinks: {
    instagram?: string
    facebook?: string
    pinterest?: string
    website?: string
  }
  shopPolicies: {
    shipping: string
    returns: string
    custom: boolean
  }
  workshops: {
    id: number
    title: string
    date: string
    spots: number
  }[]
}

export const artisans: Artisan[] = [
  {
    id: 101,
    name: "Elena Rodriguez",
    slug: "elena-rodriguez",
    avatar: "/images/artisans/elena.jpg",
    coverImage: "/images/artisans/covers/elena-cover.jpg",
    location: "Santa Fe, New Mexico",
    country: "USA",
    specialty: "Pottery & Ceramics",
    yearsActive: 15,
    story: "Elena learned pottery from her grandmother in the mountains of Mexico. Today, she combines traditional techniques with modern designs in her Santa Fe studio.",
    bio: "Elena Rodriguez is a master potter with over 15 years of experience. Her work has been featured in American Craft Magazine and exhibited at the Smithsonian Craft Show. Each piece is hand-thrown and glazed using natural, locally-sourced materials.",
    rating: 4.9,
    reviewCount: 342,
    productCount: 28,
    followerCount: 1250,
    isFeatured: true,
    isVerified: true,
    badges: ["Master Artisan", "Eco-Friendly", "Featured Creator"],
    socialLinks: {
      instagram: "https://instagram.com/elenaceramics",
      facebook: "https://facebook.com/elenaceramics",
      pinterest: "https://pinterest.com/elenaceramics",
      website: "https://elenaceramics.com"
    },
    shopPolicies: {
      shipping: "Free shipping on orders over $100. All items shipped within 3-5 business days.",
      returns: "30-day return policy. Custom items are final sale.",
      custom: true
    },
    workshops: [
      { id: 1, title: "Beginner Pottery Wheel", date: "2026-03-15", spots: 8 },
      { id: 2, title: "Hand-Building Techniques", date: "2026-03-22", spots: 12 },
      { id: 3, title: "Glazing Masterclass", date: "2026-04-05", spots: 6 }
    ]
  },
  {
    id: 102,
    name: "James Wilson",
    slug: "james-wilson",
    avatar: "/images/artisans/james.jpg",
    coverImage: "/images/artisans/covers/james-cover.jpg",
    location: "Portland, Oregon",
    country: "USA",
    specialty: "Woodwork",
    yearsActive: 22,
    story: "A former architect, James found his true passion in woodworking. His designs blend Scandinavian simplicity with organic forms.",
    bio: "James Wilson creates heirloom-quality furniture from sustainably harvested wood. Each piece is handcrafted in his Portland studio using traditional joinery techniques passed down through generations.",
    rating: 5.0,
    reviewCount: 567,
    productCount: 45,
    followerCount: 2300,
    isFeatured: true,
    isVerified: true,
    badges: ["Master Craftsman", "Sustainable", "Custom Orders"],
    socialLinks: {
      instagram: "https://instagram.com/jameswilsonwood",
      pinterest: "https://pinterest.com/jameswilsonwood",
      website: "https://jameswilsonwood.com"
    },
    shopPolicies: {
      shipping: "Free shipping in continental US. International shipping available.",
      returns: "14-day return policy for stock items. Custom furniture non-returnable.",
      custom: true
    },
    workshops: [
      { id: 4, title: "Intro to Woodworking", date: "2026-03-10", spots: 6 },
      { id: 5, title: "Hand-Cut Dovetails", date: "2026-03-24", spots: 4 }
    ]
  },
  {
    id: 103,
    name: "Sophia Chen",
    slug: "sophia-chen",
    avatar: "/images/artisans/sophia.jpg",
    coverImage: "/images/artisans/covers/sophia-cover.jpg",
    location: "San Francisco, California",
    country: "USA",
    specialty: "Jewelry",
    yearsActive: 8,
    story: "Sophia combines traditional Chinese metalworking techniques with contemporary minimalist design.",
    bio: "Sophia Chen creates handcrafted jewelry that tells stories. Each piece is meticulously crafted in her San Francisco studio using ethically sourced materials.",
    rating: 4.8,
    reviewCount: 289,
    productCount: 52,
    followerCount: 890,
    isFeatured: true,
    isVerified: true,
    badges: ["Emerging Artist", "Ethical Materials", "Limited Editions"],
    socialLinks: {
      instagram: "https://instagram.com/sophiachenjewelry",
      facebook: "https://facebook.com/sophiachenjewelry",
      website: "https://sophiachen.com"
    },
    shopPolicies: {
      shipping: "Free shipping on all US orders. Ships within 2-3 business days.",
      returns: "15-day return policy. Custom sizing available.",
      custom: true
    },
    workshops: [
      { id: 7, title: "Silver Ring Workshop", date: "2026-03-18", spots: 8 },
      { id: 8, title: "Earring Design Basics", date: "2026-04-02", spots: 10 }
    ]
  },
  {
    id: 104,
    name: "Marcus Thorne",
    slug: "marcus-thorne",
    avatar: "/images/artisans/marcus.jpg",
    coverImage: "/images/artisans/covers/marcus-cover.jpg",
    location: "Asheville, North Carolina",
    country: "USA",
    specialty: "Glass Art",
    yearsActive: 12,
    story: "Marcus fell in love with glass blowing during a trip to Venice. Now he creates stunning pieces inspired by the Blue Ridge Mountains.",
    bio: "Marcus Thorne creates unique glass art that captures light and movement. His work has been featured in galleries across the Southeast.",
    rating: 4.9,
    reviewCount: 178,
    productCount: 34,
    followerCount: 670,
    isFeatured: false,
    isVerified: true,
    badges: ["Glass Master", "One-of-a-Kind"],
    socialLinks: {
      instagram: "https://instagram.com/marcusthornglass",
      facebook: "https://facebook.com/marcusthornglass"
    },
    shopPolicies: {
      shipping: "Specialty packaging for glass items. Free shipping over $150.",
      returns: "Damaged items replaced within 7 days. No returns on custom pieces.",
      custom: true
    },
    workshops: [
      { id: 10, title: "Glass Blowing Demo", date: "2026-03-20", spots: 15 }
    ]
  },
  {
    id: 105,
    name: "Isabella Santos",
    slug: "isabella-santos",
    avatar: "/images/artisans/isabella.avif",
    coverImage: "/images/artisans/covers/isabella-cover.jpg",
    location: "Miami, Florida",
    country: "USA",
    specialty: "Textiles & Weaving",
    yearsActive: 18,
    story: "Isabella's grandmother taught her to weave when she was just seven years old. Now she preserves and reimagines traditional Latin American weaving techniques.",
    bio: "Isabella Santos creates textiles that celebrate her Colombian heritage. Each piece is hand-woven on a traditional loom using natural dyes.",
    rating: 4.7,
    reviewCount: 423,
    productCount: 67,
    followerCount: 1450,
    isFeatured: true,
    isVerified: true,
    badges: ["Master Weaver", "Natural Dyes", "Heritage Craft"],
    socialLinks: {
      instagram: "https://instagram.com/isabellasantostextiles",
      pinterest: "https://pinterest.com/isabellasantos",
      website: "https://isabellasantos.com"
    },
    shopPolicies: {
      shipping: "Free shipping on orders over $75. Ships within 5-7 business days.",
      returns: "30-day return policy. Custom sizes available.",
      custom: true
    },
    workshops: [
      { id: 13, title: "Intro to Weaving", date: "2026-03-12", spots: 8 },
      { id: 14, title: "Natural Dye Workshop", date: "2026-03-26", spots: 6 },
      { id: 15, title: "Advanced Patterns", date: "2026-04-09", spots: 4 }
    ]
  }
];

export function getArtisanBySlug(slug: string): Artisan | undefined {
  return artisans.find(artisan => artisan.slug === slug);
}

export function getFeaturedArtisans(): Artisan[] {
  return artisans.filter(artisan => artisan.isFeatured);
}

export function getArtisansBySpecialty(specialty: string): Artisan[] {
  return artisans.filter(artisan => 
    artisan.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
}