import { dehydrate, QueryClient } from "@tanstack/react-query";
import FooterTwo from "../../components/footer/FooterTwo";
import HeaderOne from "../../components/header/HeaderOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import AdBanner from "../../components/common/AdBanner";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetCategory from "../../components/widget/WidgetCategory";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import { useState, useEffect } from "react";
import PostLayoutYT from "../../components/post/layout/PostLayoutYT";
import { useVideoInterviews } from "../../hooks/useVideos";
import { PAGINATION } from "../../config/constants";
import { client } from "../../client";
import { getVideoInterviewsQuery } from "../../lib/sanity/queries/videos";

const PostCategory = ({ initialPosts }) => {
  const [page, setPage] = useState(0);

  const {
    data: postData,
    isLoading,
    isFetching,
    isPreviousData,
    error,
  } = useVideoInterviews(page, PAGINATION.POSTS_PER_PAGE, {
    initialData: initialPosts,
  });

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

  return (
    <>
      <HeadMeta metaTitle={"video interviews"} />
      <HeaderOne />
      <Breadcrumb aPage={"video interviews"} />

      <div className="banner banner__default bg-grey-light-three">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="post-title-wrapper">
                <h2 className="m-b-xs-0 axil-post-title hover-line">
                  Video Interviews
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
            <div className="col-lg-8">
              <div className="axil-content">
                {postData.map((data) => (
                  <PostLayoutYT
                    data={data}
                    postSizeMd={true}
                    key={data.slug.current}
                  />
                ))}
              </div>
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
                  disabled={isPreviousData || postData?.length < PAGINATION.POSTS_PER_PAGE}
                >
                  Next Page
                </button>
                {isFetching && <Loader />} {/* Show Loader while fetching */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetAd />
                <WidgetSocialShare />
                <WidgetCategory cateData={postData} />
                <WidgetPost dataPost={postData} />
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

// Server-side data fetching using dehydrate for initial data hydration
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  const query = getVideoInterviewsQuery(0, PAGINATION.POSTS_PER_PAGE);

  const initialPosts = await client.fetch(query);

  await queryClient.prefetchQuery({
    queryKey: ["videos", "interviews"],
    queryFn: async () => initialPosts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialPosts,
    },
  };
}

export default PostCategory;
