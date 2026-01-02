import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import { client } from "../../client";

const fetchIndustryPost = async (slug) => {
  const query = `*[_type == "industryPost" && slug.current == $slug][0]{
    title,
    altText,
    keywords,
    slug,
    "featureImg": mainImage.asset->url,
    body,
    description
  }`;
  return client.fetch(query, { slug });
};

const IndustryPostDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industryPost", slug],
    queryFn: () => fetchIndustryPost(slug),
    enabled: !!slug,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching post</div>;
  if (!data) return <div>No data found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={data} />
      <HeaderOne />
      <PostFormatText postData={data} />
      <FooterTwo />
    </>
  );
};

export default IndustryPostDetails;
