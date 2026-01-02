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

const RoboticsPage = () => {
  const query = useMemo(
    () => `
      *[_type == "post" && (
        "robotics" in categories[]->slug.current ||
        lower(categories[0]->title) match "*robot*" ||
        lower(title) match "*robot*" ||
        lower(description) match "*robot*"
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
    queryKey: ["industry", "tech-ai", "robotics", "posts"],
    queryFn: async () => await client.fetch(query),
  });

  const fallbackPosts = useMemo(
    () => [
      {
        title: "Robotics in 2025: What’s Changing",
        slug: "robotics-in-2025-whats-changing",
        description: "Key trends in automation, sensors, and robotics adoption across industries.",
        imageUrl: ImgMediakit1?.src,
      },
      {
        title: "Industrial Robots: Smarter Factories",
        slug: "industrial-robots-smarter-factories",
        description: "How modern robots improve productivity and quality in manufacturing.",
        imageUrl: ImgMediakit2?.src,
      },
      {
        title: "Warehouse Automation: Picking & Packing",
        slug: "warehouse-automation-picking-packing",
        description: "Robots, conveyor systems, and software that speeds up fulfillment.",
        imageUrl: ImgMediakit3?.src,
      },
      {
        title: "Robotics + AI: The Power Combo",
        slug: "robotics-plus-ai-power-combo",
        description: "Why vision, planning, and learning makes robots more useful.",
        imageUrl: "/images/34378620_v915-wit-002-k.jpg",
      },
      {
        title: "Service Robots: Retail & Hospitality",
        slug: "service-robots-retail-hospitality",
        description: "From cleaning to assistance—service robots are expanding fast.",
        imageUrl: ImgMediakit4?.src,
      },
      {
        title: "Healthcare Robotics: Assistive Tech",
        slug: "healthcare-robotics-assistive-tech",
        description: "Robots that support surgery, rehabilitation, and patient care.",
        imageUrl: ImgMediakit5?.src,
      },
      {
        title: "Robotics Safety: Best Practices",
        slug: "robotics-safety-best-practices",
        description: "Safety rules and deployment checklists for automation projects.",
        imageUrl: ImgMediakit6?.src,
      },
      {
        title: "Computer Vision for Robots",
        slug: "computer-vision-for-robots",
        description: "How robots see, detect objects, and navigate real environments.",
        imageUrl: ImgAbstract?.src,
      },
      {
        title: "Autonomous Mobile Robots (AMRs)",
        slug: "autonomous-mobile-robots-amrs",
        description: "AMRs for moving inventory and materials in warehouses and plants.",
        imageUrl: ImgBg?.src,
      },
      {
        title: "Robotics Startups to Watch",
        slug: "robotics-startups-to-watch",
        description: "High-potential teams building new hardware and robotics platforms.",
        imageUrl: ImgMediakit7?.src,
      },
      {
        title: "Robotics for Small Business",
        slug: "robotics-for-small-business",
        description: "How smaller teams can adopt automation without huge budgets.",
        imageUrl: ImgAbout?.src,
      },
      {
        title: "Robotics Roadmap: From Idea to Deployment",
        slug: "robotics-roadmap-idea-to-deployment",
        description: "A simple plan to evaluate ROI, pilot, and scale robotics projects.",
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
        metaTitle="Robotics | Tech/AI | The Unicorn Time"
        metaDesc="Robotics insights: automation trends, AMRs, industrial robots, and practical deployment guides."
      />

      <HeaderOne />

      <section className="rb-hero">
        <div className="rb-hero-inner" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <h1 className="rb-hero-title">Robotics</h1>
        </div>
      </section>

      <section className="rb-section">
        <div className="rb-container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          {isLoading ? (
            <div className="rb-loading">
              <Loader />
            </div>
          ) : error ? (
            <ErrorFallback error={error} />
          ) : (
            <div className="rb-grid">
              {posts.map((post, idx) => {
                const slug = post?.slug?.current || post?.slug || "";
                const title = post?.title || "Untitled";
                const desc = post?.description || "";
                const img = post?.imageUrl || post?.featureImg || "";

                return (
                  <article
                    key={`${slug || idx}`}
                    className="rb-card"
                    onClick={() => handleCardClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCardClick(post);
                    }}
                  >
                    <div className="rb-card-image">
                      {img ? (
                        <img src={img} alt={post?.altText || title} loading="lazy" />
                      ) : (
                        <div className="rb-card-image-fallback">RB</div>
                      )}
                    </div>

                    <div className="rb-card-content">
                      <h3 className="rb-card-title">{title}</h3>
                      {desc ? <p className="rb-card-desc">{desc}</p> : null}
                      <div className="rb-card-footer">
                        <span className="rb-read">Read More</span>
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
        .rb-hero,
        .rb-section {
          background: #ffffff;
          color: #111 !important;
          -webkit-text-fill-color: #111 !important;
        }

        .rb-hero {
          padding: 24px 0 18px;
        }

        .rb-hero-inner {
          text-align: center;
        }

        .rb-hero-title {
          margin: 0 0 8px;
          font-size: clamp(22px, 4vw, 36px);
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-weight: 900;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .rb-hero-title::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .rb-section {
          padding: 10px 0 50px;
        }

        .rb-loading {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .rb-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .rb-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .rb-grid {
            grid-template-columns: 1fr;
          }
        }

        .rb-card {
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

        .rb-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), rgba(187, 5, 5, 0.25));
          opacity: 0.7;
        }

        .rb-card:hover {
          transform: translateY(-4px);
          border-color: rgba(187, 5, 5, 0.55);
          background: rgba(187, 5, 5, 0.03);
          box-shadow: 0 14px 34px rgba(187, 5, 5, 0.14);
        }

        .rb-card:focus {
          border-color: rgba(187, 5, 5, 0.7);
          box-shadow: 0 0 0 3px rgba(187, 5, 5, 0.18);
        }

        .rb-card-image {
          height: 210px;
          background: rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .rb-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .rb-card-image-fallback {
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

        .rb-card-content {
          padding: 4px 14px 12px;
        }

        .rb-card-title {
          margin: 0 0 4px;
          color: #171717 !important;
          -webkit-text-fill-color: #171717 !important;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .rb-card-desc {
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

        .rb-card-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .rb-read {
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

        .rb-read:hover,
        .rb-card:hover .rb-read {
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

export default RoboticsPage;
