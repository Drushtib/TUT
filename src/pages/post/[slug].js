import { useRouter } from "next/router";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { PortableText } from "@portabletext/react";
import { usePostBySlug } from "../../hooks/usePosts";
import { client } from "../../client";
import { getPostBySlugQuery } from "../../lib/sanity/queries/posts";
import { RichTextComponent } from "../../components/post/RichTextComponent";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PostDetails = ({ initialData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const localView = router.query?.local === "1";
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [revealed, setRevealed] = useState({ body: false, related: false });

  const {
    data: postData,
    isLoading,
    error,
  } = usePostBySlug(slug, {
    initialData,
    enabled: !!slug && !localView,
  });

  const localData = localView
    ? {
        title: router.query?.title || "",
        description: router.query?.description || "",
        featureImg: router.query?.img || "",
        altText: router.query?.alt || "",
        body: null,
      }
    : null;

  const resolvedPost = localView ? localData : postData;

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setHasUserScrolled(true);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute("data-reveal");
          if (!key) return;
          setRevealed((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
        });
      },
      { root: null, threshold: 0.12 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!resolvedPost?.body) return;
    if (!hasUserScrolled) return;

    const root = document.querySelector(".postBody");
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll("h2, h3, h4, p, ul, ol, blockquote")
    );
    if (items.length === 0) return;

    items.forEach((el) => {
      el.classList.add("revealItem");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("isRevealed");
          io.unobserve(entry.target);
        });
      },
      { root: null, threshold: 0.32, rootMargin: "0px 0px -12% 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [resolvedPost?.body, hasUserScrolled]);

  const currentSlug = useMemo(() => {
    if (!resolvedPost) return "";
    return resolvedPost?.slug?.current || resolvedPost?.slug || slug || "";
  }, [resolvedPost, slug]);

  const relatedQuery = useMemo(() => {
    if (!currentSlug) return null;
    return `
      *[_type == "post" && lower(categories[0]->title) match "*blog*" && slug.current != "${currentSlug}"]{
        title,
        "slug": slug.current,
        altText,
        publishedAt,
        "featureImg": mainImage.asset->url,
        description
      } | order(publishedAt desc)[0...4]
    `;
  }, [currentSlug]);

  const { data: relatedBlogs } = useQuery({
    queryKey: ["relatedBlogs", currentSlug],
    queryFn: async () => {
      if (!relatedQuery) return [];
      const response = await client.fetch(relatedQuery);
      return response || [];
    },
    enabled: !!relatedQuery && !localView,
  });

  if (!localView) {
    if (isLoading) return <Loader />;
    if (error) return <ErrorFallback error={error} />;
  }

  if (!resolvedPost) return <div>No data found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={postData} />
      <HeaderOne />
      <div className="postPage">
        <div className="postContainer">
          <div className={`postHeader ${isVisible ? "animate-in" : ""}`}>
            <h1 className="postTitle">{resolvedPost?.title}</h1>
          </div>

          <div className={`postHero ${isVisible ? "animate-in" : ""}`}>
            <img
              src={resolvedPost?.featureImg || "/images/placeholder.png"}
              alt={resolvedPost?.altText || resolvedPost?.title || "Post image"}
              className="postHeroImg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/placeholder.png";
              }}
            />
          </div>

          {resolvedPost?.description ? (
            <div className={`postIntroduction ${isVisible ? "animate-in" : ""}`}>
              <h4 className="postIntroLabel">Introduction</h4>
              <p className="postIntroText">{resolvedPost.description}</p>
            </div>
          ) : null}

          <article
            className={`postBody ${isVisible ? "animate-in" : ""} ${
              hasUserScrolled ? "scrollReady" : "awaitScroll"
            }`}
          >
            <div className={`revealBlock ${revealed.body ? "isRevealed" : ""}`} data-reveal="body">
              {resolvedPost?.body ? (
                <PortableText value={resolvedPost?.body} components={RichTextComponent} />
              ) : null}
            </div>
          </article>

          {relatedBlogs && relatedBlogs.length > 0 ? (
            <section className={`relatedSection ${isVisible ? "animate-in" : ""}`}>
              <div className={`revealBlock ${revealed.related ? "isRevealed" : ""}`} data-reveal="related">
                <div className="relatedHeader">
                  <h2 className="relatedTitle">Related Blogs</h2>
                </div>

                <div className="relatedContainer">
                  <div className="relatedGrid">
                    {relatedBlogs.map((post, index) => (
                      <div
                        key={post.slug || index}
                        className="relatedCard"
                        style={{ animationDelay: `${index * 0.06}s` }}
                      >
                        <div className="relatedImgWrap">
                          <img
                            src={post.featureImg || "/images/placeholder.png"}
                            alt={post.altText || post.title || "Blog image"}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/images/placeholder.png";
                            }}
                          />
                        </div>

                        <div className="relatedBody">
                          <h3 className="relatedCardTitle">{post.title}</h3>
                          {post.description ? (
                            <p className="relatedCardDesc">{post.description}</p>
                          ) : null}

                          <Link href={`/post/${post.slug}`} passHref legacyBehavior>
                            <a className="relatedReadMore">Read More</a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .postPage {
          background: #f5f5f5;
          color: #111111;
          padding: 2.5rem 0 3.5rem;
          min-height: 100vh;
        }

        .postContainer {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .postHeader {
          text-align: center;
          margin-bottom: 1.5rem;
          opacity: 1;
          transform: none;
        }

        .postHeader.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        .postTitle {
          margin: 0;
          font-size: clamp(2rem, 3.2vw, 3.2rem);
          font-weight: 700;
          letter-spacing: 0.4px;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }

        .postSubtitle {
          margin: 0.85rem auto 0;
          max-width: 75ch;
          color: rgba(0, 0, 0, 0.78);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.78);
          font-size: 1.2rem;
          line-height: 1.7;
        }

        .postIntroduction {
          margin: 0 0 1rem 0;
          text-align: left;
          opacity: 1;
          transform: none;
          padding: 0;
        }

        .postIntroduction.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.12s;
        }

        .postIntroLabel {
          margin: 0 0 0.5rem 0;
          color: rgba(0, 0, 0, 0.85);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.85);
          font-size: 1.8rem;
          line-height: 1.6;
          font-weight: 700;
          font-style: normal;
          text-align: left;
        }

        .postIntroText {
          margin: 0;
          color: rgba(0, 0, 0, 0.85);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.85);
          font-size: 1.6rem;
          line-height: 1.6;
          font-weight: 400;
          font-style: normal;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.8em;
        }

        .postHero {
          margin: 1.25rem 0 1.75rem;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
          opacity: 1;
          transform: none;
        }

        .postHero.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.08s;
        }

        .postHeroImg {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          background: #f2f2f2;
        }

        .postBody {
          font-size: 1.12rem;
          line-height: 1.9;
          color: #111111;
          opacity: 1;
          transform: none;
        }

        .postBody :global(*) {
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .postBody :global(p) {
          margin: 0 0 0.22rem 0 !important;
          line-height: 1.95 !important;
        }

        .postBody :global(ul),
        .postBody :global(ol) {
          margin: 0 0 0.22rem 1.2rem !important;
          padding-left: 1.2rem !important;
        }

        .postBody :global(ol) {
          list-style: decimal !important;
        }

        .postBody :global(ul) {
          list-style: disc !important;
        }

        .postBody :global(li) {
          margin: 0.22rem 0 !important;
          display: list-item !important;
        }

        .revealBlock {
          opacity: 1;
          transform: none;
          transition: opacity 0.65s ease, transform 0.65s ease;
          will-change: opacity, transform;
        }

        .revealBlock.isRevealed {
          opacity: 1;
          transform: translateY(0);
        }

        .postBody :global(.revealItem) {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.95s ease, transform 0.95s ease;
        }

        .postBody.awaitScroll :global(h2),
        .postBody.awaitScroll :global(h3),
        .postBody.awaitScroll :global(h4),
        .postBody.awaitScroll :global(p),
        .postBody.awaitScroll :global(ul),
        .postBody.awaitScroll :global(ol),
        .postBody.awaitScroll :global(blockquote) {
          opacity: 0;
          transform: translateY(20px);
        }

        .postBody :global(.revealItem.isRevealed) {
          opacity: 1;
          transform: translateY(0);
        }

        .postBody.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.14s;
        }

        .relatedSection {
          margin-top: 3rem;
          opacity: 1;
          transform: none;
        }

        .relatedSection {
          color: #000000;
        }

        .relatedSection.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.18s;
        }

        .relatedHeader {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .relatedTitle {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }

        .relatedContainer {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .relatedGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 5rem 1.75rem;
        }

        /* Related cards: match /blogs card style (white bg, black text) */
        .relatedCard {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          opacity: 0;
          transform: translateY(18px);
          animation: fadeUp 0.55s ease forwards;
        }

        .relatedCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.10);
          border-color: rgba(187, 5, 5, 0.35);
        }

        .relatedImgWrap {
          width: 100%;
          height: 220px;
          background: rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        .relatedImgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .relatedCard:hover .relatedImgWrap img {
          transform: translateY(-2px);
          filter: saturate(1.08) contrast(1.06);
        }

        .relatedBody {
          padding: 1.25rem 1.15rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .relatedCardTitle {
          margin: 0;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-weight: 800;
          font-size: 1.55rem;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .relatedCardDesc {
          margin: 0;
          color: rgba(0, 0, 0, 0.82) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.82) !important;
          font-size: 1.35rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.6em;
        }

        .relatedReadMore {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          background: #ffffff !important;
          border: 1px solid #000000 !important;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
        }

        .relatedReadMore:hover {
          transform: translateY(-1px);
          background: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 16px 34px rgba(187, 5, 5, 0.22);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1200px) {
          .relatedGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 992px) {
          .postHeroImg {
            height: 360px;
          }

          .postIntroduction {
            margin: 0 0 1rem 0;
          }

          .postIntroLabel {
            font-size: 1.6rem;
            line-height: 1.6;
          }

          .postIntroText {
            font-size: 1.4rem;
            line-height: 1.6;
            font-weight: 400;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem 1.25rem;
          }

          .relatedTitle {
            font-size: 2rem;
          }

          .relatedCardTitle {
            font-size: 1.35rem;
          }

          .relatedCardDesc {
            font-size: 1.15rem;
          }
        }

        @media (max-width: 576px) {
          .postPage {
            padding: 2rem 0 3rem;
          }

          .postHeroImg {
            height: 260px;
          }

          .postIntroduction {
            margin: 0 0 1rem 0;
          }

          .postIntroLabel {
            font-size: 1.6rem;
            line-height: 1.6;
          }

          .postIntroText {
            font-size: 1.4rem;
            line-height: 1.6;
            font-weight: 400;
          }

          .postBody {
            font-size: 1.05rem;
          }

          .relatedGrid {
            grid-template-columns: 1fr;
            gap: 1.6rem;
          }

          .relatedImgWrap {
            height: 240px;
          }

          .relatedCardTitle {
            font-size: 1.35rem;
          }

          .relatedCardDesc {
            font-size: 1.15rem;
          }

          .relatedTitle {
            font-size: 1.8rem;
          }
        }
      `}</style>
      <FooterTwo />
    </>
  );
};

export default PostDetails;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  if (context?.query?.local === "1") {
    return {
      props: {
        initialData: null,
      },
    };
  }

  try {
    console.log('SSR - Fetching post for slug:', slug);
    
    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      console.log('SSR - Invalid slug parameter');
      return { notFound: true };
    }
    
    // Escape slug to prevent GROQ injection
    const escapedSlug = slug.replace(/["\\]/g, '\\$&');
    console.log('SSR - Escaped slug:', escapedSlug);
    
    // Use the most basic, reliable query structure
    const query = `
      *[_type == "post" && slug.current == "${escapedSlug}"] {
        title,
        "slug": slug.current,
        publishedAt,
        description,
        "featureImg": mainImage.asset->url,
        body,
        altText,
        keywords
      }[0]
    `;
    
    console.log('SSR - Executing query:', query.trim());
    
    const initialData = await client.fetch(query);
    console.log('SSR - Query result:', initialData);

    if (!initialData) {
      console.log('SSR - No post found, returning 404');
      return { notFound: true };
    }

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('SSR - Error details:', {
      message: error.message,
      stack: error.stack,
      slug: context.params.slug
    });
    
    // Always return 404 instead of 500 to prevent server errors
    return { notFound: true };
  }
}
