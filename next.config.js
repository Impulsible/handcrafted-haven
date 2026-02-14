/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add the quality values you're using
    qualities: [75, 90],
    
    // Configure remote patterns for external images (like Unsplash)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    
    // Enable SVG support (use cautiously - only for trusted SVGs)
    dangerouslyAllowSVG: true,
    
    // Set content security policy for SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Optional: Set default quality
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Other config options can go here
}

module.exports = nextConfig
