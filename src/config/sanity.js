/**
 * Sanity CMS Configuration
 */

export const SANITY_CONFIG = {
  projectId: "lres172w",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
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

