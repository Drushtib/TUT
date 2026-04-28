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
  const postsPerPage = 9;

  // Save scroll position when clicking Read More
  const saveScrollPositionAndNavigate = (postSlug) => {
    // Save current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    sessionStorage.setItem(`scrollPosition_${slug}`, scrollPosition.toString());
    console.log(`Saved scroll position for ${slug}: ${scrollPosition}`);
    router.push(`/industry-post/${postSlug}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["industryPosts", slug],
    queryFn: () => fetchIndustryPostsByIndustry(slug),
    enabled: !!slug,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Restore scroll position if coming back from detail page
    const savedPosition = sessionStorage.getItem(`scrollPosition_${slug}`);
    if (savedPosition) {
      const position = parseInt(savedPosition);
      console.log(`Restoring scroll position for ${slug}: ${position}`);
      // Use a timeout to ensure the page is fully loaded before scrolling
      setTimeout(() => {
        window.scrollTo({ top: position, behavior: "auto" });
        sessionStorage.removeItem(`scrollPosition_${slug}`);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  const handlePostClick = (postSlug) => {
    saveScrollPositionAndNavigate(postSlug);
  };

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }, 1000);
  };

  // Fallback data for demonstration
  const fallbackData = [
    {
      title: "Sample Industry Post",
      slug: { current: "sample-post" },
      altText: "Sample post",
      publishedAt: new Date().toISOString(),
      featureImg: "/images/tech.jpg",
      description: "This is a sample industry post for demonstration purposes.",
      category: { title: "Technology", slug: "tech-ai" }
    }
  ];

  const postsData = data && data.length > 0 ? data : fallbackData;
  const categoryTitle = postsData?.[0]?.category?.title || "Industry Posts";
  const totalPages = Math.ceil((postsData?.length || 0) / postsPerPage);
  const currentPosts = postsData?.slice(0, currentPage * postsPerPage) || [];
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
          ) : !postsData || postsData.length === 0 ? (
            <div className="no-posts">No posts found.</div>
          ) : (
            currentPosts.map((post, index) => {
              // Ensure valid slug exists before rendering
              const postSlug = post?.slug?.current || post?.slug;
              if (!postSlug) {
                console.warn('Skipping post without valid slug:', post.title);
                return null;
              }
              
              return (
                <div
                  key={postSlug}
                  className={`blog-card ${isVisible ? "animate-in" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handlePostClick(postSlug)}
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
                    {post.description && post.description.length > 150 ? 
                      `${post.description.substring(0, 150)}... ` : 
                      post.description
                    }
                    {post.description && post.description.length > 150 && (
                      <span
                        style={{
                          color: '#000000',
                          textDecoration: 'none',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#ff0000';
                          e.target.style.textDecoration = 'underline';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#000000';
                          e.target.style.textDecoration = 'none';
                        }}
                        onClick={() => saveScrollPositionAndNavigate(postSlug)}
                      >
                        Read More
                      </span>
                    )}
                  </p>
                </div>
              </div>
              );
            })
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
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .industry-title:hover {
          color: #545454;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3.5rem;
          max-width: 1400px;
          margin: 0 auto 3rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #bb0505;
        }

        .blog-card:hover .blog-title {
          color: #bb0505;
        }

        .blog-image {
          width: 100%;
          height: 220px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .blog-image img {
          transition: transform 0.4s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .blog-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
          line-height: 1.4;
          transition: color 0.3s ease;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .blog-description {
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.75);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .read-more-btn {
          background: transparent !important;
          color: #000000 !important;
          border: 1px solid #000000 !important;
          padding: 0.5rem 1rem !important;
          border-radius: 4px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          font-size: 1rem !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          align-self: flex-start !important;
          margin-top: 1rem !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          text-decoration: none !important;
          display: inline-block !important;
        }

        .read-more-btn:hover {
          background: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
          transform: translateY(-2px) !important;
          cursor: pointer !important;
          text-decoration: none !important;
        }

        .show-more-container {
          text-align: center;
          margin: 3rem 0;
        }

        .show-more-btn {
          background: #ffffff !important;
          color: #bb0505 !important;
          border: 2px solid #bb0505;
          padding: 1rem 3rem;
          border-radius: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .show-more-btn:hover {
          background: #bb0505 !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(187, 5, 5, 0.3);
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
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
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
        @media (max-width: 1200px) {
          .industry-container {
            padding: 0 1.5rem;
          }

          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
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
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .blog-image {
            height: 220px;
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
