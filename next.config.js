/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // This disables image optimization but allows all images
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
