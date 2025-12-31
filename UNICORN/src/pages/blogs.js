import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetCategory from "../components/widget/WidgetCategory";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import { useRouter } from "next/router";

const Blogs = () => {
  const query = `
    *[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "blogs-and-articles"][0]._id]
    {
      title,
      slug,
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

  const handlePostClick = (slug) => {
    window.location.href = `/post/${slug}`;
  };

  return (
    <>
      <HeadMeta
        metaTitle="Best Business Blog for the Latest News, Proven Strategies, and Insightful Analysis | The Entrepreneurial Chronicles"
        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div className="blogs-container">
        {/* TOP ROW */}
        <div className="blogs-top-row">
          {/* Featured Articles LEFT */}
          <div className="featured-articles-section">
            <h4 className="section-title">Featured Articles</h4>
            <div className="featured-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                data?.slice(0, 3).map((post, index) => (
                  <div 
                    key={index} 
                    className={`featured-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="featured-article-image">
                      <img
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="featured-article-content">
                      <h6 className="featured-article-title">
                        {post.title}
                      </h6>
                      <span className="read-more-link">
                        Read More →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Latest Articles RIGHT */}
          <div className="latest-articles-section">
            <h4 className="section-title">Latest Articles</h4>
            <div className="latest-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                data?.slice(3, 6).map((post, index) => (
                  <div 
                    key={index} 
                    className={`latest-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="latest-article-image">
                      <img
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="latest-article-content">
                      <h6 className="latest-article-title">
                        {post.title}
                      </h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="blogs-bottom-row">
          {/* Remaining Articles LEFT */}
          <div className="remaining-articles-section">
            <div className="remaining-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                data?.slice(6).map((post, index) => (
                  <div 
                    key={index} 
                    className={`remaining-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="remaining-article-image">
                      <img
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="remaining-article-content">
                      <h6 className="remaining-article-title">
                        {post.title}
                      </h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar RIGHT */}
          <div className="sidebar-section">
            <div className={`sidebar-widget ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h4 className="section-title">Subscribe To Our Weekly Newsletter</h4>
              <WidgetNewsletter />
            </div>
            <div className={`sidebar-widget ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
              <h4 className="section-title">Categories</h4>
              <WidgetCategory />
            </div>
            <div className={`sidebar-widget ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
              <h4 className="section-title">Social Share</h4>
              <WidgetSocialShare />
            </div>
            <div className={`sidebar-widget ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.5s' }}>
              <h4 className="section-title">Web Profile</h4>
              <WidgetPost />
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />

      <style jsx>{`
        .blogs-container {
          width: 100%;
          padding: 2rem 1rem;
          background-color: #000000ff;
          min-height: 100vh;
        }

        /* Section Titles */
        .section-title {
          color: #fff;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
        }

        /* Top Row Layout */
        .blogs-top-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        /* Featured Articles Section with Animation */
        .featured-articles-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .featured-article-card {
          display: flex;
          background: #000000ff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          min-height: 100px;
          opacity: 0;
          transform: translateX(-50px);
        }

        .featured-article-card.animate-in {
          animation: slideInFromLeft 0.6s ease forwards;
        }

        .featured-article-card:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .featured-article-image {
          flex: 0 0 120px;
          position: relative;
        }

        .featured-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-article-content {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-article-title {
          font-size: clamp(1.6rem, 1.5vw, 1.1rem);
          font-weight: 600;
          color: #fff;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
          margin: 0;
        }

        .read-more-link {
          color: #007bff;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        /* Latest Articles Section with Animation */
        .latest-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .latest-article-card {
          background: #000000ff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          display: flex;
          flex-direction: column;
          height: 350px;
          opacity: 0;
          transform: translateY(-30px);
        }

        .latest-article-card.animate-in {
          animation: slideInFromTop 0.6s ease forwards;
        }

        .latest-article-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0, 123, 255, 0.2);
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .latest-article-image {
          position: relative;
          height: 200px;
          flex-shrink: 0;
        }

        .latest-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .latest-article-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .latest-article-title {
          font-size: clamp(1.6rem, 1.5vw, 1.1rem);
          font-weight: 600;
          color: #fff;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          margin: 0;
        }

        /* Bottom Row Layout */
        .blogs-bottom-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        /* Remaining Articles Section with Animation */
        .remaining-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .remaining-article-card {
          background: #000000ff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          height: 300px;
          opacity: 0;
          transform: translateY(30px);
        }

        .remaining-article-card.animate-in {
          animation: slideInFromBottom 0.6s ease forwards;
        }

        .remaining-article-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0, 123, 255, 0.2);
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

        .remaining-article-image {
          position: relative;
          height: 160px;
        }

        .remaining-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remaining-article-content {
          padding: 1rem;
        }

        .remaining-article-title {
          font-size: clamp(1.6rem, 1.5vw, 1rem);
          font-weight: 600;
          color: #fff;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
          margin: 0;
        }

        /* Sidebar Section with Animation */
        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-widget {
          background: #000000ff;
          padding: 1.5rem;
          border-radius: 12px;
          opacity: 0;
          transform: translateX(30px);
        }

        .sidebar-widget.animate-in {
          animation: slideInFromRight 0.6s ease forwards;
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Loader and Error States */
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .error-alert {
          color: #dc3545;
          background: rgba(220, 53, 69, 0.1);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        /* Tablet Styles */
        @media (min-width: 768px) {
          .blogs-container {
            padding: 2rem 1.5rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Desktop Styles */
        @media (min-width: 1024px) {
          .blogs-container {
            padding: 2rem 2rem;
          }

          .blogs-top-row {
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
          }

          .blogs-bottom-row {
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .featured-article-image {
            flex: 0 0 140px;
          }

          .latest-article-card {
            height: 340px;
          }

          .latest-article-image {
            height: 200px;
          }
        }

        /* Large Desktop Styles */
        @media (min-width: 1440px) {
          .blogs-container {
            padding: 2rem 3rem;
            max-width: 1400px;
            margin: 0 auto;
          }

          .featured-article-image {
            flex: 0 0 160px;
          }

          .latest-article-card {
            height: 325px;
          }

          .latest-article-image {
            height: 220px;
          }

          .remaining-article-image {
            height: 180px;
          }
        }

        /* Mobile Optimization */
        @media (max-width: 767px) {
          .blogs-container {
            padding: 1rem 0.5rem;
          }

          .featured-article-card {
            flex-direction: column;
            min-height: auto;
          }

          .featured-article-image {
            flex: 0 0 160px;
            width: 100%;
          }

          .featured-article-content {
            padding: 0.75rem;
          }

          .latest-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .latest-article-card {
            height: 300px;
          }

          .latest-article-image {
            height: 180px;
          }

          .remaining-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .sidebar-widget {
            padding: 1rem;
          }
        }

        /* Small Mobile Optimization */
        @media (max-width: 480px) {
          .blogs-container {
            padding: 0.5rem;
          }

          .featured-article-image {
            flex: 0 0 120px;
          }

          .latest-article-card {
            height: 280px;
          }

          .latest-article-image {
            height: 160px;
          }

          .remaining-article-image {
            height: 140px;
          }

          .section-title {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Blogs;