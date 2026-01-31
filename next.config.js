/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,  // Enable optimization for better performance
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig;
