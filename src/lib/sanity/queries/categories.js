/**
 * Sanity Queries for Categories
 */

import { SANITY_TYPES } from "../../../config/sanity";

/**
 * Get all categories
 */
export const getAllCategoriesQuery = () => `
  *[_type == "${SANITY_TYPES.CATEGORY}"]
`;

/**
 * Get category by slug
 */
export const getCategoryBySlugQuery = (slug) => `
  *[_type == "${SANITY_TYPES.CATEGORY}" && slug.current == "${slug}"][0]
`;

/**
 * Get all category slugs (for static paths)
 */
export const getAllCategorySlugsQuery = () => `
  *[_type == "${SANITY_TYPES.CATEGORY}"] {
    'slug': slug.current
  }
`;

