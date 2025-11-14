/**
 * Site-wide configuration
 */

export const SITE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://theentrepreneurialchronicles.com";

export const SITE_META = {
  title: "The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories",
  description: "The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
  keywords: "business, magazines, entrepreneurs, popular-personalities",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og-image.jpg`,
};

// Sitemap Configuration
export const SITEMAP_CONFIG = {
  baseUrl: SITE_URL,
  staticRoutes: [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about-us", changefreq: "monthly", priority: 0.9 },
    { path: "/blogs", changefreq: "weekly", priority: 0.9 },
    { path: "/magazines", changefreq: "weekly", priority: 0.9 },
    { path: "/contact", changefreq: "monthly", priority: 0.8 },
    { path: "/advertise-with-us", changefreq: "monthly", priority: 0.7 },
  ],
  defaultChangefreq: "weekly",
  defaultPriority: 0.8,
};

// RSS Feed Configuration
export const RSS_CONFIG = {
  title: "The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories",
  description: "The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
  siteUrl: SITE_URL,
  feedUrl: `${SITE_URL}/rss.xml`,
  language: "en",
  copyright: `All rights reserved ${new Date().getFullYear()}, The Entrepreneurial Chronicles`,
};

