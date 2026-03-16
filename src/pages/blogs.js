import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Link from "next/link";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data ? data.slice(indexOfFirstPost, indexOfLastPost) : [];
  const totalPages = data ? Math.ceil(data.length / postsPerPage) : 0;
  
  // Recent posts for sidebar (first 5 posts)
  const recentPosts = data ? data.slice(0, 5) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HeadMeta
        metaTitle="Blogs | The Unicorn Time"
        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div className="blogs-page">
        {/* Page Header */}
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
          <div className="main-layout">
            {/* Left Side - Main Content */}
            <div className="main-content">
              <div className="blogs-grid">
                {currentPosts.map((post, index) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ←
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Recent Posts Sidebar */}
            <div className="sidebar">
              <div className="recent-posts">
                <h3>Recent Posts</h3>
                <div className="recent-posts-list">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="recent-post-item slide-in">
                      <Link href={`/post/${post.slug}`}>
                        <div className="recent-post-content">
                          <div className="recent-post-image">
                            <img
                              src={post.featureImg}
                              alt={post.title}
                            />
                          </div>
                          <div className="recent-post-title">
                            <h4>{post.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
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
        }

        .blogs-page h2,
        .blogs-page h3,
        .blogs-page h4,
        .blogs-page p,
        .blogs-page a {
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .blogs-page a:hover {
          color: #bb0505 !important;
          -webkit-text-fill-color: #bb0505 !important;
        }

        /* Page Header */
        .blogs-page-header {
          text-align: center;
          padding: 2rem 1rem 1rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 3px solid #bb0505;
        }

        .blogs-page-title {
          font-size: 2.5rem;
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
          font-size: 1.1rem;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Main Layout */
        .main-layout {
          display: flex;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        .main-content {
          flex: 1;
          min-width: 0;
        }

        .sidebar {
          width: 320px;
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        /* Blog Grid */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .blog-card-title {
          margin: 0;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.4;
          position: relative;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-desc {
          margin: 0 0 1.5rem 0;
          color: rgba(0, 0, 0, 0.75);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.75);
          font-size: 1rem;
          line-height: 1.6;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
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
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
        }

        .blog-readmore:hover {
          background: #990000 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.35);
        }

        /* Recent Posts Sidebar */
        .recent-posts {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.08);
        }

        .recent-posts h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: #000000;
          -webkit-text-fill-color: #000000;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 3px solid #bb0505;
          padding-bottom: 0.5rem;
        }

        .recent-posts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .recent-post-item {
          animation: slideInRight 0.6s ease forwards;
          opacity: 0;
        }

        .recent-post-item:nth-child(1) { animation-delay: 0.1s; }
        .recent-post-item:nth-child(2) { animation-delay: 0.2s; }
        .recent-post-item:nth-child(3) { animation-delay: 0.3s; }
        .recent-post-item:nth-child(4) { animation-delay: 0.4s; }
        .recent-post-item:nth-child(5) { animation-delay: 0.5s; }

        .recent-post-content {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #ffffff;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .recent-post-content:hover {
          transform: translateX(-3px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-color: #bb0505;
        }

        .recent-post-image {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.08);
        }

        .recent-post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .recent-post-content:hover .recent-post-image img {
          transform: scale(1.05);
        }

        .recent-post-title h4 {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.3;
          color: #000000;
          -webkit-text-fill-color: #000000;
          transition: color 0.3s ease;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .recent-post-content:hover .recent-post-title h4 {
          color: #bb0505;
          -webkit-text-fill-color: #bb0505;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 3rem;
        }

        .pagination-btn {
          padding: 0.75rem 1rem;
          border: 2px solid #bb0505;
          background: white;
          color: #bb0505;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          min-width: 48px;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #bb0505;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(187,5,5,0.3);
        }

        .pagination-btn.active {
          background: #bb0505;
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
            gap: 1.5rem;
            padding: 0 1.5rem 4rem;
          }

          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .sidebar {
            width: 280px;
          }
        }

        @media (max-width: 968px) {
          .main-layout {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            position: static;
            order: -1;
            margin-bottom: 2rem;
          }

          .recent-posts-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

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
            height: 240px;
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
            height: 220px;
          }

          .blogs-page-title {
            font-size: 2rem;
          }

          .blogs-page-subtitle {
            font-size: 1rem;
          }

          .pagination-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
            min-width: 40px;
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
