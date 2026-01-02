/**
 * Sanity Queries for Magazines
 */

import { SANITY_TYPES } from "../../../config/sanity";

/**
 * Base magazine fields
 */
const baseMagazineFields = `
  title,
  slug,
  altText,
  'featureImg': mainImage.asset->url,
  publishedAt,
  description
`;

/**
 * Get all magazines
 */
export const getAllMagazinesQuery = () => `
  *[_type == "${SANITY_TYPES.MAGAZINE}"] {
    ${baseMagazineFields},
    _createdAt
  } | order(publishedAt desc)
`;

/**
 * Get magazines with limit
 */
export const getMagazinesQuery = (limit = 8) => `
  *[_type == "${SANITY_TYPES.MAGAZINE}"] {
    ${baseMagazineFields}
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get paginated magazines
 */
export const getPaginatedMagazinesQuery = (start = 0, limit = 8) => `
  *[_type == "${SANITY_TYPES.MAGAZINE}"] {
    ${baseMagazineFields}
  } | order(publishedAt desc)[${start}...${start + limit}]
`;

/**
 * Get magazine by slug
 */
export const getMagazineBySlugQuery = (slug) => `
  *[_type == "${SANITY_TYPES.MAGAZINE}" && slug.current == '${slug}'] {
    title,
    slug,
    keywords,
    description,
    'featureImg': mainImage.asset->url,
    'leaderPhoto': leaderPhoto.asset->url,
    content,
    publishedAt,
    author,
    categories[]->{
      title,
      slug
    },
    issuuLink
  }
`;

/**
 * Get featured magazines
 */
export const getFeaturedMagazinesQuery = (limit = 9) => `
  *[_type == "${SANITY_TYPES.MAGAZINE}"] {
    ${baseMagazineFields},
    description
  } | order(publishedAt desc)[0...${limit}]
`;

/**
 * Get all magazine slugs (for static paths)
 */
export const getAllMagazineSlugsQuery = () => `
  *[_type == "${SANITY_TYPES.MAGAZINE}"] {
    'slug': slug.current
  }
`;

