import SectionTitle from "../elements/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import Image from "next/image";
import Link from "next/link";

const IndustryPosts = () => {
  const query = `*[_type == "industryPost"]{
    title,
    slug,
    altText,
    "featureImg": mainImage.asset->url,
    publishedAt,
    description,
    "category": {
      "title": industryCategory->title,
      "slug": industryCategory->slug.current
    }
  } | order(publishedAt desc)[0...6]`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industry-posts"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching industry posts</div>;
  if (!data) return null;

  return (
    <div className="section-gap section-gap-top__with-text" style={{ background: "#fff", color: "#000" }}>
      <div className="container">
        <SectionTitle
          title="Industry Posts"
          btnText="All Posts"
          btnUrl={"/industries"}
          pClass="title-black m-b-xs-40"
        />
        <div className="row">
          {data.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.slug?.current || post.title}>
              <div
                className="industry-post-card"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                  background: "#ffffff",
                  marginBottom: "2rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(220, 53, 69, 0.15)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Link href={`/industry-post/${post.slug?.current}`} style={{ display: "block" }}>
                  <div style={{ position: "relative", width: "100%", height: 200, overflow: "hidden" }}>
                    <Image
                      src={post.featureImg}
                      alt={post.altText || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>

                <div style={{ padding: "1.5rem" }}>
                  <div className="post-cat-group m-b-xs-10">
                    <Link 
                      className={`post-cat cat-btn bg-color-blue-one`} 
                      href={`/industries/${post.category?.slug}`}
                      style={{
                        fontSize: "0.9rem",
                        textTransform: "capitalize",
                        marginBottom: "0.5rem"
                      }}
                    >
                      {post.category?.title}
                    </Link>
                  </div>
                  <h3 
                    className="axil-post-title hover-line hover-line" 
                    style={{ 
                      marginBottom: "1rem",
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: "#000",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#dc3545";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#000";
                    }}
                  >
                    <Link href={`/industry-post/${post.slug?.current}`}>{post.title}</Link>
                  </h3>
                  <p 
                    className="mid" 
                    style={{ 
                      marginBottom: "1.5rem", 
                      color: "#333333",
                      fontSize: "1.1rem",
                      lineHeight: "1.6"
                    }}
                  >
                    {post?.description && post.description.length > 80
                      ? `${post.description.slice(0, 120)}...`
                      : post.description}
                  </p>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Link 
                      href={`/industry-post/${post.slug?.current}`}
                      className="read-more-btn"
                      style={{
                        background: "#990000",
                        color: "#ffffff",
                        border: "none",
                        padding: "0.75rem 2rem",
                        borderRadius: "0",
                        fontWeight: "700",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "inline-block",
                        textDecoration: "none"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#c82333";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#dc3545";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryPosts;
