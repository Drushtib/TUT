/**
 * Custom hooks for Videos data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import { QUERY_KEYS } from "../constants/queryKeys";
import { PAGINATION } from "../config/constants";
import {
  getVideoBySlugQuery,
  getAllVideosQuery,
  getVideoInterviewsQuery,
} from "../lib/sanity/queries/videos";

/**
 * Fetch video by slug
 */
export const useVideoBySlug = (slug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.VIDEOS.BY_SLUG(slug),
    queryFn: async () => {
      const query = getVideoBySlugQuery();
      return await client.fetch(query, { slug });
    },
    enabled: !!slug,
    ...options,
  });
};

/**
 * Fetch all videos
 */
export const useAllVideos = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.VIDEOS.ALL,
    queryFn: async () => {
      const query = getAllVideosQuery();
      return await client.fetch(query);
    },
    ...options,
  });
};

/**
 * Fetch paginated video interviews
 */
export const useVideoInterviews = (
  page = 0,
  videosPerPage = PAGINATION.POSTS_PER_PAGE,
  options = {}
) => {
  const start = page * videosPerPage;
  const limit = videosPerPage;

  return useQuery({
    queryKey: QUERY_KEYS.VIDEOS.INTERVIEWS,
    queryFn: async () => {
      const query = getVideoInterviewsQuery(start, limit);
      return await client.fetch(query);
    },
    keepPreviousData: true,
    ...options,
  });
};

