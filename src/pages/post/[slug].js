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

  console.log('PostDetails - Component render:', { slug, initialData: !!initialData, localView });

  const {
    data: postData,
    isLoading,
    error,
  } = usePostBySlug(slug, {
    initialData,
    enabled: !!slug && !localView,
  });

  console.log('PostDetails - Query state:', { postData: !!postData, isLoading, error: !!error });

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
  console.log('PostDetails - Resolved post:', !!resolvedPost, resolvedPost?.title);

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
    const skip = (currentSlug.length % 10);
    return `
      *[_type == "post" && slug.current != "${currentSlug}"]{
        title,
        "slug": slug.current,
        altText,
        publishedAt,
        "featureImg": mainImage.asset->url,
        description
      } | order(publishedAt desc)[${skip}...${skip + 3}]
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
    if (error) {
      console.error('Post fetch error:', error);
      return <ErrorFallback error={error} />;
    }
  }

  if (!resolvedPost) {
    console.log('No post data found for slug:', slug);
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/blogs" style={{ 
          color: '#007bff', 
          textDecoration: 'underline',
          marginTop: '1rem'
        }}>
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <HeadMetaDynamic metaData={postData} />
      <HeaderOne />
      <div className="postPage">
        <div className="postContainer">
          <div className="postLayout">
            {/* Left Side Content */}
            <div className="postLeft">
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

              <div className={`postHeader ${isVisible ? "animate-in" : ""}`}>
                <h1 className="postTitle">{resolvedPost?.title}</h1>
              </div>

              <div className={`followUsSection ${isVisible ? "animate-in" : ""}`}>
                <div className="followUsHeader">
                  <h3 className="followUsTitle">Follow Us:</h3>
                  <div className="socialIcons">
                    <a href="https://www.facebook.com/theunicorntimeswhere" target="_blank" rel="noopener noreferrer" className="socialIcon socialIcon-facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com/EntreprChrocles" target="_blank" rel="noopener noreferrer" className="socialIcon socialIcon-twitter">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/the.unicorntimes/" target="_blank" rel="noopener noreferrer" className="socialIcon socialIcon-instagram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="socialIcon socialIcon-youtube">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/the-unicorn-times/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="socialIcon socialIcon-linkedin">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

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

              <div className={`shareSection ${isVisible ? "animate-in" : ""}`}>
                <h3 className="shareTitle">Share:</h3>
                <div className="shareButtons">
                  <button className="shareButton shareButton-facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                  <button className="shareButton shareButton-twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Twitter</span>
                  </button>
                    <button className="shareButton shareButton-linkedin">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                  <button className="shareButton shareButton-instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Blogs - Full Width */}
          {relatedBlogs && relatedBlogs.length > 0 ? (
            <section className={`relatedSection ${isVisible ? "animate-in" : ""}`}>
              <div className={`revealBlock ${revealed.related ? "isRevealed" : ""}`} data-reveal="related">
                <div className="relatedHeader">
                  <h2 className="relatedTitle">Recommended:</h2>
                </div>

                <div className="relatedContainer">
                  <div className="relatedGrid">
                    {relatedBlogs.slice(0, 3).map((post, index) => (
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
          background: #ffffff;
          color: #111111;
          padding: 2.5rem 0 3.5rem;
          min-height: 100vh;
        }

        .postContainer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .postLayout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .postLeft {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .postHeader {
          opacity: 1;
          transform: none;
          text-align: center;
        }

        .postHeader.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        .postTitle {
          margin: 0;
          font-size: clamp(2.5rem, 4vw, 3.2rem);
          font-weight: 600;
          letter-spacing: 0.4px;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-family: var(--primary-font);
          text-align: center !important;
        }

        .postHero {
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
          height: 450px;
          object-fit: cover;
          display: block;
          background: #f2f2f2;
        }

        .followUsSection {
          opacity: 1;
          transform: none;
        }

        .followUsSection.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        .followUsHeader {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .followUsTitle {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #000000;
          font-family: var(--primary-font);
        }

        .socialIcons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .socialIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 40px;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          font-family: var(--primary-font);
        }

        .socialIcon-facebook {
          background: #0d4fa8;
        }

        .socialIcon-facebook:hover {
          background: #0a3d82;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 79, 168, 0.25);
        }

        .socialIcon-twitter {
          background: #000000;
        }

        .socialIcon-twitter:hover {
          background: #333333;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        .socialIcon-instagram {
          background: #2d2d2d;
        }

        .socialIcon-instagram:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(45, 45, 45, 0.25);
        }

        .socialIcon-youtube {
          background: #bb0505;
        }

        .socialIcon-youtube:hover {
          background: #990000;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
        }

        .socialIcon-linkedin {
          background: #0d4fa8;
        }

        .socialIcon-linkedin:hover {
          background: #0a3d82;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 79, 168, 0.25);
        }

        .socialIcon svg {
          width: 24px;
          height: 24px;
        }

        .postBody {
          font-size: 1.25rem;
          line-height: 1.9;
          color: #111111;
          opacity: 1;
          transform: none;
        }

        .postBody :global(*) {
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .postBody :global(strong),
        .postBody :global(b) {
          font-weight: 900;
          font-size: 1.4rem;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          display: block;
          margin: 1rem 0 0.5rem 0;
        }

        .postBody :global(h2),
        .postBody :global(h3) {
          font-weight: 800;
          font-size: 1.6rem;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .postBody :global(p:last-child),
        .postBody :global(.conclusion) {
          font-weight: 700;
          font-size: 1.35rem;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid #e0e0e0;
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

        .shareSection {
          padding: 0;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
          transform: none;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .shareSection.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        .shareTitle {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #000000;
          font-family: var(--primary-font);
        }

        .shareButtons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .shareButton {
          padding: 0.8rem 1.5rem;
          color: #ffffff !important;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--primary-font);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .shareButton span {
          color: #ffffff !important;
        }

        .shareButton-facebook {
          background: #0d4fa8;
        }

        .shareButton-facebook:hover {
          background: #0a3d82;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 79, 168, 0.25);
        }

        .shareButton-twitter {
          background: #000000;
        }

        .shareButton-twitter:hover {
          background: #333333;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        .shareButton-instagram {
          background: #2d2d2d;
        }

        .shareButton-instagram:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(45, 45, 45, 0.25);
        }

        .shareButton-linkedin {
          background: #0d4fa8;
        }

        .shareButton-linkedin:hover {
          background: #0a3d82;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 79, 168, 0.25);
        }

        .shareButton svg {
          width: 20px;
          height: 20px;
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
          justify-content: left;
          margin-bottom: 2rem;
        }

        .relatedTitle {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-family: var(--primary-font);
        }

        .relatedContainer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .relatedGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 3rem;
          align-items: stretch;
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
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 350px;
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
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--primary-font);
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
          font-family: var(--primary-font);
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
          font-family: var(--primary-font);
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
          .postLayout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .postRight {
            display: none;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 992px) {
          .postHeroImg {
            height: 350px;
          }

          .postContainer {
            padding: 0 1.5rem;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
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

        @media (max-width: 768px) {
          .postPage {
            padding: 2rem 0 3rem;
          }

          .postHeroImg {
            height: 280px;
          }

          .postBody {
            font-size: 1.1rem;
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

        @media (max-width: 576px) {
          .postContainer {
            padding: 0 1rem;
          }

          .postHeroImg {
            height: 220px;
          }

          .followUsSection,
          .shareSection {
            padding: 1.5rem;
          }

          .socialIcons,
          .shareButtons {
            flex-direction: column;
          }

          .socialIcon,
          .shareButton {
            width: 100%;
            text-align: center;
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
    
    // Multiple query approaches for maximum compatibility
    let initialData = null;
    
    // Approach 1: Standard query with proper escaping
    try {
      const escapedSlug = slug.replace(/["\\]/g, '\\$&');
      const standardQuery = `
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
      console.log('SSR - Standard query:', standardQuery.trim());
      initialData = await client.fetch(standardQuery);
      console.log('SSR - Standard query result:', initialData);
    } catch (error) {
      console.log('SSR - Standard query failed:', error.message);
    }
    
    // Approach 2: Simplified query if standard fails
    if (!initialData) {
      try {
        const simpleQuery = `*[_type == "post" && slug.current == "${slug}"][0]{
          title,
          slug: slug.current,
          publishedAt,
          description,
          featureImg: mainImage.asset->url,
          body
        }`;
        console.log('SSR - Simple query:', simpleQuery);
        initialData = await client.fetch(simpleQuery);
        console.log('SSR - Simple query result:', initialData);
      } catch (error) {
        console.log('SSR - Simple query failed:', error.message);
      }
    }
    
    // Approach 3: Match query if both fail
    if (!initialData) {
      try {
        const matchQuery = `*[_type == "post" && slug.current match "${slug}*"][0]{
          title,
          slug: slug.current,
          publishedAt,
          description,
          featureImg: mainImage.asset->url,
          body
        }`;
        console.log('SSR - Match query:', matchQuery);
        initialData = await client.fetch(matchQuery);
        console.log('SSR - Match query result:', initialData);
      } catch (error) {
        console.log('SSR - Match query failed:', error.message);
      }
    }

    if (!initialData) {
      console.log('SSR - No post found with any approach, returning 404');
      return { notFound: true };
    }

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('SSR - Critical error:', {
      message: error.message,
      stack: error.stack,
      slug: context.params.slug
    });
    
    // Always return 404 instead of 500
    return { notFound: true };
  }
}
