import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";
import { useState, useEffect, useRef } from "react";

const IndustryBlogs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const carouselRef = useRef(null);

  // Fetch categories
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      const query = `*[_type == "industryCategory"]{
        title,
        slug,
        'image': image.asset->url
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
          { title: "Education", slug: { current: "education" }, image: "/images/education.jpg" },
          { title: "Finance", slug: { current: "finance" }, image: "/images/finance.jpg" },
          { title: "Healthcare", slug: { current: "healthcare" }, image: "/images/healthcare.jpg" },
          { title: "Technology & AI", slug: { current: "tech-ai" }, image: "/images/tech.jpg" },
          { title: "Manufacturing", slug: { current: "manufacturing" }, image: "/images/manufacturing.jpg" },
          { title: "Transportation", slug: { current: "transportation" }, image: "/images/transportation.jpg" },
          { title: "Legal", slug: { current: "legal" }, image: "/images/legal.jpg" },
          { title: "Retail & E-commerce", slug: { current: "e-commerce" }, image: "/images/ecommerce.jpg" }
        ];

  // ✅ Auto-scroll carousel (HOOK ALWAYS RUNS)
  useEffect(() => {
    if (!isAutoScrolling || allIndustries.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= allIndustries.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, allIndustries.length]);

  // Visible items
  const visibleItems = allIndustries.map(
    (_, i) => allIndustries[(currentIndex + i) % allIndustries.length]
  );

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;
  if (!categories || categories.length === 0) return null;
  return (
    <>
      <style jsx global>{`
        .industry-carousel {
          position: relative;
          overflow: hidden;
          padding: 2rem 0;
        }
        .industry-carousel-container {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        .industry-circle {
          flex: 0 0 auto;
          width: 200px;
          padding: 0 1rem;
        }
        @media (max-width: 1024px) {
          .industry-circle {
            width: 180px;
          }
        }
        @media (max-width: 768px) {
          .industry-circle {
            width: 160px;
          }
        }
      `}</style>

      <div style={{ background: "#fff", padding: "4rem 0", margin: "4rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "3rem",
              textTransform: "uppercase",
            }}
          >
            Our Industry Blogs
          </h2>

          <div
            className="industry-carousel"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <div
              className="industry-carousel-container"
              ref={carouselRef}
              style={{
                transform: `translateX(-${currentIndex * 216}px)`,
                gap: "2rem",
              }}
            >
              {visibleItems.map((category, index) => (
                <div key={`${category.slug?.current}-${index}`} className="industry-circle">
                  <Link href={`/industries/${category.slug?.current}`}>
                    <div
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          marginBottom: "1.5rem",
                          border: "2px solid var(--primary-color)",
                        }}
                      >
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <h3 style={{ fontWeight: 700 }}>{category.title}</h3>

                      <div
                        style={{
                          marginTop: "1rem",
                          padding: "0.75rem 2rem",
                          background: "var(--primary-color)",
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        Read More
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryBlogs;
