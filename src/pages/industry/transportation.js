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
import ImgAbout from "../../assest/about us img.avif";
import ImgAdvertise from "../../assest/advertise.avif";
import ImgMediakit1 from "../../assest/mediakit1.jpg";
import ImgMediakit2 from "../../assest/mediakit2.jpg";
import ImgMediakit3 from "../../assest/mediakit3.jpg";
import ImgMediakit4 from "../../assest/mediakit4.jpg";
import ImgMediakit5 from "../../assest/mediakit5.jpg";
import ImgMediakit6 from "../../assest/mediakit6.jpg";
import ImgMediakit7 from "../../assest/mediakit7.jpg";

const TransportationPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "transportation" in categories[]->slug.current ||
        lower(categories[0]->title) match "*transport*" ||
        lower(categories[0]->title) match "*logistics*" ||
        lower(title) match "*transport*" ||
        lower(title) match "*logistics*" ||
        lower(title) match "*supply chain*" ||
        lower(description) match "*transport*" ||
        lower(description) match "*logistics*" ||
        lower(description) match "*supply chain*"
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
    queryKey: ["industry", "transportation", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Transportation Trends for 2025",
        slug: "transportation-trends-for-2025",
        description: "EVs, fleet software, and smarter logistics operations.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Logistics Basics: A Practical Guide",
        slug: "logistics-basics-practical-guide",
        description: "Core concepts that make shipping faster and cheaper.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Fleet Management: Reduce Costs",
        slug: "fleet-management-reduce-costs",
        description: "Maintenance, routing, and operations that improve margins.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Last-Mile Delivery: What Works",
        slug: "last-mile-delivery-what-works",
        description: "Speed, accuracy, and customer experience in delivery.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Routing Optimization 101",
        slug: "routing-optimization-101",
        description: "Use data to optimize routes and delivery windows.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Warehouse Operations for Faster Fulfillment",
        slug: "warehouse-operations-faster-fulfillment",
        description: "Layout, picking workflows, and automation.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Supply Chain Risk Management",
        slug: "supply-chain-risk-management",
        description: "Plan for disruption with better suppliers and forecasting.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Cold Chain Logistics Explained",
        slug: "cold-chain-logistics-explained",
        description: "How temperature-sensitive shipping works and what to monitor.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "EV Fleets: Planning the Transition",
        slug: "ev-fleets-planning-transition",
        description: "Charging, routing, and cost models for electric fleets.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "AI in Logistics: Forecasting & Visibility",
        slug: "ai-in-logistics-forecasting-visibility",
        description: "Use AI for demand, tracking, and better ETAs.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "Transportation Compliance Basics",
        slug: "transportation-compliance-basics",
        description: "Safety, documentation, and operational compliance.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Customer Experience in Delivery",
        slug: "customer-experience-in-delivery",
        description: "Tracking updates and reliability that builds trust.",
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
        metaTitle="Transportation | Industries | The Unicorn Time"
        metaDesc="Transportation insights: logistics, fleets, last-mile delivery, and supply chain operations."
      />

      <HeaderOne />

      <section className="tr-hero">
        <div className="tr-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="tr-hero-title">Transportation</h1>
        </div>
      </section>

      <section className="tr-section">
        <div className="tr-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="tr-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="tr-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="tr-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="tr-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="tr-card-image-fallback">TR</div>
                      )}
                    </div>

                    <div className="tr-card-content">
                      <h3 className="tr-card-title">{title}</h3>
                      {desc ? <p className="tr-card-desc">{desc}</p> : null}
                      <div className="tr-card-footer">
                        <span className="tr-read">Read More</span>
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
        .tr-hero,
        .tr-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .tr-hero {
          padding: 24px 0 18px;
        }

        .tr-hero-inner {
          text-align: center;
        }

        .tr-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .tr-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .tr-section {
          padding: 10px 0 50px;
        }

        .tr-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .tr-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .tr-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .tr-grid {
            grid-template-columns: 1fr;
          }
        }

        .tr-card {
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

        .tr-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .tr-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .tr-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .tr-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .tr-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .tr-card-image-fallback {
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

        .tr-card-content {
          padding: 4px 14px 12px;
        }

        .tr-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .tr-card-desc {
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

        .tr-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tr-read {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.55rem 0.9rem;
          border-radius: 12px;
          background: #ffffff !important;
          border: 1px solid #000000 !important;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.3px;
          font-size: 12px;
          text-transform: uppercase;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
          cursor: pointer;
        }

        .tr-read:hover,
        .tr-card:hover .tr-read {
          transform: translateY(-1px);
          background: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 16px 34px rgba(187, 5, 5, 0.22);
        }
      `}</style>
    </>
  );
};

export default TransportationPage;
