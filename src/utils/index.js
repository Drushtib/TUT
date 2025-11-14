/**
 * @deprecated This file is kept for backward compatibility
 * Please use imports from '../lib/utils' instead
 * 
 * New structure:
 * - Date utilities: import { formatDate, sortByDate } from '../lib/utils/date'
 * - String utilities: import { slugify, truncate } from '../lib/utils/string'
 * - Array utilities: import { removeDuplicates } from '../lib/utils/array'
 * - Sitemap utilities: import { generateSitemap, fetchAllPostSlugs } from '../lib/utils/sitemap'
 */

// Re-export for backward compatibility
export {
  slugify,
  formatDate as dateFormate,
  sortByDate as SortingByDate,
  removeDuplicates,
  generateSitemap,
  fetchAllPostSlugs,
} from "../lib/utils";

// Legacy function - kept for compatibility
export async function fetchAllPost() {
  const { getAllPostsQuery } = await import("../lib/sanity/queries/posts");
  const { client } = await import("../client");
  const query = getAllPostsQuery();
  return await client.fetch(query);
}
