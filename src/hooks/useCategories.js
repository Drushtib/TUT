/**
 * Custom hooks for Categories data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getAllCategoriesQuery,
  getCategoryBySlugQuery,
} from "../lib/sanity/queries/categories";

/**
 * Fetch all categories
 */
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.ALL,
    queryFn: async () => {
      const query = getAllCategoriesQuery();
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch category by slug
 */
export const useCategoryBySlug = (slug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.BY_SLUG(slug),
    queryFn: async () => {
      const query = getCategoryBySlugQuery(slug);
      return await client.fetch(query);
    },
    enabled: !!slug,
    ...options,
  });
};

