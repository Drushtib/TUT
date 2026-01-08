import Head from "next/head";

const HeadMetaDynamic = ({ metaData }) => {
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
      <title>
        {metaData?.title
          ? `${metaData.title}`
          : "The Unicorn Times"}
      </title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default HeadMetaDynamic;
