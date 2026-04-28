import Head from "next/head";
import { useRouter } from "next/router";

const HeadMetaDynamic = ({ metaData }) => {
  const router = useRouter();
  const canonicalUrl = `https://theunicorntimes.com${router.asPath}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="description"
        content={
          metaData?.description ||
          "Defining the future of global excellence"
        }
      />
      <meta
        name="keywords"
        content={
          metaData?.keywords ||
          "business, magazines, entrepreneurs, popular-personalities"
        }
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      
      {/* Canonical URL - prevents duplicate content issues */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph tags for social media sharing */}
      <meta
        property="og:title"
        content={metaData?.title || "The Unicorn Times"}
      />
      <meta
        property="og:description"
        content={
          metaData?.description ||
          "Defining the future of global excellence"
        }
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      {metaData?.featureImg && (
        <meta property="og:image" content={metaData.featureImg} />
      )}
      <meta property="og:site_name" content="The Unicorn Times" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={metaData?.title || "The Unicorn Times"}
      />
      <meta
        name="twitter:description"
        content={
          metaData?.description ||
          "Defining the future of global excellence"
        }
      />
      {metaData?.featureImg && (
        <meta name="twitter:image" content={metaData.featureImg} />
      )}
      
      <title>
        {metaData?.title
          ? `${metaData.title} | The Unicorn Times`
          : "The Unicorn Times"}
      </title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default HeadMetaDynamic;
