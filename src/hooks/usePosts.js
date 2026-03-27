/**
 * Custom hooks for Posts data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import { QUERY_KEYS } from "../constants/queryKeys";
import { PAGINATION, QUERY_LIMITS } from "../config/constants";
import {
  getPostBySlugQuery,
  getPostsByCategoryQuery,
  getPaginatedPostsByCategoryQuery,
  getFeaturedPostsQuery,
  getWebProfilesQuery,
  getMarketNewsQuery,
  getBusinessBulletinQuery,
  getMasterTalksQuery,
  getBlogArticlesQuery,
} from "../lib/sanity/queries/posts";

/**
 * Fetch post by slug
 */
export const usePostBySlug = (slug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.POSTS.BY_SLUG(slug),
    queryFn: async () => {
      console.log('Client-side - Fetching post for slug:', slug);
      
      // Use the same query as SSR for consistency
      const escapedSlug = slug.replace(/["\\]/g, '\\$&');
      const query = `
        *[_type == "post" && slug.current == "${escapedSlug}"] {
          title,
          "slug": slug.current,
          publishedAt,
          description,
          "featureImg": mainImage.asset->url,
          body,
          altText,
          keywords
        }[0]
      `;
      
      console.log('Client-side - Query:', query.trim());
      const result = await client.fetch(query);
      console.log('Client-side - Result:', result);
      return result;
    },
    enabled: !!slug,
    ...options,
  });
};

/**
 * Fetch posts by category
 */
export const usePostsByCategory = (categorySlug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.POSTS.BY_CATEGORY(categorySlug),
    queryFn: async () => {
      const query = getPostsByCategoryQuery(categorySlug);
      return await client.fetch(query);
    },
    enabled: !!categorySlug,
    ...options,
  });
};

/**
 * Fetch paginated posts by category
 */
export const usePaginatedPostsByCategory = (
  categorySlug,
  page = 0,
  postsPerPage = PAGINATION.POSTS_PER_PAGE,
  options = {}
) => {
  const start = page * postsPerPage;
  const limit = postsPerPage;

  return useQuery({
    queryKey: QUERY_KEYS.POSTS.PAGINATED(page, categorySlug),
    queryFn: async () => {
      const query = getPaginatedPostsByCategoryQuery(categorySlug, start, limit);
      return await client.fetch(query);
    },
    enabled: !!categorySlug,
    keepPreviousData: true,
    ...options,
  });
};

/**
 * Fetch featured posts
 */
export const useFeaturedPosts = (limit = QUERY_LIMITS.FEATURED_POSTS, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.POSTS.FEATURED,
    queryFn: async () => {
      const query = getFeaturedPostsQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch web profiles
 */
export const useWebProfiles = (limit = QUERY_LIMITS.WEB_PROFILES, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SECTIONS.WEB_PROFILES,
    queryFn: async () => {
      const query = getWebProfilesQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch market news
 */
export const useMarketNews = (limit = QUERY_LIMITS.MARKET_NEWS, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SECTIONS.MARKET_NEWS,
    queryFn: async () => {
      const query = getMarketNewsQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch business bulletin
 */
export const useBusinessBulletin = (limit = QUERY_LIMITS.BUSINESS_BULLETIN, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SECTIONS.BUSINESS_BULLETIN,
    queryFn: async () => {
      const query = getBusinessBulletinQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch master talks
 */
export const useMasterTalks = (limit = QUERY_LIMITS.MASTER_TALKS, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SECTIONS.MASTER_TALKS,
    queryFn: async () => {
      const query = getMasterTalksQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch blog articles
 */
export const useBlogArticles = (limit = QUERY_LIMITS.BLOG_ARTICLES || 3, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SECTIONS.BLOG_ARTICLES,
    queryFn: async () => {
      const query = getBlogArticlesQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

