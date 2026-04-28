import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import Magazines from "../../components/post/Magazines";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import { client } from "../../client";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";

const fetchNewsData = async (slug) => {
  const newsQuery = `*[_type == "news" && slug.current == '${slug}'][0] {
    title,
    altText,
    category,
    slug,
    'featureImg': mainImage.asset->url,
    body,
    description,
    publishedAt
  }`;
  const newsData = await client.fetch(newsQuery);
  return newsData;
};

const NewsDetails = ({ initialData }) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: newsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentNews", slug],
    queryFn: () => fetchNewsData(slug),
    enabled: !!slug,
    initialData,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching news: {error.message}</div>;
  if (!newsData) return <div>No data found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={newsData} />
      <HeaderOne />
      <PostFormatText postData={newsData} />
      <Magazines />
      <FooterTwo />
    </>
  );
};

export default NewsDetails;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const initialData = await fetchNewsData(slug);

  return {
    props: {
      initialData,
    },
  };
}
