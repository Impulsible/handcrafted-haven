/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Award,
  Globe, 
  Sparkles,
  Shield,
  Truck,
  Leaf,
  Star,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Play,
  Quote
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Stats Counter Component with Animation
const StatCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span className="text-3xl sm:text-4xl font-bold">
      {count}{suffix}
    </span>
  );
};

// Team Member Card Component
const TeamMember = ({ name, role, bio, image, social }: { 
  name: string; 
  role: string; 
  bio: string; 
  image: string;
  social: { linkedin?: string; twitter?: string; instagram?: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Social Icons - Animated on Hover */}
        <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-500 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {social.linkedin && (
            <a 
              href={social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
              </svg>
            </a>
          )}
          {social.twitter && (
            <a 
              href={social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.538-12.277 10.03 10.03 0 002.463-2.541l-.047-.02z"/>
              </svg>
            </a>
          )}
          {social.instagram && (
            <a 
              href={social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-heading font-bold mb-1">{name}</h3>
        <p className="text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">{role}</p>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{bio}</p>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, image, rating }: {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}) => {
  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all h-full">
      <div className="flex items-center gap-1 mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 sm:h-4 sm:w-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/20 mb-3 sm:mb-4" />
      
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 italic line-clamp-4">{quote}</p>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative w-8 h-8 sm:w-10 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={author}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 32px, 40px"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold truncate">{author}</h4>
          <p className="text-xs text-muted-foreground truncate">{role}</p>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({ year, title, description, isLast = false }: {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}) => {
  return (
    <div className="flex gap-3 sm:gap-4 relative">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
        {!isLast && <div className="w-0.5 h-full bg-gradient-to-b from-primary to-secondary mt-2" />}
      </div>
      <div className="pb-4 sm:pb-8 flex-1">
        <span className="text-xs sm:text-sm font-bold text-primary">{year}</span>
        <h3 className="text-base sm:text-lg font-heading font-bold mt-1">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{description}</p>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all group hover:-translate-y-1 duration-300 h-full">
      <div className="w-10 h-10 sm:w-12 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
        <div className="text-primary [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-6 sm:[&>svg]:w-6">{icon}</div>
      </div>
      <h3 className="text-base sm:text-lg font-heading font-bold mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{description}</p>
    </div>
  );
};

export default function AboutPage() {
  const [activeVideo, setActiveVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Elena Chen",
      role: "Founder & Master Potter",
      bio: "With over 20 years of experience in traditional pottery, Elena founded Handcrafted Haven to preserve and promote artisan crafts.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "James Wilson",
      role: "Head of Curation",
      bio: "James travels the world discovering unique artisans and their stories. His eye for quality ensures only the best pieces make it to our marketplace.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Maria Gonzalez",
      role: "Artisan Relations",
      bio: "Maria works directly with our artisan community, ensuring fair trade practices and helping them share their cultural heritage.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Robert Chen",
      role: "Sustainability Lead",
      bio: "Robert ensures our practices are environmentally responsible and helps artisans adopt sustainable methods in their craft.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Handcrafted Haven has transformed how I share my pottery with the world. The platform connects me with customers who truly appreciate the art.",
      author: "Mei Lin",
      role: "Ceramic Artist",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop",
      rating: 5
    },
    {
      quote: "I&apos;ve found the most beautiful handmade gifts here. Each piece tells a story and you can feel the love put into every item.",
      author: "Sarah Thompson",
      role: "Collector",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5
    },
    {
      quote: "As a jewelry maker, being part of this community has been incredible. The support and exposure have helped my business grow.",
      author: "Anita Desai",
      role: "Jewelry Artisan",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      rating: 5
    }
  ];

  // Company values
  const values = [
    {
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Authentic Craftsmanship",
      description: "We celebrate traditional techniques and authentic handmade processes passed down through generations."
    },
    {
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Fair Trade Commitment",
      description: "We ensure artisans receive fair compensation and work in safe, ethical conditions."
    },
    {
      icon: <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Sustainable Practices",
      description: "We promote eco-friendly materials and sustainable production methods."
    },
    {
      icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Global Community",
      description: "We connect artisans and buyers worldwide, fostering cultural exchange and appreciation."
    },
    {
      icon: <Truck className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Carbon-Neutral Shipping",
      description: "We offset all shipping emissions and use eco-friendly packaging."
    },
    {
      icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Quality Guarantee",
      description: "Every item is carefully vetted to ensure it meets our high standards of quality."
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: "2015",
      title: "The Beginning",
      description: "Elena Chen started Handcrafted Haven as a small blog showcasing local potters in Kyoto."
    },
    {
      year: "2017",
      title: "First Marketplace",
      description: "Launched our online marketplace with 50 artisans from 5 countries."
    },
    {
      year: "2019",
      title: "Global Expansion",
      description: "Grew to over 500 artisans from 25 countries, adding new categories and features."
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "Launched our carbon-neutral shipping program and sustainable packaging initiative."
    },
    {
      year: "2024",
      title: "Today",
      description: "Proud to support over 1,500 artisans across 34 countries, with thousands of unique handmade pieces."
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          <div className="h-64 sm:h-96 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Our Story</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 sm:mb-6">
              Crafting Connections,
              <span className="text-gradient block mt-1 sm:mt-2">Preserving Heritage</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Handcrafted Haven is more than a marketplace &mdash; we&apos;re a community dedicated to preserving traditional crafts, supporting artisans, and bringing authentic handmade pieces to the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button 
                onClick={() => setActiveVideo(true)}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base group w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
              <Link href="/marketplace" className="w-full sm:w-auto">
                <Button variant="outline" className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl sm:max-w-4xl aspect-video bg-black rounded-lg sm:rounded-2xl overflow-hidden">
            <button
              onClick={() => setActiveVideo(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Our Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
              {isMounted && <StatCounter end={1500} suffix="+" />}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Artisans Worldwide</p>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
              {isMounted && <StatCounter end={34} suffix="" />}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Countries</p>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
              {isMounted && <StatCounter end={50000} suffix="+" />}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
              {isMounted && <StatCounter end={10} suffix="+" />}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Years of Craftsmanship</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-4 sm:mb-6">
                Our <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                What started as a passion project in a small pottery studio has grown into a global movement supporting traditional craftsmanship.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Handcrafted Haven was born from a simple observation: master artisans were struggling to find markets for their work, while people worldwide craved authentic, handmade pieces with stories behind them. We built a bridge between these two worlds.
              </p>
              
              {/* Timeline */}
              <div className="space-y-1 sm:space-y-2 max-w-full">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    year={item.year}
                    title={item.title}
                    description={item.description}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1578749559196-482c53fba63b?w=800&h=1000&fit=crop"
                  alt="Artisan at work"
                  width={800}
                  height={1000}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Quote Card */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-4 lg:-left-6 bg-card border border-primary/10 rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl max-w-[200px] sm:max-w-xs">
                <Quote className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary/20 mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm italic mb-2 sm:mb-4 line-clamp-3">
                  &quot;Every piece tells a story of tradition, skill, and passion. We&apos;re just here to help share those stories.&quot;
                </p>
                <p className="text-xs sm:text-sm font-semibold">Elena Chen</p>
                <p className="text-xs text-muted-foreground">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
            What We <span className="text-gradient">Stand For</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Our values guide every decision we make and shape the community we&apos;re building.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Passionate individuals dedicated to supporting artisans and preserving traditional crafts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                social={member.social}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Hear from our community of artisans and collectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="px-2 sm:px-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Have questions about our artisans, want to collaborate, or just want to say hello? We&apos;d love to hear from you.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm sm:text-base font-medium truncate">hello@handcraftedhaven.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm sm:text-base font-medium truncate">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Visit Us</p>
                    <p className="text-sm sm:text-base font-medium">123 Artisan Lane, Creative District, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="text-sm sm:text-base font-medium">Monday - Friday: 9am - 6pm EST</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
              <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 sm:mb-6">Send us a Message</h3>
              
              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 sm:py-6 text-sm sm:text-base">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
            Join Our <span className="text-gradient">Community</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Subscribe to receive stories from artisans, updates on new collections, and exclusive offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 sm:mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}