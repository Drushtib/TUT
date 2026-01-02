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

      <style jsx global>{`
        .read-more-btn {
          color: #ffffff !important;
        }
        .read-more-btn:hover {
          color: #ffffff !important;
        }
        .read-more-btn:active {
          color: #ffffff !important;
        }
      `}</style>

      <style jsx>{`
        .industry-container {
          width: 100%;
          padding: 2rem 1rem;
          background-color: #ffffff;
          min-height: 100vh;
        }

        .industry-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }

        .industry-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #171717;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
          transition: color 0.3s ease;
        }

        .industry-title:hover {
          color: #545454;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto 3rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e5e5;
          border-top: 4px solid #dc3545;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
        }

        .blog-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          border: 1px solid transparent;
          border-top: 4px solid transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .blog-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(220, 53, 69, 0.25);
          border-color: #dc3545;
        }

        .blog-card:hover::before {
          border-color: #dc3545;
          box-shadow: 0 0 0 1px rgba(220, 53, 69, 0.1);
        }

        .blog-image {
          width: 100%;
          height: 250px;
          position: relative;
          overflow: hidden;
        }

        .blog-image img {
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #171717;
          margin-bottom: 1rem;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .blog-card:hover .blog-title {
          color: #545454;
        }

        .blog-description {
          font-size: 1.4rem;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .read-more-btn {
          background: #dc3545 !important;
          color: #ffffff !important;
          border: none;
          padding: 0.8rem 2.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-transform: capitalize;
          letter-spacing: 1px;
          font-size: 1.3rem !important;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
          margin-top: auto;
        }

        .read-more-btn:hover {
          background: #c82333 !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }

        .read-more-btn:active {
          background: #bd2130 !important;
          color: #ffffff !important;
        }

        .read-more-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
        }

        .show-more-container {
          text-align: center;
          margin: 3rem 0;
        }

        .show-more-btn {
          background: #dc3545 !important;
          color: #ffffff !important;
          border: none;
          padding: 1rem 3rem;
          border-radius: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .show-more-btn:hover {
          background: #c82333 !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }

        .show-more-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

        .animate-in {
          animation: slideInFromBottom 0.6s ease-out;
        }

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .industry-container {
            padding: 1rem 0.5rem;
          }

          .industry-header {
            margin-bottom: 2rem;
            padding: 1rem 0;
          }

          .industry-title {
            font-size: clamp(1.5rem, 6vw, 2rem);
            letter-spacing: 0.5px;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin: 0 auto 2rem;
          }

          .blog-card {
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          .blog-image {
            height: 200px;
          }

          .blog-content {
            padding: 1.5rem;
          }

          .blog-title {
            font-size: 1.2rem;
            margin-bottom: 0.8rem;
          }

          .blog-description {
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }

          .read-more-btn {
            padding: 0.7rem 2rem;
            font-size: 0.85rem;
          }

          .show-more-container {
            margin: 2rem 0;
          }

          .show-more-btn {
            padding: 0.8rem 2rem;
            font-size: 0.9rem;
          }
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) and (min-width: 769px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .blog-image {
            height: 220px;
          }

          .blog-content {
            padding: 1.8rem;
          }

          .blog-title {
            font-size: 1.3rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .industry-container {
            padding: 0.5rem 0.25rem;
          }

          .blogs-grid {
            gap: 1rem;
          }

          .blog-content {
            padding: 1rem;
          }

          .blog-title {
            font-size: 1.1rem;
          }

          .blog-description {
            font-size: 0.9rem;
          }

          .read-more-btn {
            padding: 0.6rem 1.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default IndustryPosts;
