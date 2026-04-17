import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";
import { useState, useEffect, useRef } from "react";

const IndustryBlogs = () => {
  // Fetch categories
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      const query = `*[_type == "industryCategory"]{
        title,
        slug,
        'image': image.asset->url,
        description
      }`;
      const response = await client.fetch(query);
      return response;
    },
  });

  // Safe fallback
  const allIndustries =
    categories && categories.length > 0
      ? categories
      : [
          { title: "Education", slug: { current: "education" }, image: "/images/education.jpg", description: "Explore the latest trends and insights in the education sector." },
          { title: "Finance", slug: { current: "finance" }, image: "/images/finance.jpg", description: "Stay updated with financial news and market analysis." },
          { title: "Healthcare", slug: { current: "healthcare" }, image: "/images/healthcare.jpg", description: "Discover healthcare innovations and medical advancements." },
          { title: "Technology & AI", slug: { current: "tech-ai" }, image: "/images/tech.jpg", description: "Learn about cutting-edge technology and AI developments." },
          { title: "Manufacturing", slug: { current: "manufacturing" }, image: "/images/manufacturing.jpg", description: "Industry insights and manufacturing trends." },
          { title: "Transportation", slug: { current: "transportation" }, image: "/images/transportation.jpg", description: "Transportation and logistics industry updates." },
          { title: "Legal", slug: { current: "legal" }, image: "/images/legal.jpg", description: "Legal industry news and regulatory updates." },
          { title: "Retail & E-commerce", slug: { current: "e-commerce" }, image: "/images/ecommerce.jpg", description: "E-commerce trends and retail industry insights." }
        ];

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;
  if (!categories || categories.length === 0) return null;
  return (
    <>
      <style jsx global>{`
        .industry-blogs-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
        }

        .industry-blogs-header {
          margin-bottom: 2.5rem;
          text-align: left;
          border-bottom: 3px solid #000;
          padding-bottom: 1rem;
        }

        .industry-blogs-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
        }

        .industry-blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3.5rem;
          margin-bottom: 3rem;
        }

        .industry-blog-card {
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

        .industry-blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #bb0505;
        }

        .industry-blog-card:hover .industry-blog-title {
          color: #bb0505;
        }

        .industry-blog-image-container {
          width: 100%;
          height: 180px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .industry-blog-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .industry-blog-card:hover .industry-blog-image-container img {
          transform: scale(1.05);
        }

        .industry-blog-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .industry-blog-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
          line-height: 1.4;
          font-family: var(--primary-font);
        }

        .industry-blog-desc {
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
          .industry-blogs-container {
            padding: 0 1.5rem 4rem;
          }

          .industry-blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .industry-blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .industry-blog-image-container {
            height: 160px;
          }
        }

        @media (max-width: 480px) {
          .industry-blogs-container {
            padding: 0 1rem 4rem;
          }

          .industry-blogs-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .industry-blog-image-container {
            height: 180px;
          }
        }
      `}</style>

      <div style={{ background: "#fff", padding: "4rem 0", margin: "4rem 0" }}>
        <div className="industry-blogs-container">
          <div className="industry-blogs-header">
            <h2>Our Industry Blogs</h2>
          </div>

          <div className="industry-blogs-grid">
            {allIndustries.map((category, index) => (
              <Link key={`${category.slug?.current}-${index}`} href={`/industries/${category.slug?.current}`} className="industry-blog-card">
                <div className="industry-blog-image-container">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="industry-blog-body">
                  <h3 className="industry-blog-title">{category.title}</h3>
                  {category.description && (
                    <p className="industry-blog-desc">{category.description}</p>
                  )}
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

export default IndustryBlogs;
