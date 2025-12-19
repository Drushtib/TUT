import Head from "next/head";

const HeadMeta = ({ metaTitle, metaDesc }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="description"
        content={
          metaDesc ||
          "The Unicorn Time is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
        }
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>
        {metaTitle ||
          "The Unicorn Time"}
      </title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadMeta;
