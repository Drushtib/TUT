import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* ================= Google Search Console ================= */}
          <meta name="google-site-verification" content="v5MNllEQW5DdeIN5NNYEs-hcx1WnwAS8YW4Di8qLo1I" />

          {/* ================= Favicon ================= */}
          <link rel="icon" href="/assest/Favicon_TUT_1.png" sizes="32x32" />
          <link rel="icon" href="/assest/Favicon_TUT_1.png" sizes="16x16" />
          <link rel="apple-touch-icon" href="/assest/Favicon_TUT_1.png" />

          {/* ================= Preload Critical CSS ================= */}
          <link rel="preload" href="/css/iconfont.css" as="style" />

          {/* ================= Static CSS ================= */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <link rel="stylesheet" href="/css/iconfont.css" />

          {/* ================= Google Fonts ================= */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Lora:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* ================= RSS Feed ================= */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="The Entrepreneurial Chronicles Feed"
            href="/api/feed"
          />

          {/* ================= Google AdSense ================= */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4800543608007428"
            crossOrigin="anonymous"
          ></script>

          {/* ================= Google Analytics (CORRECT ORDER) ================= */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-ZFHKXE9LDZ"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZFHKXE9LDZ', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />

          {/* ================= Structured Data (JSON-LD) ================= */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id":
                      "https://www.theentrepreneurialchronicle.com/#organization",
                    name: "The Entrepreneurial Chronicles",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    sameAs: [
                      "https://www.facebook.com/Theentrepreneurialchronicles",
                      "https://www.instagram.com/the.entrepreneurialchronicles/",
                      "https://www.linkedin.com/company/theentrepreneurialchronicles/",
                    ],
                    logo: {
                      "@type": "ImageObject",
                      url: "https://www.theentrepreneurialchronicle.com/logos/logo-primary.png",
                      width: 300,
                      height: 150,
                    },
                  },
                  {
                    "@type": "WebSite",
                    url: "https://www.theentrepreneurialchronicle.com/",
                    name: "The Entrepreneurial Chronicles",
                    publisher: {
                      "@id":
                        "https://www.theentrepreneurialchronicle.com/#organization",
                    },
                  },
                ],
              }),
            }}
          />
        </Head>

        <body data-scroll-behavior="smooth">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
