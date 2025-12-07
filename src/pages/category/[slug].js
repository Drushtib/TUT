import { dehydrate, QueryClient } from "@tanstack/react-query";
import FooterTwo from "../../components/footer/FooterTwo";
import HeaderOne from "../../components/header/HeaderOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
// import AdBanner from "../../components/common/AdBanner"; // (unused, can remove or keep)
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetCategory from "../../components/widget/WidgetCategory";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import { useState, useEffect } from "react";
import {
  usePaginatedPostsByCategory,
  usePostsByCategory,
} from "../../hooks/usePosts";
import { PAGINATION } from "../../config/constants";
import { client } from "../../client";
import {
  getPaginatedPostsByCategoryQuery,
  getPostsByCategoryQuery,
} from "../../lib/sanity/queries/posts";

const PostCategory = ({ initialCategory }) => {
  const [page, setPage] = useState(0);

  const {
    data: postData,
    isLoading,
    isPreviousData,
    error,
  } = usePaginatedPostsByCategory(
    initialCategory,
    page,
    PAGINATION.POSTS_PER_PAGE
  );

  const { data: allPosts } = usePostsByCategory(initialCategory);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleNextPage = () => {
    if (!isPreviousData && postData?.length === PAGINATION.POSTS_PER_PAGE) {
      setPage((old) => old + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((old) => Math.max(old - 1, 0));
  };

  if (isLoading || !postData) {
    return <Loader />;
  }

  if (error) {
    return <ErrorFallback error={error} />;
  }

  const cateContent = postData[0];

  return (
    <>
      <HeadMeta metaTitle={cateContent?.category?.title || "Web Profiles"} />
      <HeaderOne />
      <Breadcrumb aPage={cateContent?.category?.title || "Web Profile"} />

      <div className="banner banner__default bg-grey-light-three">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="post-title-wrapper">
                <h2 className="m-b-xs-0 axil-post-title hover-line">
                  {cateContent?.category?.title || "Web Profiles"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End here */}

      <div className="random-posts section-gap">
        <div className="container">
          <div className="row">
            {/* LEFT CONTENT */}
            <div className="col-lg-8">
              <div className="axil-content">
                {postData.map((data) => {
                  // ✅ Safe slug supports both {slug: {current}} and slug: "string"
                  const safeSlug =
                    data?.slug?.current || data?.slug || data?._id || "";

                  return (
                    <PostLayoutTwo
                      data={data}
                      postSizeMd={true}
                      key={safeSlug}
                    />
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  className="btn btn-primary btn-small"
                  onClick={handlePreviousPage}
                  disabled={page === 0}
                >
                  Previous Page
                </button>
                <span>Page {page + 1}</span>
                <button
                  className="btn btn-primary btn-small"
                  onClick={handleNextPage}
                  disabled={
                    isPreviousData ||
                    postData?.length < PAGINATION.POSTS_PER_PAGE
                  }
                >
                  Next Page
                </button>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetAd />
                <WidgetSocialShare />
                <WidgetCategory cateData={allPosts} />
                <WidgetPost dataPost={allPosts} />
                <WidgetAd
                  img="/images/clientbanner/clientbanner3.jpg"
                  height={492}
                  width={320}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default PostCategory;

/* ---------------------- SSG + React Query Hydration ---------------------- */

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const category = params.slug;

  const paginatedQuery = getPaginatedPostsByCategoryQuery(
    category,
    0,
    PAGINATION.POSTS_PER_PAGE
  );
  const allPostsQuery = getPostsByCategoryQuery(category);

  await queryClient.prefetchQuery({
    queryKey: ["posts", "paginated", 0, category],
    queryFn: async () => await client.fetch(paginatedQuery),
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "category", category],
    queryFn: async () => await client.fetch(allPostsQuery),
  });

  return {
    props: {
      initialCategory: category,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { getAllCategoriesQuery } = await import(
    "../../lib/sanity/queries/categories"
  );
  const query = getAllCategoriesQuery();
  const categories = await client.fetch(query);

  const paths = (categories || [])
    .map((category) => category?.slug?.current)
    .filter(Boolean)
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
};
