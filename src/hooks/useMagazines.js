/**
 * Custom hooks for Magazines data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import { QUERY_KEYS } from "../constants/queryKeys";
import { PAGINATION, QUERY_LIMITS } from "../config/constants";
import {
  getAllMagazinesQuery,
  getMagazinesQuery,
  getPaginatedMagazinesQuery,
  getMagazineBySlugQuery,
  getFeaturedMagazinesQuery,
} from "../lib/sanity/queries/magazines";

/**
 * Fetch all magazines
 */
export const useAllMagazines = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MAGAZINES.ALL,
    queryFn: async () => {
      const query = getAllMagazinesQuery();
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch magazines with limit
 */
export const useMagazines = (limit = QUERY_LIMITS.LATEST_MAGAZINES, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MAGAZINES.LATEST,
    queryFn: async () => {
      const query = getMagazinesQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch paginated magazines
 */
export const usePaginatedMagazines = (
  page = 0,
  magazinesPerPage = PAGINATION.MAGAZINES_PER_PAGE,
  options = {}
) => {
  const start = page * magazinesPerPage;
  const limit = magazinesPerPage;

  return useQuery({
    queryKey: QUERY_KEYS.MAGAZINES.PAGINATED(page),
    queryFn: async () => {
      const query = getPaginatedMagazinesQuery(start, limit);
      return await client.fetch(query);
    },
    keepPreviousData: true,
    ...options,
  });
};

/**
 * Fetch magazine by slug
 */
export const useMagazineBySlug = (slug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MAGAZINES.BY_SLUG(slug),
    queryFn: async () => {
      const query = getMagazineBySlugQuery(slug);
      const result = await client.fetch(query);
      return result?.[0] || null;
    },
    enabled: !!slug,
    ...options,
  });
};

/**
 * Fetch featured magazines for hero section
 */
export const useFeaturedMagazines = (limit = QUERY_LIMITS.HOME_MAGAZINES, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MAGAZINES.HERO,
    queryFn: async () => {
      const query = getFeaturedMagazinesQuery(limit);
      return await client.fetch(query);
    },
    ...options,
  });
};

