import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../../components/header/HeaderOne";
import FooterTwo from "../../../components/footer/FooterTwo";
import HeadMeta from "../../../components/elements/HeadMeta";
import Loader from "../../../components/common/Loader";
import ErrorFallback from "../../../components/common/ErrorFallback";
import { client } from "../../../client";

import ImgAbstract from "../../../assest/abstract.jpg";
import ImgBg from "../../../assest/bg.jpg";
import ImgAbout from "../../../assest/about us img.avif";
import ImgAdvertise from "../../../assest/advertise.avif";
import ImgMediakit1 from "../../../assest/mediakit1.jpg";
import ImgMediakit2 from "../../../assest/mediakit2.jpg";
import ImgMediakit3 from "../../../assest/mediakit3.jpg";
import ImgMediakit4 from "../../../assest/mediakit4.jpg";
import ImgMediakit5 from "../../../assest/mediakit5.jpg";
import ImgMediakit6 from "../../../assest/mediakit6.jpg";
import ImgMediakit7 from "../../../assest/mediakit7.jpg";

const EcommercePage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "e-commerce" in categories[]->slug.current ||
        "ecommerce" in categories[]->slug.current ||
        lower(categories[0]->title) match "*e-commerce*" ||
        lower(categories[0]->title) match "*ecommerce*" ||
        lower(title) match "*e-commerce*" ||
        lower(title) match "*ecommerce*" ||
        lower(description) match "*e-commerce*" ||
        lower(description) match "*ecommerce*"
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
    queryKey: ["industry", "tech-ai", "e-commerce", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "E-commerce Trends for 2025",
        slug: "ecommerce-trends-2025",
        description: "What’s next in online retail: personalization, AI, and faster fulfillment.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "How to Increase Conversion Rate",
        slug: "increase-conversion-rate",
        description: "Practical CRO steps: speed, UX, trust, and smart product pages.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Product Page Copy That Sells",
        slug: "product-page-copy-that-sells",
        description: "Structure, benefits, and persuasion techniques for product descriptions.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Checkout Optimization Guide",
        slug: "checkout-optimization-guide",
        description: "Reduce cart abandonment with fewer steps, clear shipping, and better payments.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Email Marketing for E-commerce",
        slug: "email-marketing-for-ecommerce",
        description: "Welcome flows, abandon cart, post-purchase, and segmentation that drives revenue.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Retention: Build Repeat Buyers",
        slug: "retention-build-repeat-buyers",
        description: "Loyalty loops, subscriptions, and CX that keeps customers coming back.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "E-commerce SEO Basics",
        slug: "ecommerce-seo-basics",
        description: "Category pages, product schema, and content strategy for organic growth.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Paid Ads: Winning Creative Frameworks",
        slug: "paid-ads-winning-creative-frameworks",
        description: "Test angles, hooks, and UGC formats for Meta/Google performance.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Inventory & Demand Forecasting",
        slug: "inventory-demand-forecasting",
        description: "Avoid stockouts and dead stock with better forecasting and planning.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Shipping Strategy That Improves Profit",
        slug: "shipping-strategy-improves-profit",
        description: "Rates, thresholds, and delivery promises that protect margin.",
        imageUrl: ImgAdvertise?.src,
      },
      {
        title: "Customer Support for Online Stores",
        slug: "customer-support-for-online-stores",
        description: "Templates, chat, and automation to handle tickets faster.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "AI Personalization in E-commerce",
        slug: "ai-personalization-in-ecommerce",
        description: "Recommendations, search, and dynamic merchandising to lift AOV and conversion.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
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
    () => new Set((Array.isArray(sanityPosts) ? sanityPosts : []).map((p) => p?.slug?.current || p?.slug).filter(Boolean)),
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
        metaTitle="E-commerce | Tech/AI | The Unicorn Time"
        metaDesc="E-commerce playbooks and growth strategies: conversion, retention, SEO, ads, and operations."
      />

      <HeaderOne />

      <section className="ec-hero">
        <div className="ec-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="ec-hero-title">E-commerce</h1>
        </div>
      </section>

      <section className="ec-section">
        <div className="ec-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="ec-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="ec-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="ec-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="ec-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="ec-card-image-fallback">EC</div>
                      )}
                    </div>

                    <div className="ec-card-content">
                      <h3 className="ec-card-title">{title}</h3>
                      {desc ? <p className="ec-card-desc">{desc}</p> : null}
                      <div className="ec-card-footer">
                        <span className="ec-read">Read More</span>
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
        .ec-hero,
        .ec-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .ec-hero {
          padding: 24px 0 18px;
        }

        .ec-hero-inner {
          text-align: center;
        }

        .ec-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .ec-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .ec-section {
          padding: 10px 0 50px;
        }

        .ec-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .ec-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .ec-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .ec-grid {
            grid-template-columns: 1fr;
          }
        }

        .ec-card {
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

        .ec-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .ec-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .ec-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .ec-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ec-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ec-card-image-fallback {
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

        .ec-card-content {
          padding: 4px 14px 12px;
        }

        .ec-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .ec-card-desc {
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

        .ec-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ec-read {
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

        .ec-read:hover,
        .ec-card:hover .ec-read {
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

export default EcommercePage;
