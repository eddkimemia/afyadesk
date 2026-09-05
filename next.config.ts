import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock links are all Unsplash/Pixabay — allow all subdomains + Vercel Blob
    // If Vercel Image Optimization ever 403s on Unsplash, fallback is unoptimized (direct URL)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "**.pixabay.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.pexels.com" },
      // Vercel Blob for persistent uploads on Vercel (certificate + admin uploads)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      { protocol: "https", hostname: "**.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
