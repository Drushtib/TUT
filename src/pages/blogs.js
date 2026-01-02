import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Link from "next/link";

const Blogs = () => {
  const query = `
  *[_type == "post" && 
    lower(categories[0]->title) match "*blog*"
  ]{
    title,
    "slug": slug.current,
    altText,
    publishedAt,

    'featureImg': mainImage.asset->url,
    description,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
  } | order(publishedAt desc)
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allPosts"],

    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = async () => {
    if (!data || isLoadingMore) return;

    setIsLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 650));
    setVisibleCount((prev) => Math.min(prev + 8, data.length));
    setIsLoadingMore(false);
  };

  const visiblePosts = data ? data.slice(0, visibleCount) : [];

  return (
    <>
      <HeadMeta
        metaTitle="Blogs | The Unicorn Time"

        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div className="blogs-container">
        <div className="blogs-page-header">
          <h1 className="blogs-page-title">Blogs</h1>
          <p className="blogs-page-subtitle">
            Latest insights, stories, and strategies from entrepreneurs and industry leaders.
          </p>
        </div>

        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : error ? (
          <div className="error-alert">Error fetching posts</div>
        ) : (
          <>
            <div className="blogs-grid">
              {visiblePosts.map((post, index) => (
                <div
                  key={post.slug || index}
                  className={`blog-card ${isVisible ? "animate-in" : ""}`}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="blog-card-image">
                    <img
                      src={post.featureImg || "/images/placeholder.png"}
                      alt={post.altText || post.title || "Blog image"}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                  </div>

                  <div className="blog-card-body">
                    <h3 className="blog-card-title">{post.title}</h3>
                    {post.description && (
                      <p className="blog-card-desc">{post.description}</p>
                    )}

                    <Link href={`/post/${post.slug}`} passHref legacyBehavior>
                      <a className="blog-readmore">Read More</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {data && visibleCount < data.length && (
              <div className="blogs-load-more">
                <button
                  type="button"
                  className="show-more-btn"
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <span className="show-more-inner">
                      <span className="spinner" aria-hidden="true" />
                      Loading...
                    </span>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <FooterTwo />

      <style jsx>{`
        .blogs-container {
          width: 100%;
          padding: 2.5rem 1rem 3.5rem;
          background-color: #ffffff;
          min-height: 100vh;
        }

        .blogs-page-header {
          max-width: 1400px;
          margin: 0 auto 2rem;
          padding: 0 1rem;
          text-align: center;
        }

        .blogs-page-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #000000;
          -webkit-text-fill-color: #000000;
          margin: 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .blogs-page-subtitle {
          margin: 0.75rem auto 0;
          max-width: 70ch;
          color: rgba(0, 0, 0, 0.82);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.82);
          font-size: 1.5rem;
          line-height: 1.65;
        }

        .blogs-grid {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 5rem 1.75rem;
        }

        .blog-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          opacity: 1;
          transform: translateY(0);
        }

        .blog-card.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.10);
          border-color: rgba(187, 5, 5, 0.35);
        }

        .blog-card:hover .blog-card-title {
          color: var(--primary-color);
          -webkit-text-fill-color: var(--primary-color);
        }

        .blog-card-image {
          width: 100%;
          height: 220px;
          background: rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .blog-card:hover .blog-card-image img {
          transform: translateY(-2px);
          filter: saturate(1.08) contrast(1.06);
        }

        .blog-card-body {
          padding: 1.25rem 1.15rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .blog-card-title {
          margin: 0;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-weight: 800;
          font-size: 1.55rem;
          line-height: 1.35;
          position: relative;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 2px;
          width: 0;
          background: var(--primary-color);
          transition: width 0.25s ease;
        }

        .blog-card:hover .blog-card-title::after {
          width: 64px;
        }

        .blog-card-desc {
          margin: 0;
          color: rgba(0, 0, 0, 0.82);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.82);
          font-size: 1.35rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.6em;
        }

        .blog-readmore {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          background: #ffffff !important;
          border: 1px solid #000000 !important;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.3px;
          font-size: 1.3rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
        }

        .blog-readmore:hover {
          transform: translateY(-1px);
          background: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 16px 34px rgba(187, 5, 5, 0.22);
        }

        .blogs-load-more {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .show-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem 1.6rem;
          border-radius: 14px;
          border: 1px solid #000000 !important;
          background: #000000 !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 800;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .show-more-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .show-more-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.10);
          background: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        .show-more-inner {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.18);
          border-top-color: var(--primary-color);
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 767px) {
          .blogs-container {
            padding: 2rem 0.5rem 3rem;
          }
        }

        @media (max-width: 1200px) {
          .blogs-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .blog-card {
            min-height: 500px;
          }
        }

        @media (max-width: 992px) {
          .blogs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem 1.25rem;
          }

          .blog-card {
            min-height: 480px;
          }

          .blogs-page-title {
            font-size: 2.6rem;
          }

          .blogs-page-subtitle {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 576px) {
          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.6rem;
          }

          .blog-card-image {
            height: 240px;
          }

          .blog-card {
            min-height: 0;
          }

          .blog-card-title {
            font-size: 1.35rem;
          }

          .blog-card-desc {
            font-size: 1.15rem;
          }

          .blogs-page-title {
            font-size: 2.2rem;
          }

          .blogs-page-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Blogs;