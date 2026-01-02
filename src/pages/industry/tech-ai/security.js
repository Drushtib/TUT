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

const SecurityPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "security" in categories[]->slug.current ||
        lower(categories[0]->title) match "*security*" ||
        lower(title) match "*security*" ||
        lower(description) match "*security*"
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
    queryKey: ["industry", "tech-ai", "security", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Application Security Essentials",
        slug: "application-security-essentials",
        description: "Secure coding basics: validation, auth, secrets, and safe dependencies.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Security for Startups: Minimum Setup",
        slug: "security-for-startups-minimum-setup",
        description: "Identity, backups, logging, and access controls—done the right way.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Secure API Design",
        slug: "secure-api-design",
        description: "Rate limits, tokens, validation, and monitoring for robust APIs.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "MFA and Account Protection",
        slug: "mfa-and-account-protection",
        description: "Protect accounts with MFA, passkeys, and step-up authentication.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Security Logging That Actually Helps",
        slug: "security-logging-that-actually-helps",
        description: "What to log, how to alert, and how to respond.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Data Security: Encryption Basics",
        slug: "data-security-encryption-basics",
        description: "Encryption at rest, in transit, and key management fundamentals.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Secure Cloud Configuration",
        slug: "secure-cloud-configuration",
        description: "Avoid the biggest cloud mistakes: buckets, roles, network exposure.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Secure Your Team Devices",
        slug: "secure-your-team-devices",
        description: "Patch management, endpoint protection, and remote work policies.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Incident Response Checklist",
        slug: "incident-response-checklist-security",
        description: "Preparation, detection, containment, recovery, and lessons learned.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Prevent Social Engineering",
        slug: "prevent-social-engineering",
        description: "Train teams and build processes that reduce human-risk attacks.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "AI Safety & Security Basics",
        slug: "ai-safety-security-basics",
        description: "Protect data and prevent leakage when using AI tools.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "Privacy & Compliance 101",
        slug: "privacy-compliance-101",
        description: "How to stay compliant while building fast.",
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
        metaTitle="Security | Tech/AI | The Unicorn Time"
        metaDesc="Security best practices and practical guides for teams, products, and data protection."
      />

      <HeaderOne />

      <section className="sec-hero">
        <div className="sec-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="sec-hero-title">Security</h1>
        </div>
      </section>

      <section className="sec-section">
        <div className="sec-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="sec-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="sec-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="sec-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="sec-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="sec-card-image-fallback">SEC</div>
                      )}
                    </div>

                    <div className="sec-card-content">
                      <h3 className="sec-card-title">{title}</h3>
                      {desc ? <p className="sec-card-desc">{desc}</p> : null}
                      <div className="sec-card-footer">
                        <span className="sec-read">Read More</span>
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
        .sec-hero,
        .sec-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .sec-hero {
          padding: 24px 0 18px;
        }

        .sec-hero-inner {
          text-align: center;
        }

        .sec-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .sec-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .sec-section {
          padding: 10px 0 50px;
        }

        .sec-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .sec-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .sec-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .sec-grid {
            grid-template-columns: 1fr;
          }
        }

        .sec-card {
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

        .sec-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .sec-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .sec-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .sec-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .sec-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .sec-card-image-fallback {
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

        .sec-card-content {
          padding: 4px 14px 12px;
        }

        .sec-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .sec-card-desc {
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

        .sec-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sec-read {
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

        .sec-read:hover,
        .sec-card:hover .sec-read {
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

export default SecurityPage;
