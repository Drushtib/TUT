import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Link from "next/link";

const Blogs = () => {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const postsPerLoad = 6;

  const query = `
  *[_type == "post"
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
      try {
        const response = await client.fetch(query);
        console.log('Blogs page - Posts fetched:', response);
        return response;
      } catch (err) {
        console.error('Blogs page - Error fetching posts:', err);
        throw err;
      }
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Calculate visible posts
  const displayedPosts = data ? data.slice(0, visiblePosts) : [];
  const hasMorePosts = data ? visiblePosts < data.length : false;
  
  const loadMore = () => {
    setVisiblePosts(prev => prev + postsPerLoad);
  };

  return (
    <>
      <HeadMeta
        metaTitle="Blogs | The Unicorn Time"
        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div className="blogs-page">
        {/* Page Header */}
        

        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : error ? (
          <div className="error-alert">Error fetching posts</div>
        ) : (
          <div className="main-layout">
            {/* Main Content */}
            <div className="main-content">
              <div className="blogs-grid">
                {displayedPosts.map((post, index) => (
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

              {/* Show More Button */}
              {hasMorePosts && (
                <div className="show-more-container">
                  <button
                    onClick={loadMore}
                    className="show-more-btn"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <FooterTwo />

      <style jsx global>{`
        .blogs-page {
          background: #ffffff !important;
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
          min-height: 100vh;
          font-family: var(--primary-font) !important;
        }

        .blogs-page h2,
        .blogs-page h3,
        .blogs-page h4,
        .blogs-page p,
        .blogs-page a:not(.blog-readmore) {
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .blogs-page a:not(.blog-readmore):hover {
          color: #bb0505 !important;
          -webkit-text-fill-color: #bb0505 !important;
        }

        /* Page Header */
        .blogs-page-header {
          text-align: center;
          padding: 2rem 1rem 1rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .blogs-page-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #000000;
          -webkit-text-fill-color: #000000;
          margin: 0;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .blogs-page-subtitle {
          margin: 1rem auto 0;
          max-width: 60ch;
          color: rgba(0, 0, 0, 0.7);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.7);
          font-size: 1.4rem;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Main Layout */
        .main-layout {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
        }

        .main-content {
          width: 100%;
        }

        /* Blog Grid */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3.5rem;
          margin-bottom: 3rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          transform: translateY(0);
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .blog-card.animate-in {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .blog-card:nth-child(1) { animation-delay: 0.1s; }
        .blog-card:nth-child(2) { animation-delay: 0.2s; }
        .blog-card:nth-child(3) { animation-delay: 0.3s; }
        .blog-card:nth-child(4) { animation-delay: 0.4s; }
        .blog-card:nth-child(5) { animation-delay: 0.5s; }
        .blog-card:nth-child(6) { animation-delay: 0.6s; }
        .blog-card:nth-child(7) { animation-delay: 0.7s; }
        .blog-card:nth-child(8) { animation-delay: 0.8s; }
        .blog-card:nth-child(9) { animation-delay: 0.9s; }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #bb0505;
        }

        .blog-card:hover .blog-card-title {
          color: #bb0505;
          -webkit-text-fill-color: #bb0505;
        }

        .blog-card-image {
          width: 100%;
          height: 200px;
          background: rgba(0, 0, 0, 0.02);
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .blog-card:hover .blog-card-image img {
          transform: scale(1.05);
        }

        .blog-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .blog-card-title {
          margin: 0;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-weight: 700;
          font-size: 1.6rem;
          line-height: 1.4;
          position: relative;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--primary-font);
        }

        .blog-card-desc {
          margin: 0 0 1.5rem 0;
          color: rgba(0, 0, 0, 0.75);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.75);
          font-size: 1.2rem;
          line-height: 1.6;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--primary-font);
        }

        .blog-readmore {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.8rem 2rem;
          border-radius: 8px;
          background: #bb0505 !important;
          border: none !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
          font-family: var(--primary-font);
        }

        .blog-readmore:hover {
          background: #990000 !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.35);
        }

        /* Show More Button */
        .show-more-container {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .show-more-btn {
          padding: 1rem 3rem;
          border: 2px solid #bb0505;
          background: white;
          color: #bb0505;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--primary-font);
        }

        .show-more-btn:hover {
          background: #bb0505;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(187,5,5,0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-layout {
            padding: 0 1.5rem 4rem;
          }

          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 968px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .blogs-page-header {
            padding: 2rem 1rem 1rem;
          }

          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .blog-card-image {
            height: 200px;
          }

          .blog-card {
            min-height: 0;
          }

          .blogs-page-title {
            font-size: 2.2rem;
          }

          .blogs-page-subtitle {
            font-size: 1.1rem;
          }

          .recent-posts-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .main-layout {
            padding: 0 1rem 4rem;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .blog-card-image {
            height: 200px;
          }

          .blogs-page-title {
            font-size: 2rem;
          }

          .blogs-page-subtitle {
            font-size: 1rem;
          }

          .recent-post-content {
            padding: 0.75rem;
          }

          .recent-post-image {
            width: 60px;
            height: 60px;
          }

          .recent-post-title h4 {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default Blogs;
