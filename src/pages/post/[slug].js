import { useRouter } from "next/router";
import HeaderOne from "../../components/header/HeaderOne";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import Magazines from "../../components/post/Magazines";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { PortableText } from "@portabletext/react";
import { usePostBySlug } from "../../hooks/usePosts";
import { client } from "../../client";
import { getPostBySlugQuery } from "../../lib/sanity/queries/posts";
import { RichTextComponent } from "../../components/post/RichTextComponent";

const PostDetails = ({ initialData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const localView = router.query?.local === "1";
  const simpleView = router.query?.simple === "1" || localView;

  const {
    data: postData,
    isLoading,
    error,
  } = usePostBySlug(slug, {
    initialData,
    enabled: !!slug && !localView,
  });

  const localData = localView
    ? {
        title: router.query?.title || "",
        description: router.query?.description || "",
        featureImg: router.query?.img || "",
        altText: router.query?.alt || "",
        body: null,
      }
    : null;

  const resolvedPost = localView ? localData : postData;

  if (!localView) {
    if (isLoading) return <Loader />;
    if (error) return <ErrorFallback error={error} />;
  }

  if (!resolvedPost) return <div>No data found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={postData} />
      <HeaderOne />
      {simpleView ? (
        <div style={{ background: "#ffffff" }}>
          <div
            className="container"
            style={{ maxWidth: "980px", margin: "0 auto", padding: "24px 16px" }}
          >
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111" }}>
              {resolvedPost?.title}
            </h1>
            {resolvedPost?.description ? (
              <p style={{ marginTop: "10px", color: "rgba(0,0,0,0.75)", lineHeight: 1.7 }}>
                {resolvedPost.description}
              </p>
            ) : null}

            <div style={{ marginTop: "16px" }}>
              <img
                src={resolvedPost?.featureImg || "/images/placeholder.png"}
                alt={resolvedPost?.altText || resolvedPost?.title || "Post image"}
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  background: "#f2f2f2",
                  display: "block",
                  borderRadius: "12px",
                }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.png";
                }}
              />
            </div>

            <div style={{ marginTop: "18px", color: "#111" }}>
              {resolvedPost?.body ? (
                <PortableText value={resolvedPost?.body} components={RichTextComponent} />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>
          <PostFormatText postData={resolvedPost} />
          <Magazines />
        </>
      )}
      <FooterTwo />
    </>
  );
};

export default PostDetails;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  if (context?.query?.local === "1") {
    return {
      props: {
        initialData: null,
      },
    };
  }

  const query = getPostBySlugQuery(slug);
  const initialData = await client.fetch(query);

  return {
    props: {
      initialData,
    },
  };
}
