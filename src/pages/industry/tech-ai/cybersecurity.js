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

const CybersecurityPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "cybersecurity" in categories[]->slug.current ||
        lower(categories[0]->title) match "*cyber*" ||
        lower(categories[0]->title) match "*security*" ||
        lower(title) match "*cyber*" ||
        lower(title) match "*security*" ||
        lower(description) match "*cyber*" ||
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
    queryKey: ["industry", "tech-ai", "cybersecurity", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Cybersecurity Basics: The 2025 Starter Guide",
        slug: "cybersecurity-basics-2025-starter-guide",
        description:
          "Understand the most common threats, best practices, and tools every business needs.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Phishing Attacks: How to Detect & Prevent",
        slug: "phishing-attacks-detect-prevent",
        description:
          "Practical steps to reduce phishing risk across email, SMS, and social platforms.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Ransomware: A Playbook for Fast Response",
        slug: "ransomware-fast-response-playbook",
        description:
          "What to do in the first hour, first day, and first week after a ransomware incident.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Zero Trust Security Explained",
        slug: "zero-trust-security-explained",
        description:
          "A simple framework for identity, device, network, and application controls.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Passwordless Authentication: Is It Ready?",
        slug: "passwordless-authentication-is-it-ready",
        description:
          "Passkeys, MFA, and why passwords are failing modern organizations.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "AI in Cybersecurity: Threats & Defenses",
        slug: "ai-in-cybersecurity-threats-defenses",
        description:
          "How attackers use AI and how defenders can use it to detect anomalies faster.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "Secure Your Cloud: Top Misconfigurations",
        slug: "secure-your-cloud-top-misconfigurations",
        description:
          "The most common cloud mistakes and how to fix them before attackers exploit them.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Data Privacy & Compliance: What Businesses Must Know",
        slug: "data-privacy-compliance-businesses-must-know",
        description:
          "A practical overview of privacy requirements and how to build compliant workflows.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Endpoint Security: Protecting Remote Teams",
        slug: "endpoint-security-protecting-remote-teams",
        description:
          "Device hardening, patching, and monitoring strategies for distributed workforces.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Incident Response Checklist",
        slug: "incident-response-checklist",
        description:
          "A clear checklist for preparation, detection, containment, recovery, and lessons learned.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Social Engineering: The Human Layer of Security",
        slug: "social-engineering-human-layer-security",
        description:
          "Why humans are targeted and how training + process stops the majority of breaches.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Security for Startups: Minimum Viable Security",
        slug: "security-for-startups-minimum-viable-security",
        description:
          "A lean security setup for founders: identity, backups, logging, and access controls.",
        imageUrl: ImgAdvertise?.src,
      },
    ],
    []
  );

  const posts = useMemo(() => {
    const primary = Array.isArray(sanityPosts) ? sanityPosts : [];
    const seen = new Set(
      primary
        .map((p) => p?.slug?.current || p?.slug)
        .filter(Boolean)
    );

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

  const fallbackSlugSet = useMemo(
    () => new Set(fallbackPosts.map((p) => p?.slug?.current || p?.slug).filter(Boolean)),
    [fallbackPosts]
  );

  const handleCardClick = (post) => {
    const slug = post?.slug?.current || post?.slug || "";
    if (!slug) return;

    const isFallback =
      fallbackSlugSet.has(slug) &&
      !(sanityPosts || []).some((p) => (p?.slug?.current || p?.slug) === slug);

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
        metaTitle="Cybersecurity | Tech/AI | The Unicorn Time"
        metaDesc="Cybersecurity insights, guides, and practical security playbooks for founders and modern teams."
      />

      <HeaderOne />

      <section className="cs-hero">
        <div className="cs-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="cs-hero-title">Cybersecurity</h1>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="cs-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="cs-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="cs-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="cs-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="cs-card-image-fallback">SEC</div>
                      )}
                    </div>

                    <div className="cs-card-content">
                      <h3 className="cs-card-title">{title}</h3>
                      {desc ? <p className="cs-card-desc">{desc}</p> : null}
                      <div className="cs-card-footer">
                        <span className="cs-read">Read More</span>
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
        .cs-hero,
        .cs-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .cs-hero {
          padding: 24px 0 18px;
        }

        .cs-hero-inner {
          text-align: center;
        }

        .cs-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .cs-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .cs-section {
          padding: 10px 0 50px;
        }

        .cs-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .cs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .cs-grid {
            grid-template-columns: 1fr;
          }
        }

        .cs-card {
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

        .cs-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .cs-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .cs-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .cs-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cs-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cs-card-image-fallback {
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

        .cs-card-content {
          padding: 4px 14px 12px;
        }

        .cs-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .cs-card-desc {
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

        .cs-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cs-read {
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

        .cs-read:hover,
        .cs-card:hover .cs-read {
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

export default CybersecurityPage;
