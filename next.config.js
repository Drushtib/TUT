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
    qualities: [100, 75],
  },
  // Fix for react-syntax-highlighter ES module issues with Turbopack
  turbopack: {
    resolveAlias: {
      'react-syntax-highlighter': 'react-syntax-highlighter'
    }
  }
};

module.exports = nextConfig;
