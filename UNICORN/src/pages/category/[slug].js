import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import FooterTwo from "../../components/footer/FooterTwo";
import HeaderOne from "../../components/header/HeaderOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import AdBanner from "../../components/common/AdBanner";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetCategory from "../../components/widget/WidgetCategory";
import SectionTitle from "../../components/elements/SectionTitle";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import { useState, useEffect } from "react";

const POSTS_PER_PAGE = 6;

const fetchPostsByCategory = async (category, page) => {
  const query = `*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "${category}"][0]._id] {
    title,
    slug,
    altText,
    'featureImg': mainImage.asset->url,
    publishedAt,
    description,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
  } | order(publishedAt desc)[${page * POSTS_PER_PAGE}...${
    (page + 1) * POSTS_PER_PAGE
  }]`;

  const posts = await client.fetch(query);
  return posts;
};

const fetchTotalPostsCount = async (category) => {
  const query = `count(*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "${category}"][0]._id])`;
  const count = await client.fetch(query);
  return count;
};

const PostCategory = ({ initialCategory, initialAllPosts }) => {
  const [page, setPage] = useState(0);

  const {
    data: postData,
    isLoading,
    isPreviousData,
  } = useQuery({
    queryKey: ["postData", initialCategory, page],
    queryFn: () => fetchPostsByCategory(initialCategory, page),
    keepPreviousData: true,
  });

  const { data: allPosts } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => fetchPostsByCategory(initialCategory, 0),
    initialData: initialAllPosts,
  });

  const { data: totalPosts } = useQuery({
    queryKey: ["totalPosts", initialCategory],
    queryFn: () => fetchTotalPostsCount(initialCategory),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const totalPages = totalPosts ? Math.ceil(totalPosts / POSTS_PER_PAGE) : 1;
  
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  if (isLoading || !postData) {
    return <Loader />;
  }

  const cateContent = postData[0];

  return (
    <div>
      <HeadMeta metaTitle={cateContent?.category?.title || "Category"} />
      <HeaderOne />

      <div className="axil-video-posts" style={{ background: '#000', color: '#fff', paddingTop: '2rem', paddingBottom: '0' }}>
        <div className="container">
          <SectionTitle
            btnUrl={`/category/${cateContent?.category?.slug || initialCategory}`}
            title={cateContent?.category?.title || "Category"}
            btnText="Read all Articles"
            pClass="title-white m-b-xs-40"
          />
        </div>
      </div>
      {/* Banner End here */}
      <div className="random-posts section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="axil-content">
                {postData.map((data) => (
                  <PostLayoutTwo
                    data={data}
                    postSizeMd={true}
                    key={data.slug.current}
                  />
                ))}
              </div>
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem', alignItems: 'center' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber - 1)}
                    disabled={isPreviousData && page === pageNumber - 1}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      color: page === pageNumber - 1 ? '#D4AF37' : '#333',
                      fontSize: '18px',
                      fontWeight: page === pageNumber - 1 ? 'bold' : 'normal',
                      minWidth: '30px'
                    }}
                  >
                    <span style={{ lineHeight: '1.2', display: 'block', marginBottom: '0' }}>{pageNumber}</span>
                    <span 
                      className="pagination-underline"
                      style={{
                        marginTop: '6px',
                        width: '30px',
                        height: '3px',
                        backgroundColor: page === pageNumber - 1 ? '#D4AF37' : '#333',
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        flexShrink: 0,
                        minHeight: '3px',
                        minWidth: '30px',
                        border: 'none',
                        padding: '0'
                      }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
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
      <style jsx global>{`
        /* Hide breadcrumb on category pages */
        .breadcrumb {
          display: none !important;
        }
        
        /* Heading section styling - black background with white text */
        .axil-video-posts .section-title {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          position: relative !important;
          margin-bottom: 0 !important;
        }
        
        .axil-video-posts .section-title .axil-title {
          text-align: left !important;
          margin-bottom: 0 !important;
        }
        
        .axil-video-posts .section-title .btn-link {
          margin-top: 0 !important;
          align-self: center !important;
          font-size: 1rem !important;
        }
        
        /* Pagination Underline Styles - Force visibility */
        .pagination button .pagination-underline,
        .pagination button span:last-child {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          height: 3px !important;
          min-height: 3px !important;
          width: 30px !important;
        }
        
        .pagination button {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default PostCategory;

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const category = params.slug;

  await queryClient.prefetchQuery(["postData", category, 0], () =>
    fetchPostsByCategory(category, 0)
  );
  await queryClient.prefetchQuery(["allPosts"], () =>
    fetchPostsByCategory(category, 0)
  );

  return {
    props: {
      initialCategory: category,
      initialAllPosts: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "category"]`;
  const categories = await client.fetch(query);

  const paths = (categories || [])
    .map((category) => category?.slug?.current)
    .filter(Boolean)
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
};
