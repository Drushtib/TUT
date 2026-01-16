import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload critical assets */}
          <link rel="preload" href="/css/fontawesome-all.min.css" as="style" />
          <link rel="preload" href="/css/iconfont.css" as="style" />

          {/* Static CSS Files */}
          <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
          <link rel="stylesheet" href="/css/iconfont.css" />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />

          {/* RSS feed */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="The Entrepreneurial Chronicles Feed"
            href="/api/feed"
          />

          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4800543608007428"
            crossOrigin="anonymous"
          />

          {/* Google tag (gtag.js) - Primary Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-ZFHKXE9LDZ"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZFHKXE9LDZ');
              `,
            }}
          />

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://www.theentrepreneurialchronicle.com/#organization",
                    name: "The Entrepreneurial Chronicles",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    logo: {
                      "@type": "ImageObject",
                      "@id": "https://www.theentrepreneurialchronicle.com/#logo",
                      inLanguage: "en-US",
                      url: "https://www.theentrepreneurialchronicle.com/images/logo-primary.png",
                      width: 300,
                      height: 150,
                      caption: "The Entrepreneurial Chronicles",
                    },
                    description: "A premier business magazine featuring inspiring stories of entrepreneurs and business leaders who have turned their dreams into reality.",
                    foundingDate: "2024",
                    contactPoint: {
                      "@type": "ContactPoint",
                      telephone: "",
                      contactType: "customer service",
                      availableLanguage: ["English"]
                    },
                    sameAs: [
                      "https://www.facebook.com/Theentrepreneurialchronicles",
                      "https://www.instagram.com/the.entrepreneurialchronicles/",
                      "https://www.linkedin.com/company/theentrepreneurialchronicles/",
                      "https://www.youtube.com/@theentrepreneurialchronicles"
                    ],
                    address: {
                      "@type": "PostalAddress",
                      addressCountry: "US"
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://www.theentrepreneurialchronicle.com/#website",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    name: "The Entrepreneurial Chronicles",
                    description: "The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
                    publisher: {
                      "@id": "https://www.theentrepreneurialchronicle.com/#organization",
                    },
                    inLanguage: "en-US",
                    potentialAction: {
                      "@type": "SearchAction",
                      target: "https://www.theentrepreneurialchronicle.com/?s={search_term_string}",
                      "query-input": "required name=search_term_string",
                    },
                    copyrightYear: "2024",
                    copyrightHolder: {
                      "@id": "https://www.theentrepreneurialchronicle.com/#organization"
                    }
                  },
                  {
                    "@type": "WebPage",
                    "@id": "https://www.theentrepreneurialchronicle.com/#webpage",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    name: "The Entrepreneurial Chronicles - Business Magazine for Entrepreneurs",
                    description: "The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
                    isPartOf: {
                      "@id": "https://www.theentrepreneurialchronicle.com/#website",
                    },
                    about: {
                      "@id": "https://www.theentrepreneurialchronicle.com/#organization",
                    },
                    primaryImageOfPage: {
                      "@type": "ImageObject",
                      url: "https://www.theentrepreneurialchronicle.com/images/og-default.jpg",
                      width: 1200,
                      height: 630
                    },
                    datePublished: "2024-06-24T20:16:53+00:00",
                    dateModified: "2024-12-16T20:33:08+00:00",
                    inLanguage: "en-US",
                    breadcrumb: {
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        {
                          "@type": "ListItem",
                          position: 1,
                          name: "Home",
                          item: "https://www.theentrepreneurialchronicle.com/"
                        }
                      ]
                    }
                  },
                  {
                    "@type": "NewsMediaOrganization",
                    "@id": "https://www.theentrepreneurialchronicle.com/#newsmedia",
                    name: "The Entrepreneurial Chronicles",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://www.theentrepreneurialchronicle.com/images/logo-primary.png",
                      width: 300,
                      height: 150
                    },
                    description: "A business magazine dedicated to sharing inspiring entrepreneurial stories and business insights.",
                    areaServed: "Worldwide",
                    publishingPrinciples: "https://www.theentrepreneurialchronicle.com/about-us",
                    masthead: "https://www.theentrepreneurialchronicle.com/about-us",
                    sameAs: [
                      "https://www.facebook.com/Theentrepreneurialchronicles",
                      "https://www.instagram.com/the.entrepreneurialchronicles/",
                      "https://www.linkedin.com/company/theentrepreneurialchronicles/"
                    ]
                  }
                ],
              }),
            }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Google Tag Manager Script */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
