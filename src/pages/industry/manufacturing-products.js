import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import HeadMeta from "../../components/elements/HeadMeta";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import { client } from "../../client";

import ImgAbstract from "../../assest/abstract.jpg";
import ImgBg from "../../assest/bg.jpg";
import ImgWit from "../../assest/34378620_v915-wit-002-k.jpg";
import ImgAbout from "../../assest/about us img.avif";
import ImgAdvertise from "../../assest/advertise.avif";
import ImgMediakit1 from "../../assest/mediakit1.jpg";
import ImgMediakit2 from "../../assest/mediakit2.jpg";
import ImgMediakit3 from "../../assest/mediakit3.jpg";
import ImgMediakit4 from "../../assest/mediakit4.jpg";
import ImgMediakit5 from "../../assest/mediakit5.jpg";
import ImgMediakit6 from "../../assest/mediakit6.jpg";
import ImgMediakit7 from "../../assest/mediakit7.jpg";

const ManufacturingProductsPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "manufacturing-products" in categories[]->slug.current ||
        "manufacturing" in categories[]->slug.current ||
        "products" in categories[]->slug.current ||
        lower(categories[0]->title) match "*manufact*" ||
        lower(categories[0]->title) match "*product*" ||
        lower(title) match "*manufact*" ||
        lower(title) match "*product*" ||
        lower(title) match "*supply*" ||
        lower(description) match "*manufact*" ||
        lower(description) match "*product*" ||
        lower(description) match "*supply*"
      )] | order(publishedAt desc)[0...12] {
        title,
        "slug": slug.current,
        altText,
        publishedAt,
        description,
        "imageUrl": mainImage.asset->url,
        category->{title, "slug": slug.current}
      }
    `,
    []
  );

  const { data: sanityPosts, isLoading, error } = useQuery({
    queryKey: ["industry", "manufacturing-products", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Manufacturing in 2025: Key Trends",
        slug: "manufacturing-2025-key-trends",
        description: "Automation, quality, and modern production systems.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Product Development: From Idea to Launch",
        slug: "product-development-idea-to-launch",
        description: "A practical roadmap for building and shipping products.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Supply Chain Basics: Avoid Disruptions",
        slug: "supply-chain-basics-avoid-disruptions",
        description: "Reduce risk with planning, vendors, and forecasting.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Quality Control: What Actually Works",
        slug: "quality-control-what-actually-works",
        description: "Systems, checks, and metrics for consistent output.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Lean Manufacturing: Reduce Waste",
        slug: "lean-manufacturing-reduce-waste",
        description: "Simple principles to improve efficiency and throughput.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Industrial IoT for Factories",
        slug: "industrial-iot-for-factories",
        description: "Sensors, monitoring, and predictive maintenance.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Automation ROI: Measuring Impact",
        slug: "automation-roi-measuring-impact",
        description: "How to evaluate automation investments and outcomes.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Product Ops: Scaling Delivery",
        slug: "product-ops-scaling-delivery",
        description: "Process, tooling, and teams for reliable execution.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Packaging: Improve Customer Experience",
        slug: "packaging-improve-customer-experience",
        description: "Better packaging can reduce returns and boost satisfaction.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "AI in Manufacturing",
        slug: "ai-in-manufacturing",
        description: "Anomaly detection, forecasting, and automation with AI.",
        imageUrl: ImgWit?.src,
      },
      {
        title: "Vendor Management Best Practices",
        slug: "vendor-management-best-practices",
        description: "Build reliable supplier relationships and performance tracking.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Product Strategy: Prioritize What Matters",
        slug: "product-strategy-prioritize-what-matters",
        description: "Choose features that create real value and reduce churn.",
        imageUrl: ImgAdvertise?.src,
      },
    ],
    []
  );

  const posts = useMemo(() => {
    const primary = Array.isArray(sanityPosts) ? sanityPosts : [];
    const seen = new Set(primary.map((p) => p?.slug?.current || p?.slug).filter(Boolean));

    const merged = [...primary];
    for (const fb of fallbackPosts) {
      const fbSlug = fb?.slug?.current || fb?.slug;
      if (!fbSlug || seen.has(fbSlug)) continue;
      merged.push(fb);
      seen.add(fbSlug);
      if (merged.length >= 12) break;
    }

    return merged.slice(0, 12);
  }, [sanityPosts, fallbackPosts]);

  const sanitySlugSet = useMemo(
    () =>
      new Set(
        (Array.isArray(sanityPosts) ? sanityPosts : [])
          .map((p) => p?.slug?.current || p?.slug)
          .filter(Boolean)
      ),
    [sanityPosts]
  );

  const handleCardClick = (post) => {
    const slug = post?.slug?.current || post?.slug || "";
    if (!slug) return;

    const isLocal = !sanitySlugSet.has(slug);
    if (isLocal) {
      const qs = new URLSearchParams({
        local: "1",
        simple: "1",
        title: post?.title || "",
        description: post?.description || "",
        img: post?.imageUrl || "",
        alt: post?.altText || "",
      });
      window.location.href = `/post/${slug}?${qs.toString()}`;
      return;
    }

    window.location.href = `/post/${slug}?simple=1`;
  };

  return (
    <>
      <HeadMeta
        metaTitle="Manufacturing/Products | Industries | The Unicorn Time"
        metaDesc="Manufacturing & product insights: production, supply chain, quality, and product operations."
      />

      <HeaderOne />

      <section className="mp-hero">
        <div className="mp-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="mp-hero-title">Manufacturing/Products</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="mp-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="mp-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="mp-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="mp-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="mp-card-image-fallback">MP</div>
                      )}
                    </div>

                    <div className="mp-card-content">
                      <h3 className="mp-card-title">{title}</h3>
                      {desc ? <p className="mp-card-desc">{desc}</p> : null}
                      <div className="mp-card-footer">
                        <span className="mp-read">Read More</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .mp-hero,
        .mp-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .mp-hero {
          padding: 24px 0 18px;
        }

        .mp-hero-inner {
          text-align: center;
        }

        .mp-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .mp-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .mp-section {
          padding: 10px 0 50px;
        }

        .mp-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .mp-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .mp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .mp-grid {
            grid-template-columns: 1fr;
          }
        }

        .mp-card {
          border: 1px solid rgba(0, 0, 0, 0.10);
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          outline: none;
          position: relative;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .mp-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .mp-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .mp-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .mp-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .mp-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mp-card-image-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: 1px;
          color: rgba(0, 0, 0, 0.7);
          background: rgba(0, 0, 0, 0.03);
        }

        .mp-card-content {
          padding: 4px 14px 12px;
        }

        .mp-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .mp-card-desc {
          margin: 0;
          color: rgba(0, 0, 0, 0.78) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.78) !important;
          font-size: 13px;
          line-height: 1.55;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 60px;
        }

        .mp-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mp-read {
          color: var(--primary-color);
          font-weight: 700;
          letter-spacing: 0.3px;
          font-size: 12px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default ManufacturingProductsPage;
