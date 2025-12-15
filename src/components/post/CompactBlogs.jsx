import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";

const CompactBlogs = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["compact-blogs"],
    queryFn: async () => {
      const query = `*[_type == "post" && (
        lower(categories[0]->title) match "*blog*" || 
        lower(categories[0]->title) match "*article*"
      )] {
        title,
        "slug": slug.current,
        publishedAt,
        description,
        'featureImg': mainImage.asset->url,
        'category': {
          'title': categories[0]->title,
          'slug': categories[0]->slug.current
        }
      } | order(publishedAt desc)[0...6]`;
      return await client.fetch(query);
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;
  if (!posts || posts.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <style jsx global>{`
        .view-all-link {
          color: #000000 !important;
        }
        .view-all-link:visited,
        .view-all-link:active,
        .view-all-link:focus {
          color: #000000 !important;
        }
        .view-all-link:hover {
          color: #545454 !important;
          text-decoration-color: #545454 !important;
        }
        @media (max-width: 991px) {
          .blog-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .blog-layout-grid > :first-child {
            grid-row: 1 !important;
          }
          .blog-grid-small {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .blog-grid-small {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div
        style={{
          background: "#ffffff",
          padding: "2rem 0",
          marginTop: "0",
        }}
      >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Section Header */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
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
            BLOGS
          </h2>
          <Link
            href="/blogs"
            className="view-all-link"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "#000000",
              textDecoration: "underline",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#545454";
              e.currentTarget.style.textDecorationColor = "#545454";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.textDecorationColor = "#000000";
            }}
          >
            View All
          </Link>
        </div>

        {/* Layout: Featured Large + 2x3 Grid */}
        <div
          className="blog-layout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            alignItems: "start",
          }}
        >
          {/* Large Featured Blog Post (Left - Top) */}
          {posts.length > 0 && (
            <Link
              href={`/post/${posts[0].slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                transition: "all 0.3s ease",
                overflow: "hidden",
                gridColumn: "1",
                gridRow: "1",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {/* Large Featured Image */}
              {posts[0].featureImg && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "95%",
                    height: "380px",
                    position: "relative",
                    overflow: "hidden",
                    background: "#f5f5f5",
                  }}
                >
                  <Image
                    src={posts[0].featureImg}
                    alt={posts[0].title || "Featured blog post"}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Featured Title */}
              <div
                style={{
                  padding: "1rem",
                  paddingLeft: "0.5rem",
                  background: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 700,
                    color: "#000000",
                    margin: 0,
                    lineHeight: "1.4",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {posts[0].title}
                </h3>
              </div>
            </Link>
          )}

          {/* Grid of Smaller Blog Posts (Right) - 2 columns, 2 rows */}
          <div
            className="blog-grid-small"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
              gridColumn: "2",
            }}
          >
            {posts.slice(1, 5).map((post, index) => (
              <Link
                key={post.slug || index}
                href={`/post/${post.slug}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  background: "#ffffff",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {/* Small Blog Image */}
                {post.featureImg && (
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      position: "relative",
                      overflow: "hidden",
                      background: "#f5f5f5",
                    }}
                  >
                    <Image
                      src={post.featureImg}
                      alt={post.title || "Blog post"}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                {/* Small Blog Title */}
                <div
                  style={{
                    padding: "0.625rem",
                    background: "#ffffff",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "#000000",
                      margin: 0,
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CompactBlogs;

