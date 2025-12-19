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

const HealthcarePage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "healthcare" in categories[]->slug.current ||
        lower(categories[0]->title) match "*health*" ||
        lower(title) match "*health*" ||
        lower(title) match "*hospital*" ||
        lower(description) match "*health*" ||
        lower(description) match "*hospital*"
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
    queryKey: ["industry", "healthcare", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Healthcare in 2025: Key Trends",
        slug: "healthcare-2025-key-trends",
        description: "Digital health, AI workflows, and patient-first experiences.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Telemedicine: What Works and Why",
        slug: "telemedicine-what-works-and-why",
        description: "How to design a reliable remote care experience.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Healthcare Operations: Reducing Admin Burden",
        slug: "healthcare-operations-reducing-admin-burden",
        description: "Automation and systems to reduce paperwork and waiting time.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Patient Data Privacy Basics",
        slug: "patient-data-privacy-basics",
        description: "Security, compliance, and safe data handling in healthcare.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "AI for Clinical Documentation",
        slug: "ai-for-clinical-documentation",
        description: "How AI helps with notes, coding, and documentation quality.",
        imageUrl: ImgWit?.src,
      },
      {
        title: "Hospital Workflow Optimization",
        slug: "hospital-workflow-optimization",
        description: "Improve triage, scheduling, and patient flow.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Healthcare Cybersecurity Essentials",
        slug: "healthcare-cybersecurity-essentials",
        description: "Protect patient systems from phishing, ransomware, and outages.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Medical Devices & Security",
        slug: "medical-devices-and-security",
        description: "Risks, updates, and safe deployment of connected devices.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Patient Experience: What Improves Outcomes",
        slug: "patient-experience-improves-outcomes",
        description: "Communication, simplicity, and trust build better care.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "HealthTech Startups: Building Responsibly",
        slug: "healthtech-startups-building-responsibly",
        description: "Compliance, product design, and operations without slowing down.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Mental Health: Digital Support Models",
        slug: "mental-health-digital-support-models",
        description: "Apps, coaching, and hybrid care approaches.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Healthcare Strategy for Founders",
        slug: "healthcare-strategy-for-founders",
        description: "How to validate demand and build a sustainable product.",
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
        metaTitle="Healthcare | Industries | The Unicorn Time"
        metaDesc="Healthcare insights: digital health, operations, privacy, and patient experience guides."
      />

      <HeaderOne />

      <section className="hc-hero">
        <div className="hc-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="hc-hero-title">Healthcare</h1>
        </div>
      </section>

      <section className="hc-section">
        <div className="hc-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="hc-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="hc-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="hc-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="hc-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="hc-card-image-fallback">HC</div>
                      )}
                    </div>

                    <div className="hc-card-content">
                      <h3 className="hc-card-title">{title}</h3>
                      {desc ? <p className="hc-card-desc">{desc}</p> : null}
                      <div className="hc-card-footer">
                        <span className="hc-read">Read More</span>
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
        .hc-hero,
        .hc-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .hc-hero {
          padding: 24px 0 18px;
        }

        .hc-hero-inner {
          text-align: center;
        }

        .hc-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .hc-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .hc-section {
          padding: 10px 0 50px;
        }

        .hc-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .hc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .hc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .hc-grid {
            grid-template-columns: 1fr;
          }
        }

        .hc-card {
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

        .hc-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .hc-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .hc-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .hc-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hc-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hc-card-image-fallback {
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

        .hc-card-content {
          padding: 4px 14px 12px;
        }

        .hc-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .hc-card-desc {
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

        .hc-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hc-read {
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

export default HealthcarePage;
