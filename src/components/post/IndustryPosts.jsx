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
    <>
      <style jsx global>{`
        .industry-posts-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
        }

        .industry-posts-header {
          margin-bottom: 2.5rem;
          text-align: left;
          border-bottom: 3px solid #000;
          padding-bottom: 1rem;
        }

        .industry-posts-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
        }

        .industry-posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3.5rem;
          margin-bottom: 3rem;
        }

        .industry-post-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          transform: translateY(0);
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }

        .industry-post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #bb0505;
        }

        .industry-post-card:hover .industry-post-title {
          color: #bb0505;
        }

        .industry-post-image-container {
          width: 100%;
          height: 180px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .industry-post-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .industry-post-card:hover .industry-post-image-container img {
          transform: scale(1.05);
        }

        .industry-post-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .industry-post-category {
          font-size: 0.9rem;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .industry-post-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
          line-height: 1.4;
          font-family: var(--primary-font);
        }

        .industry-post-desc {
          margin: 0;
          color: rgba(0, 0, 0, 0.75);
          font-size: 1.2rem;
          line-height: 1.6;
          font-weight: 400;
          font-family: var(--primary-font);
        }

        .industry-readmore {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.8rem 2rem;
          border-radius: 8px;
          background: #bb0505;
          border: none;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
          font-family: var(--primary-font);
        }

        .industry-readmore:hover {
          background: #990000;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.35);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .industry-posts-container {
            padding: 0 1.5rem 4rem;
          }

          .industry-posts-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .industry-posts-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .industry-post-image-container {
            height: 160px;
          }
        }

        @media (max-width: 480px) {
          .industry-posts-container {
            padding: 0 1rem 4rem;
          }

          .industry-posts-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .industry-post-image-container {
            height: 180px;
          }
        }
      `}</style>

      <div className="section-gap section-gap-top__with-text" style={{ background: "#fff", color: "#000" }}>
        <div className="industry-posts-container">
          <div className="industry-posts-header">
            <h2>Industry Posts</h2>
          </div>

          <div className="industry-posts-grid">
            {data.map((post) => (
              <Link key={post.slug?.current || post.title} href={`/industry-post/${post.slug?.current}`} className="industry-post-card">
                <div className="industry-post-image-container">
                  <Image
                    src={post.featureImg}
                    alt={post.altText || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="industry-post-body">
                  {post.category?.title && (
                    <div className="industry-post-category">{post.category?.title}</div>
                  )}
                  <h3 className="industry-post-title">{post.title}</h3>
                  <p className="industry-post-desc">
                    {post?.description && post.description.length > 80
                      ? `${post.description.slice(0, 120)}...`
                      : post.description}
                  </p>
                  <div className="industry-readmore">Read More</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryPosts;
