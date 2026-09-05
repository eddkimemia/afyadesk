import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock links are all Unsplash — Vercel Image Optimization returns 402 on Hobby tier
    // Set unoptimized:true to serve stock images directly (no /_next/image transform) — fixes 402
    unoptimized: true,
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
