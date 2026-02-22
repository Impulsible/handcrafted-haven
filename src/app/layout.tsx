import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import HolyLoader from "holy-loader";
import { Suspense } from "react";
import { RouteChangeSpinner } from "@/components/RouteChangeSpinner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
});

// Separate viewport export (required for Next.js 14+)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#f59e0b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Also supported but optional:
  // userScalable: true,
  // colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://handcraftedhaven.com'), // Replace with your actual domain
  title: {
    default: "Handcrafted Haven - Artisan Marketplace",
    template: "%s | Handcrafted Haven"
  },
  description: "Discover authentic handmade crafts from talented artisans around the world. Shop unique pottery, jewelry, woodwork, textiles and more.",
  keywords: [
    "handmade crafts",
    "artisan marketplace",
    "handcrafted goods",
    "unique gifts",
    "pottery",
    "jewelry",
    "woodwork",
    "textiles",
    "artisan crafts",
    "handmade home decor"
  ],
  authors: [{ name: "Handcrafted Haven" }],
  creator: "Handcrafted Haven",
  publisher: "Handcrafted Haven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Handcrafted Haven - Artisan Marketplace",
    description: "Discover authentic handmade crafts from talented artisans around the world.",
    url: "https://handcraftedhaven.com",
    siteName: "Handcrafted Haven",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handcrafted Haven - Artisan Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Haven - Artisan Marketplace",
    description: "Discover authentic handmade crafts from talented artisans around the world.",
    images: ["/twitter-image.jpg"],
    creator: "@handcraftedhaven",
    site: "@handcraftedhaven",
  },

  // Robots meta
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons and favicons
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: ['/favicon/favicon.ico'],
    apple: [
      { url: '/favicon/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/favicon/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/favicon/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/favicon/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/favicon/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/favicon/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/favicon/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/favicon/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/favicon/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon/apple-icon-precomposed.png',
      },
    ],
  },

  // Manifest for PWA
  manifest: '/manifest.json',

  // Verification for search consoles
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },

  // Alternate links for different languages/versions
  alternates: {
    canonical: 'https://handcraftedhaven.com',
  },

  // Category
  category: 'ecommerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = inter.variable + " " + dancingScript.variable;

  return (
    <html lang="en" className={fontClass}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Additional meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Handcrafted Haven" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Theme color for browser - now handled by viewport export, but kept for backward compatibility */}
        <meta name="theme-color" content="#f59e0b" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#f59e0b" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        {/* Top loading bar for all navigation */}
        <HolyLoader 
          color="linear-gradient(to right, #f59e0b, #d97706, #b45309)"
          height={3}
          speed={200}
        />
        
        {/* Full-screen spinner for slow transitions (only on client) */}
        <Suspense fallback={null}>
          <RouteChangeSpinner />
        </Suspense>

        <CartProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}