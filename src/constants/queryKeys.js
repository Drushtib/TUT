/**
 * React Query Key Constants
 * Centralized query keys for better cache management and consistency
 */

export const QUERY_KEYS = {
  // Posts
  POSTS: {
    ALL: ["posts"],
    BY_CATEGORY: (category) => ["posts", "category", category],
    BY_SLUG: (slug) => ["posts", "slug", slug],
    FEATURED: ["posts", "featured"],
    PAGINATED: (page, category) => ["posts", "paginated", page, category],
  },

  // Magazines
  MAGAZINES: {
    ALL: ["magazines"],
    BY_SLUG: (slug) => ["magazines", "slug", slug],
    FEATURED: ["magazines", "featured"],
    LATEST: ["magazines", "latest"],
    HERO: ["magazines", "hero"],
    PAGINATED: (page) => ["magazines", "paginated", page],
  },

  // Categories
  CATEGORIES: {
    ALL: ["categories"],
    BY_SLUG: (slug) => ["categories", "slug", slug],
  },

  // Videos
  VIDEOS: {
    ALL: ["videos"],
    BY_SLUG: (slug) => ["videos", "slug", slug],
    INTERVIEWS: ["videos", "interviews"],
  },

  // Content Sections
  SECTIONS: {
    WEB_PROFILES: ["sections", "web-profiles"],
    MARKET_NEWS: ["sections", "market-news"],
    BUSINESS_BULLETIN: ["sections", "business-bulletin"],
    MASTER_TALKS: ["sections", "master-talks"],
    BLOG_ARTICLES: ["sections", "blog-articles"],
  },

  // Slider
  SLIDER: {
    FEATURED: ["slider", "featured"],
  },
};

