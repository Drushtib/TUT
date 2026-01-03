import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";

const CompactArticles = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ["compact-articles"],
    queryFn: async () => {
      const query = `*[_type == "magazine"] | order(publishedAt desc)[0...9] {
        title,
        slug,
        publishedAt,
        description,
        'featureImg': mainImage.asset->url
      }`;
      return await client.fetch(query);
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;
  if (!articles || articles.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        .articles-container {
          max-width: 100% !important;
          padding-left: 2rem !important;
          padding-right: 2rem !important;
          padding-bottom: 3rem !important;
          margin-bottom: 2rem !important;
        }

        .articles-section {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .articles-header {
          animation: slideDown 0.6s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .articles-grid {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
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
        
        .article-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 4px;
          border: 1px solid rgba(198, 160, 84, 0.55);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          animation: cardFadeIn 0.6s ease-out both;
          padding: 0 !important;
          background-color: #FFFFFF;
        }
        
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .article-card:nth-child(1) { animation-delay: 0.1s; }
        .article-card:nth-child(2) { animation-delay: 0.15s; }
        .article-card:nth-child(3) { animation-delay: 0.2s; }
        .article-card:nth-child(4) { animation-delay: 0.25s; }
        .article-card:nth-child(5) { animation-delay: 0.3s; }
        .article-card:nth-child(6) { animation-delay: 0.35s; }
        .article-card:nth-child(7) { animation-delay: 0.4s; }
        .article-card:nth-child(8) { animation-delay: 0.45s; }
        .article-card:nth-child(9) { animation-delay: 0.5s; }
        
        .article-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          z-index: 5;
        }
        
        .article-card:hover .article-image-container {
          overflow: visible !important;
        }
        
        .article-image-container {
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: visible !important;
        }
        
        .article-image {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .article-card:hover .article-image-container {
          transform: scale(1.05);
          overflow: visible !important;
          z-index: 10;
        }
        
        .article-card:hover .article-image {
          transform: scale(1.05);
        }
        
        .articles-header .view-all-articles-link,
        .view-all-articles-link {
          position: absolute !important;
          right: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-size: 1.2rem !important;
          font-weight: 500 !important;
          color: #000000 !important;
          text-decoration: underline !important;
          text-decoration-color: #000000 !important;
        }
        
        .articles-header .view-all-articles-link:hover,
        .view-all-articles-link:hover {
          color: var(--primary-color) !important;
          text-decoration-color: var(--primary-color) !important;
        }
        
        .articles-header .view-all-articles-link:active,
        .articles-header .view-all-articles-link:visited,
        .articles-header .view-all-articles-link:focus,
        .view-all-articles-link:active,
        .view-all-articles-link:visited,
        .view-all-articles-link:focus {
          color: #000000 !important;
          text-decoration-color: #000000 !important;
        }
        
        /* Large Desktop (1400px+) - Default styles apply */
        
        /* Desktop (1025px - 1399px) */
        @media (max-width: 1399px) and (min-width: 1025px) {
          .articles-container {
            max-width: 100% !important;
            padding: 0 1.5rem !important;
          }
          
          .articles-header h2 {
            font-size: 2.75rem !important;
          }
          
          .article-image-container {
            width: 170px !important;
            min-width: 170px !important;
            height: 140px !important;
          }
          
          .article-card .article-title,
          .article-card h3 {
            font-size: 1.5rem !important;
          }
        }
        
        /* Tablet Landscape (769px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .articles-section {
            padding: 2.5rem 0 !important;
          }
          
          .articles-container {
            padding: 0 1.5rem !important;
          }
          
          .articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
          
          .articles-header {
            margin-bottom: 1.75rem !important;
          }
          
          .articles-header h2 {
            font-size: 2.5rem !important;
          }
          
          .view-all-articles-link {
            font-size: 1.1rem !important;
          }
          
          .article-card {
            padding: 0 !important;
            gap: 1.25rem !important;
          }
          
          .article-image-container {
            width: 160px !important;
            min-width: 160px !important;
            height: 130px !important;
          }
          
          .article-card .article-title,
          .article-card h3 {
            font-size: 1.35rem !important;
            line-height: 1.5 !important;
          }
        }
        
        /* Tablet Portrait (481px - 768px) */
        @media (max-width: 768px) and (min-width: 481px) {
          .articles-section {
            padding: 2rem 0 !important;
          }
          
          .articles-container {
            padding: 0 1rem !important;
          }
          
          .articles-header {
            margin-bottom: 1.5rem !important;
          }
          
          .articles-header h2 {
            font-size: 3rem !important;
            letter-spacing: 1px !important;
          }
          
          .articles-header .view-all-articles-link,
          .view-all-articles-link {
            position: absolute !important;
            right: 0 !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 1rem !important;
            font-weight: 500 !important;
            color: #000000 !important;
            text-decoration: underline !important;
            text-decoration-color: #000000 !important;
          }
          
          .articles-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .article-card {
            flex-direction: row !important;
            padding: 0 !important;
            gap: 1rem !important;
            align-items: center !important;
          }
          
          .article-image-container {
            width: 130px !important;
            min-width: 130px !important;
            height: 110px !important;
            padding: 5px !important;
          }
          
          .article-card .article-title,
          .article-card h3 {
            font-size: 1.3rem !important;
            line-height: 1.5 !important;
            -webkit-line-clamp: 3 !important;
          }
        }
        
        /* Mobile (320px - 480px) */
        @media (max-width: 480px) {
          .articles-section {
            padding: 1.5rem 0 !important;
          }
          
          .articles-container {
            padding: 0 0.75rem !important;
          }
          
          .articles-header {
            margin-bottom: 1.25rem !important;
          }
          
          .articles-header h2 {
            font-size: 3rem !important;
            letter-spacing: 1px !important;
          }
          
          .articles-header .view-all-articles-link,
          .view-all-articles-link {
            position: absolute !important;
            right: 1rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 0.85rem !important;
            font-weight: 500 !important;
            color: #000000 !important;
            text-decoration: underline !important;
            text-decoration-color: #000000 !important;
            white-space: nowrap !important;
          }
          
          .articles-grid {
            grid-template-columns: 1fr !important;
            gap: 0.875rem !important;
          }
          
          .article-card {
            flex-direction: row !important;
            padding: 0 !important;
            gap: 0.75rem !important;
            align-items: center !important;
          }
          
          .article-image-container {
            width: 100px !important;
            min-width: 100px !important;
            height: 85px !important;
            padding: 5px !important;
          }
          
          .article-card .article-title,
          .article-card h3 {
            font-size: 1.3rem !important;
            line-height: 1.5 !important;
            -webkit-line-clamp: 3 !important;
          }
        }
        
        /* Extra Small Mobile (max-width: 360px) */
        @media (max-width: 360px) {
          .articles-container {
            padding: 0 0.5rem !important;
          }
          
          .articles-header h2 {
            font-size: 2.5rem !important;
            letter-spacing: 1px !important;
          }
          
          .articles-header .view-all-articles-link,
          .view-all-articles-link {
            position: absolute !important;
            right: 0.75rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 0.75rem !important;
            font-weight: 500 !important;
            color: #000000 !important;
            text-decoration: underline !important;
            text-decoration-color: #000000 !important;
          }
          
          .article-card {
            padding: 0 !important;
            gap: 0.625rem !important;
          }
          
          .article-image-container {
            width: 90px !important;
            min-width: 90px !important;
            height: 75px !important;
          }
          
          .article-card .article-title,
          .article-card h3 {
            font-size: 1.2rem !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
      <div
        className="articles-section"
        style={{
          padding: "3rem 0",
          marginTop: "0",
        }}
      >
        <div className="articles-container" style={{ maxWidth: "100%", margin: "0 auto", padding: "0 2rem" }}>
          {/* Section Header */}
          <div className="articles-header" style={{ position: "relative", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#000000",
                textTransform: "uppercase",
                letterSpacing: "1px",
                margin: 0,
                padding: 0,
                textAlign: "center",
              }}
            >
              Latest Articles
            </h2>
          </div>

          {/* Articles Grid - 3 Columns, 3 Rows */}
          <div
            className="articles-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3rem",
            }}
          >
            {articles.map((article, index) => (
              <Link
                key={article.slug?.current || article.slug || index}
                href={`/magazine/${article.slug?.current || article.slug}`}
                className="article-card"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "row",
                  padding: "0",
                  gap: "0.1rem",
                  alignItems: "center",
                  borderRadius: "4px",
                  border: "1px solid rgba(198, 160, 84, 0.55)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Article Image - Left Side */}
                {article.featureImg && (
                  <div
                    className="article-image-container"
                    style={{
                      width: "180px",
                      minWidth: "180px",
                      height: "150px",
                      position: "relative",
                      flexShrink: 0,
                      overflow: "visible",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      transform: "translateX(-17px)",
                    }}
                  >
                    <Image
                      src={article.featureImg}
                      alt={article.title || "Article"}
                      fill
                      className="article-image"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                )}

                {/* Article Title - Right Side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "1.25rem 1.25rem 1.25rem 0.5rem",
                  }}
                >
                  <h3
                    className="article-title"
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "#000000",
                      margin: "0 0 0 -30px",
                      lineHeight: "1.6",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {article.title}
                  </h3>
                  {article.description && (
                    <p
                      style={{
                        margin: "0.5rem 0 0 -30px",
                        fontSize: "1.2rem",
                        lineHeight: "1.6",
                        color: "#444444",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompactArticles;

