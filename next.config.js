const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/_next/static/media/**",
      },
      {
        pathname: "/assest/**",
      },
      {
        pathname: "/images/**",
      },
    ],
    qualities: [100, 75],
  },
  // Disable filesystem cache to prevent persistence warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
