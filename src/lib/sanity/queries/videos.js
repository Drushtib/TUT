/**
 * Sanity Queries for YouTube Videos
 */

import { SANITY_TYPES } from "../../../config/sanity";

/**
 * Get video by slug
 */
export const getVideoBySlugQuery = () => `
  *[_type == "${SANITY_TYPES.YOUTUBE_VIDEO}" && slug.current == $slug][0] {
    _id,
    title,
    body,
    videoUrl,
    "slug": slug.current
  }
`;

/**
 * Get all videos
 */
export const getAllVideosQuery = () => `
  *[_type == "${SANITY_TYPES.YOUTUBE_VIDEO}"] {
    _id,
    title,
    videoUrl,
    "slug": slug.current
  }
`;

/**
 * Get videos for video interviews category
 */
export const getVideoInterviewsQuery = (start = 0, limit = 6) => `
  *[_type == "${SANITY_TYPES.YOUTUBE_VIDEO}"] {
    _id,
    title,
    videoUrl,
    description,
    "slug": slug.current
  } | order(_createdAt desc)[${start}...${start + limit}]
`;

/**
 * Get all video slugs (for static paths)
 */
export const getAllVideoSlugsQuery = () => `
  *[_type == "${SANITY_TYPES.YOUTUBE_VIDEO}"] {
    "slug": slug.current
  }
`;

