import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMeta from "../../components/elements/HeadMeta";
import { client } from "../../client";
import Image from "next/image";
import Link from "next/link";

const fetchIndustryPostsByIndustry = async (industrySlug) => {
  const query = `
    *[_type == "industryPost" && industryCategory->slug.current == $industrySlug]
    {
      title,
      slug,
      altText,
      publishedAt,
      'featureImg': mainImage.asset->url,
      description,
      'category': {
        'title': industryCategory->title,
        'slug': industryCategory->slug.current
      }
    } | order(publishedAt desc)
  `;

  return client.fetch(query, { industrySlug });
};

const IndustryPosts = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const postsPerPage = 8;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industryPosts", slug],
    queryFn: () => fetchIndustryPostsByIndustry(slug),
    enabled: !!slug,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  const handlePostClick = (postSlug) => {
    router.push(`/industry-post/${postSlug}`);
  };

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }, 1000);
  };

  const categoryTitle = data?.[0]?.category?.title || "Industry Posts";
  const totalPages = Math.ceil((data?.length || 0) / postsPerPage);
  const currentPosts = data?.slice(0, currentPage * postsPerPage) || [];
  const hasMore = currentPage < totalPages;

  return (
    <>
      <HeadMeta metaTitle={categoryTitle} />

      <HeaderOne />

      <div className="industry-container">
        <div className="industry-header">
          <h1 className="industry-title">{categoryTitle}</h1>
        </div>

        <div className="blogs-grid">
          {isLoading ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : error ? (
            <div className="error-alert">Error fetching posts</div>
          ) : !data || data.length === 0 ? (
            <div className="no-posts">No posts found.</div>
          ) : (
            currentPosts.map((post, index) => (
              <div
                key={post?.slug?.current || index}
                className={`blog-card ${isVisible ? "animate-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handlePostClick(post.slug.current)}
              >
                <div className="blog-image">
                  <Image
                    src={post.featureImg}
                    alt={post.altText || post.title}
                    width={400}
                    height={250}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-description">
                    {post.description ? `${post.description.substring(0, 150)}...` : "Click to read more about this industry post."}
                  </p>
                  <button className="read-more-btn">
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className="show-more-container">
            <button 
              className="show-more-btn"
              onClick={handleShowMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <div className="spinner"></div>
              ) : (
                "Show More"
              )}
            </button>
          </div>
        )}
      </div>

      <FooterTwo />

      <style jsx>{`
        .industry-container {
          width: 100%;
          padding: 2rem 1rem;
          background-color: #ffffff;
          min-height: 100vh;
        }

        .industry-header {
          text-align: center;
          margin-bottom: 1rem;
          padding: 2rem 0;
        }

        .industry-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #171717;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
          transition: color 0.3s ease;
        }

        .industry-title:hover {
          color: #dc3545;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 1rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(220, 53, 69, 0.15);
        }

        .blog-image {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .blog-content {
          padding: 1.5rem;
        }

        .blog-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #171717;
          margin-bottom: 1rem;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .blog-card:hover .blog-title {
          color: #dc3545;
        }

        .blog-description {
          font-size: 1.1rem;
          color: #333333;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .read-more-btn {
          background: #dc3545;
          color: #ffffff;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .read-more-btn:hover {
          background: #c82333;
          transform: translateY(-2px);
        }

        .show-more-container {
          text-align: center;
          margin: 1rem 0;
        }

        .show-more-btn {
          background: #dc3545;
          color: #ffffff;
          border: none;
          padding: 1rem 3rem;
          border-radius: 0;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .show-more-btn:hover:not(:disabled) {
          background: #c82333;
          transform: translateY(-2px);
        }

        .animate-in {
          animation: slideInFromBottom 0.6s ease-out;
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .error-alert {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin: 2rem 0;
        }

        .no-posts {
          text-align: center;
          color: #666;
          font-size: 1.2rem;
          margin: 2rem 0;
        }

        @media (min-width: 768px) {
          .industry-container {
            padding: 2rem 2rem;
          }
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 767px) {
          .industry-container {
            padding: 1rem;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .blog-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default IndustryPosts;
