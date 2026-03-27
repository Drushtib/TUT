import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";
import { useState, useEffect } from "react";

const BlogPage = () => {
  const [visiblePosts, setVisiblePosts] = useState(9); // Show 9 posts initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch blog posts
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        publishedAt,
        description,
        'featureImg': mainImage.asset->url,
        'category': {
          'title': categories[0]->title,
          'slug': categories[0]->slug.current
        }
      }[0...50]`; // Fetch up to 50 posts
      return await client.fetch(query);
    },
  });

  // Fallback blog posts if no data
  const blogPosts = posts && posts.length > 0 ? posts : [
    {
      title: "The Future of Artificial Intelligence in Business",
      slug: "future-ai-business",
      description: "Exploring how AI is transforming various industries and what it means for the future of business operations and strategy.",
      featureImg: "/images/blog-ai.jpg",
      publishedAt: "2024-01-15",
      category: { title: "Technology", slug: "technology" }
    },
    {
      title: "Sustainable Business Practices for 2024",
      slug: "sustainable-business-2024",
      description: "Learn about the latest sustainable practices that businesses are adopting to reduce their environmental impact.",
      featureImg: "/images/blog-sustainable.jpg",
      publishedAt: "2024-01-14",
      category: { title: "Sustainability", slug: "sustainability" }
    },
    {
      title: "Digital Marketing Trends to Watch",
      slug: "digital-marketing-trends",
      description: "Discover the top digital marketing trends that will shape the industry in 2024 and beyond.",
      featureImg: "/images/blog-marketing.jpg",
      publishedAt: "2024-01-13",
      category: { title: "Marketing", slug: "marketing" }
    },
    {
      title: "Leadership in Remote Work Era",
      slug: "leadership-remote-work",
      description: "How leaders can effectively manage teams in a remote work environment and maintain productivity.",
      featureImg: "/images/blog-leadership.jpg",
      publishedAt: "2024-01-12",
      category: { title: "Leadership", slug: "leadership" }
    },
    {
      title: "Investment Strategies for Startups",
      slug: "investment-strategies-startups",
      description: "Essential investment strategies that every startup founder should know for sustainable growth.",
      featureImg: "/images/blog-investment.jpg",
      publishedAt: "2024-01-11",
      category: { title: "Finance", slug: "finance" }
    },
    {
      title: "The Rise of E-commerce in 2024",
      slug: "rise-ecommerce-2024",
      description: "Understanding the e-commerce boom and how businesses can capitalize on online retail opportunities.",
      featureImg: "/images/blog-ecommerce.jpg",
      publishedAt: "2024-01-10",
      category: { title: "E-commerce", slug: "ecommerce" }
    },
    {
      title: "Cybersecurity Best Practices",
      slug: "cybersecurity-best-practices",
      description: "Essential cybersecurity measures that every business should implement to protect their digital assets.",
      featureImg: "/images/blog-cybersecurity.jpg",
      publishedAt: "2024-01-09",
      category: { title: "Security", slug: "security" }
    },
    {
      title: "Innovation in Healthcare Technology",
      slug: "innovation-healthcare-tech",
      description: "How technological innovations are revolutionizing the healthcare industry and patient care.",
      featureImg: "/images/blog-healthcare.jpg",
      publishedAt: "2024-01-08",
      category: { title: "Healthcare", slug: "healthcare" }
    },
    {
      title: "Supply Chain Management in 2024",
      slug: "supply-chain-2024",
      description: "Modern approaches to supply chain management that improve efficiency and reduce costs.",
      featureImg: "/images/blog-supply-chain.jpg",
      publishedAt: "2024-01-07",
      category: { title: "Logistics", slug: "logistics" }
    }
  ];

  const displayedPosts = blogPosts.slice(0, visiblePosts);

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 6, blogPosts.length));
      setIsLoadingMore(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <>
      <style jsx global>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }
        
        .blog-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          animation: fadeInUp 0.6s ease-out;
        }
        
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .blog-card-image {
          width: 100%;
          height: 250px;
          position: relative;
          overflow: hidden;
        }
        
        .blog-card-image img {
          transition: transform 0.3s ease;
        }
        
        .blog-card:hover .blog-card-image img {
          transform: scale(1.05);
        }
        
        .blog-card-content {
          padding: 1.5rem;
        }
        
        .blog-card-category {
          display: inline-block;
          background: #f0f0f0;
          color: #333;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }
        
        .blog-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #171717;
          margin-bottom: 0.75rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .blog-card-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .blog-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #999;
        }
        
        .read-more-btn {
          background: #bb0505;
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          font-size: 0.875rem;
        }
        
        .read-more-btn:hover {
          background: #990000;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(187, 5, 5, 0.3);
        }
        
        .show-more-btn {
          background: #bb0505;
          color: #ffffff;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          font-size: 1rem;
          margin: 2rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .show-more-btn:hover {
          background: #990000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.4);
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
        
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .blog-card {
            margin: 0 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .blog-card {
            margin: 0 0.5rem;
          }
          
          .blog-card-content {
            padding: 1rem;
          }
        }
      `}</style>

      <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Page Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "#171717",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Blog
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Discover the latest insights, trends, and stories from the world of business and innovation.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {displayedPosts.map((post, index) => (
              <div key={`${post.slug}-${index}`} className="blog-card">
                <Link href={`/post/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="blog-card-image">
                    <Image
                      src={post.featureImg}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="blog-card-content">
                    {post.category && (
                      <span className="blog-card-category">
                        {post.category.title}
                      </span>
                    )}
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-description">{post.description}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>5 min read</span>
                    </div>
                    <button className="read-more-btn">
                      Read More
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {displayedPosts.length < blogPosts.length && (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <button 
                className="show-more-btn"
                onClick={handleShowMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
