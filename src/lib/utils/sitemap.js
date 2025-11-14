/**
 * Sitemap utility functions
 */

import { SITEMAP_CONFIG } from "../../config/site";
import { getAllPostSlugsQuery } from "../sanity/queries/posts";
import { client } from "../../client";

/**
 * Fetch all post slugs for sitemap
 * @returns {Promise<string[]>} Array of post slugs
 */
export async function fetchAllPostSlugs() {
  const query = getAllPostSlugsQuery();
  const slugs = await client.fetch(query);
  return slugs.map((post) => post.slug);
}

/**
 * Generate XML sitemap
 * @param {string[]} slugs - Array of post slugs
 * @returns {string} XML sitemap string
 */
export function generateSitemap(slugs) {
  const { baseUrl, staticRoutes, defaultChangefreq, defaultPriority } = SITEMAP_CONFIG;

  const staticUrls = staticRoutes
    .map(({ path, changefreq, priority }) => {
      return `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
    })
    .join("");

  const dynamicUrls = slugs
    .map((slug) => {
      return `
      <url>
        <loc>${baseUrl}/post/${slug}</loc>
        <changefreq>${defaultChangefreq}</changefreq>
        <priority>${defaultPriority}</priority>
      </url>
    `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}${dynamicUrls}
    </urlset>
  `;
}

