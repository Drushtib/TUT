import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import HeadMeta from "../../components/elements/HeadMeta";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import { client } from "../../client";

import ImgAbstract from "../../assest/stacks-coins-arranged-bar-graph.jpg";
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

const FinancePage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "finance" in categories[]->slug.current ||
        lower(categories[0]->title) match "*finance*" ||
        lower(title) match "*finance*" ||
        lower(title) match "*investment*" ||
        lower(title) match "*market*" ||
        lower(description) match "*finance*" ||
        lower(description) match "*investment*" ||
        lower(description) match "*market*"
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
    queryKey: ["industry", "finance", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Personal Finance: A Practical Starter Guide",
        slug: "personal-finance-practical-starter-guide",
        description: "Budgeting, saving, and debt—simple rules that work.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Investing 101: Building Long-Term Wealth",
        slug: "investing-101-building-long-term-wealth",
        description: "Risk, diversification, and how to think like an investor.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Stock Market Basics for Beginners",
        slug: "stock-market-basics-for-beginners",
        description: "How markets work, common terms, and smart first steps.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Startup Finance: Burn Rate & Runway",
        slug: "startup-finance-burn-rate-runway",
        description: "Plan cash flow, runway, and fundraising timing.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Smart Tax Planning (Basics)",
        slug: "smart-tax-planning-basics",
        description: "Simple tax habits that help you keep more of what you earn.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Financial Discipline: Habits That Scale",
        slug: "financial-discipline-habits-that-scale",
        description: "Systems for saving, spending, and investing consistently.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Understanding Inflation & Interest Rates",
        slug: "understanding-inflation-interest-rates",
        description: "Why prices change and how rate cycles impact your money.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Business Finance: Reading Financial Statements",
        slug: "business-finance-reading-financial-statements",
        description: "Balance sheet, P&L, cash flow—what matters most.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Risk Management for Investors",
        slug: "risk-management-for-investors",
        description: "How to manage downside and avoid emotional decisions.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "AI in Finance: Fraud & Forecasting",
        slug: "ai-in-finance-fraud-forecasting",
        description: "How AI improves detection, forecasting, and finance operations.",
        imageUrl: ImgWit?.src,
      },
      {
        title: "Wealth Building: Common Mistakes",
        slug: "wealth-building-common-mistakes",
        description: "Avoid the most common money traps and bad assumptions.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Financial Planning for Entrepreneurs",
        slug: "financial-planning-for-entrepreneurs",
        description: "Run a tighter ship with forecasting and operational discipline.",
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
        metaTitle="Finance | Industries | The Unicorn Time"
        metaDesc="Finance insights: investing basics, startup finance, markets, and practical money habits."
      />

      <HeaderOne />

      <section className="fin-hero">
        <div className="fin-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="fin-hero-title">Finance</h1>
        </div>
      </section>

      <section className="fin-section">
        <div className="fin-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="fin-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="fin-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="fin-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="fin-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="fin-card-image-fallback">FIN</div>
                      )}
                    </div>

                    <div className="fin-card-content">
                      <h3 className="fin-card-title">{title}</h3>
                      {desc ? <p className="fin-card-desc">{desc}</p> : null}
                      <div className="fin-card-footer">
                        <span className="fin-read">Read More</span>
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
        .fin-hero,
        .fin-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .fin-hero {
          padding: 24px 0 18px;
        }

        .fin-hero-inner {
          text-align: center;
        }

        .fin-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .fin-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .fin-section {
          padding: 10px 0 50px;
        }

        .fin-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .fin-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .fin-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .fin-grid {
            grid-template-columns: 1fr;
          }
        }

        .fin-card {
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

        .fin-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .fin-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .fin-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .fin-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .fin-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fin-card-image-fallback {
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

        .fin-card-content {
          padding: 4px 14px 12px;
        }

        .fin-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .fin-card-desc {
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

        .fin-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .fin-read {
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

export default FinancePage;
