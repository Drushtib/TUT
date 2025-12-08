/**
 * Sanity CMS Configuration
 */

export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gaa41xdq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03",
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false", // Enable CDN by default to help with CORS
};

// Sanity Content Types
export const SANITY_TYPES = {
  POST: "post",
  MAGAZINE: "magazine",
  CATEGORY: "category",
  YOUTUBE_VIDEO: "youtubeVideo",
  AUTHOR: "author",
  BRAND_LOGO: "brandLogo",
};

