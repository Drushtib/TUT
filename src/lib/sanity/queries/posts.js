/**
 * Sanity Queries for Posts
 */

import { SANITY_TYPES } from "../../../config/sanity";

/**
 * Base post fields used across multiple queries
 */
const basePostFields = `
  title,
  slug,
  altText,
  publishedAt,
  'featureImg': mainImage.asset->url,
  description,
  keywords,
  'category': {
    'title': categories[0]->title,
    'slug': categories[0]->slug.current
  }
`;

/**
 * Get all posts
 */
export const getAllPostsQuery = () => `
  *[_type == "${SANITY_TYPES.POST}"] | order(publishedAt desc)
`;

/**
 * Get post by slug
 */
export const getPostBySlugQuery = (slug) => `
  *[_type == "${SANITY_TYPES.POST}" && slug.current == '${slug}'][0] {
    title,
    altText,
    keywords,
    slug,
    'featureImg': mainImage.asset->url,
    body,
    description,
    publishedAt
  }
`;

/**
 * Get posts by category slug
 */
export const getPostsByCategoryQuery = (categorySlug) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]->slug.current == "${categorySlug}"] {
    ${basePostFields}
  } | order(publishedAt desc)
`;

/**
 * Get paginated posts by category
 */
export const getPaginatedPostsByCategoryQuery = (categorySlug, start = 0, limit = 6) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]->slug.current == "${categorySlug}"] {
    ${basePostFields}
  } | order(publishedAt desc)[${start}...${start + limit}]
`;

/**
 * Get featured posts
 */
export const getFeaturedPostsQuery = (limit = 5) => `
  *[_type == "${SANITY_TYPES.POST}" && featured == true] {
    title,
    slug,
    altText,
    publishedAt,
    'featureImg': mainImage.asset->url,
    'cate': categories[0]->title
  } | order(publishedAt desc) [0...${limit}]
`;

/**
 * Get posts for web profiles section
 */
export const getWebProfilesQuery = (limit = 5) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]->slug.current == "web-profiles"] {
    title,
    slug,
    'featureImg': mainImage.asset->url,
    'category': {
      'title': categories[0]->title,
      altText,
      'slug': categories[0]->slug.current
    },
    publishedAt
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get posts for market news section
 */
export const getMarketNewsQuery = (limit = 3) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]->slug.current == "market-news"] {
    ${basePostFields}
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get posts for business bulletin section
 */
export const getBusinessBulletinQuery = (limit = 3) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]->slug.current == "business-bulletin"] {
    ${basePostFields}
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get posts for master talks section
 */
export const getMasterTalksQuery = (limit = 3) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]._ref == *[_type == "${SANITY_TYPES.CATEGORY}" && slug.current == "master-talks"][0]._id] {
    ${basePostFields}
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get posts for blog articles section
 */
export const getBlogArticlesQuery = (limit = 3) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]._ref == *[_type == "${SANITY_TYPES.CATEGORY}" && slug.current == "blogs-and-articles"][0]._id] {
    ${basePostFields}
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get related articles for a magazine
 */
export const getRelatedArticlesForMagazineQuery = (limit = 3) => `
  *[_type == "${SANITY_TYPES.POST}" && categories[0]._ref == *[_type == "${SANITY_TYPES.CATEGORY}" && slug.current == "web-profiles"][0]._id] {
    title,
    slug,
    publishedAt,
    'featureImg': mainImage.asset->url,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get linked article for a magazine
 */
export const getLinkedArticleForMagazineQuery = (magazineSlug) => `
  *[_type == "${SANITY_TYPES.POST}" && _id == *[_type == "${SANITY_TYPES.MAGAZINE}" && slug.current == '${magazineSlug}'][0].linkedArticle[0]._ref] {
    title,
    slug,
    'featureImg': mainImage.asset->url
  }
`;

/**
 * Get all post slugs (for sitemap)
 */
export const getAllPostSlugsQuery = () => `
  *[_type == "${SANITY_TYPES.POST}"] {
    'slug': slug.current
  }
`;

