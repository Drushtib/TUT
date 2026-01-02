import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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

const AiIndustryPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "ai" in categories[]->slug.current ||
        lower(categories[0]->title) match "*ai*" ||
        lower(title) match "*ai*" ||
        lower(description) match "*ai*"
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

  const {
    data: sanityPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["industry", "tech-ai", "ai", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "AI in 2025: The Real Business Playbook",
        slug: "ai-in-2025-business-playbook",
        description:
          "A practical guide to using AI to cut costs, increase speed, and build defensible advantages.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Generative AI for Marketing Teams",
        slug: "generative-ai-for-marketing-teams",
        description:
          "From copy drafts to creative variations—how to deploy gen-AI without harming your brand.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "AI Agents: From Demo to Deployment",
        slug: "ai-agents-demo-to-deployment",
        description:
          "A roadmap to build reliable agent workflows: tools, guardrails, evaluation, and ROI.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "AI + Cybersecurity: What Changes Now",
        slug: "ai-cybersecurity-what-changes-now",
        description:
          "How attackers use AI and what modern orgs should do to defend and respond.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "AI in Healthcare Operations",
        slug: "ai-in-healthcare-operations",
        description:
          "Reducing admin overhead with automation, triage, and intelligent document processing.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "AI for Founders: The MVP Shortcut",
        slug: "ai-for-founders-mvp-shortcut",
        description:
          "Where AI can replace weeks of work—and where it still can’t—when launching fast.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Responsible AI: Policies That Don’t Kill Speed",
        slug: "responsible-ai-policies-that-dont-kill-speed",
        description:
          "Simple governance templates for startups and media teams using AI in production.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Prompting Like a Pro: Patterns That Work",
        slug: "prompting-like-a-pro-patterns-that-work",
        description:
          "Reusable prompt structures for summarization, extraction, classification, and ideation.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "AI + E-commerce: Smart Personalization",
        slug: "ai-ecommerce-smart-personalization",
        description:
          "Recommendation systems, search, and merchandising automation that improves conversion.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "AI in Legal: Contract Review at Scale",
        slug: "ai-in-legal-contract-review-at-scale",
        description:
          "How teams use AI to accelerate redlines, clause extraction, and compliance checks.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "AI Design Systems: Faster Content Production",
        slug: "ai-design-systems-faster-content-production",
        description:
          "Create consistent visuals and editorial pipelines using templates and AI tooling.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "AI Strategy: Choosing the Right Model",
        slug: "ai-strategy-choosing-the-right-model",
        description:
          "A decision framework for GPT vs open models vs fine-tuning vs retrieval.",
        imageUrl: ImgAdvertise?.src,
      },
    ],
    []
  );

  const posts = (sanityPosts && sanityPosts.length > 0 ? sanityPosts : fallbackPosts).slice(
    0,
    12
  );

  const fallbackSlugSet = useMemo(
    () => new Set(fallbackPosts.map((p) => p?.slug?.current || p?.slug).filter(Boolean)),
    [fallbackPosts]
  );

  const handleCardClick = (post) => {
    const slug = post?.slug?.current || post?.slug || "";
    if (!slug) return;

    const isFallback = fallbackSlugSet.has(slug) && !(sanityPosts || []).some((p) => (p?.slug?.current || p?.slug) === slug);
    if (isFallback) {
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
        metaTitle="AI | Tech/AI | The Unicorn Time"
        metaDesc="Explore AI insights, trends, and practical guides—curated AI blogs from The Unicorn Time."
      />

      <HeaderOne />

      <section className="ai-hero">
        <div
          className="ai-hero-inner"
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <h1 className="ai-hero-title">Artificial Intelligence (AI)</h1>
        </div>
      </section>

      <section className="ai-section">
        <div
          className="ai-container"
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          {isLoading ? (
            <div className="ai-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <>
              <div className="ai-grid">
                {posts.map((post, idx) => {
                  const slug = post?.slug?.current || post?.slug || "";
                  const title = post?.title || "Untitled";
                  const desc = post?.description || "";
                  const img = post?.imageUrl || post?.featureImg || "";

                  return (
                    <article
                      key={`${slug || idx}`}
                      className="ai-card"
                      onClick={() => handleCardClick(post)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCardClick(post);
                      }}
                    >
                      <div className="ai-card-image">
                        {img ? (
                          <img src={img} alt={post?.altText || title} loading="lazy" />
                        ) : (
                          <div className="ai-card-image-fallback">AI</div>
                        )}
                      </div>

                      <div className="ai-card-content">
                        <div className="ai-card-meta">
                          {post?.category?.title ? (
                            <span className="ai-chip ai-chip-muted">{post.category.title}</span>
                          ) : null}
                        </div>

                        <h3 className="ai-card-title">{title}</h3>

                        {desc ? <p className="ai-card-desc">{desc}</p> : null}

                        <div className="ai-card-footer">
                          <span className="ai-read">Read More</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .ai-hero,
        .ai-section {
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .ai-hero {
          background: white;
          padding: 24px 0 18px;
        }

        .ai-hero-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px;
          text-align: center;
        }

        .ai-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .ai-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .ai-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 16px;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.2px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .ai-btn-primary {
          background: var(--primary-color);
          color: #0b0b0b !important;
          -webkit-text-fill-color: #0b0b0b !important;
          border-color: var(--primary-color);
        }

        .ai-btn-ghost {
          background: transparent;
          color: rgba(0, 0, 0, 0.82) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.82) !important;
        }

        .ai-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(187, 5, 5, 0.35);
        }

        .ai-section {
          background: #ffffff;
          padding: 10px 0 50px;
        }

        .ai-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px;
        }

        @media (max-width: 560px) {
          .ai-hero-inner,
          .ai-container {
            padding: 0 20px;
          }
        }

        .ai-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .ai-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .ai-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .ai-grid {
            grid-template-columns: 1fr;
          }
        }

        .ai-card {
          border: 1px solid rgba(0, 0, 0, 0.10);
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          outline: none;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .ai-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .ai-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .ai-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .ai-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ai-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ai-card-image-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: 1px;
          color: rgba(0, 0, 0, 0.7);
          background: radial-gradient(600px 200px at 20% 10%, rgba(187, 5, 5, 0.20), transparent 60%),
            rgba(0, 0, 0, 0.03);
        }

        .ai-card-content {
          padding: 4px 14px 12px;
        }

        .ai-card-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 4px;
          min-height: 16px;
        }

        .ai-chip {
          display: inline-flex;
          align-items: center;
          height: 22px;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2px;
          color: #0b0b0b !important;
          -webkit-text-fill-color: #0b0b0b !important;
          background: var(--primary-color);
          border-radius: 999px;
        }

        .ai-chip-muted {
          background: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.75) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.75) !important;
          border: 1px solid rgba(0, 0, 0, 0.10);
          border-radius: 999px;
        }

        .ai-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .ai-card-desc {
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

        .ai-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ai-read {
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

        .ai-read:hover,
        .ai-card:hover .ai-read {
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

export default AiIndustryPage;
