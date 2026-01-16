import Head from "next/head";

const HeadMeta = ({ metaTitle, metaDesc, metaImage = "/images/og-default.jpg", metaUrl = "https://www.theentrepreneurialchronicle.com" }) => {
  const title = metaTitle || "The Entrepreneurial Chronicles";
  const description = metaDesc || "Defining the future of global excellence";
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{title}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="The Entrepreneurial Chronicles" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@EntrepreneurialChron" />
      <meta name="twitter:creator" content="@EntrepreneurialChron" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content="business magazine, entrepreneurship, startup stories, business news, entrepreneur chronicles, business success stories, startup magazine" />
      <meta name="author" content="The Entrepreneurial Chronicles" />
      <meta name="theme-color" content="#000000" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};

export default HeadMeta;
