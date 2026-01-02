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

const LegalPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "legal" in categories[]->slug.current ||
        lower(categories[0]->title) match "*legal*" ||
        lower(title) match "*legal*" ||
        lower(title) match "*contract*" ||
        lower(title) match "*compliance*" ||
        lower(description) match "*legal*" ||
        lower(description) match "*contract*" ||
        lower(description) match "*compliance*"
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
    queryKey: ["industry", "legal", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Contracts 101: The Clauses That Matter",
        slug: "contracts-101-clauses-that-matter",
        description: "Understand scope, payment, liability, and termination.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Compliance Basics for Startups",
        slug: "compliance-basics-for-startups",
        description: "A practical checklist for early-stage teams.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Legal Risk: How to Reduce It",
        slug: "legal-risk-how-to-reduce-it",
        description: "The key habits that prevent disputes and surprises.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Privacy Policies: What to Include",
        slug: "privacy-policies-what-to-include",
        description: "Simple guidance for privacy disclosures and user trust.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Terms of Service: A Practical Guide",
        slug: "terms-of-service-practical-guide",
        description: "Protect your product with clear rules and limitations.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "IP Basics: Trademarks & Copyright",
        slug: "ip-basics-trademarks-copyright",
        description: "What founders should know to protect brand and content.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Startup Legal: Fundraising Documents",
        slug: "startup-legal-fundraising-documents",
        description: "Term sheets, SAFEs, and the basics of cap tables.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "AI in Legal: Contract Review at Scale",
        slug: "ai-in-legal-contract-review-at-scale",
        description: "How teams use AI to accelerate redlines and clause extraction.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "Employment Basics: Hiring & Policies",
        slug: "employment-basics-hiring-policies",
        description: "Offer letters, policies, and clear role agreements.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Vendor Agreements: What to Watch",
        slug: "vendor-agreements-what-to-watch",
        description: "Security, SLAs, and liability in vendor contracts.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Dispute Avoidance: Communication Rules",
        slug: "dispute-avoidance-communication-rules",
        description: "Simple processes that prevent misunderstandings.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Legal Operations: Stay Organized",
        slug: "legal-operations-stay-organized",
        description: "Templates, storage, and review workflows for teams.",
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
        metaTitle="Legal | Industries | The Unicorn Time"
        metaDesc="Legal insights: contracts, compliance, privacy, and practical legal operations for teams."
      />

      <HeaderOne />

      <section className="lg-hero">
        <div className="lg-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="lg-hero-title">Legal</h1>
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="lg-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="lg-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="lg-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="lg-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="lg-card-image-fallback">LG</div>
                      )}
                    </div>

                    <div className="lg-card-content">
                      <h3 className="lg-card-title">{title}</h3>
                      {desc ? <p className="lg-card-desc">{desc}</p> : null}
                      <div className="lg-card-footer">
                        <span className="lg-read">Read More</span>
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
        .lg-hero,
        .lg-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .lg-hero {
          padding: 24px 0 18px;
        }

        .lg-hero-inner {
          text-align: center;
        }

        .lg-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .lg-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .lg-section {
          padding: 10px 0 50px;
        }

        .lg-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .lg-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .lg-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .lg-grid {
            grid-template-columns: 1fr;
          }
        }

        .lg-card {
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

        .lg-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .lg-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .lg-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .lg-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .lg-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lg-card-image-fallback {
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

        .lg-card-content {
          padding: 4px 14px 12px;
        }

        .lg-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .lg-card-desc {
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

        .lg-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lg-read {
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

        .lg-read:hover,
        .lg-card:hover .lg-read {
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

export default LegalPage;
