import { useRouter } from "next/router";

import HeaderOne from "../../components/header/HeaderOne";

import FooterTwo from "../../components/footer/FooterTwo";

import Loader from "../../components/common/Loader";

import ErrorFallback from "../../components/common/ErrorFallback";

import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";

import { PortableText } from "@portabletext/react";

import { useQuery } from "@tanstack/react-query";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { client } from "../../client";

const fetchIndustryPostBySlug = async (slug) => {
  const query = `
    *[_type == "industryPost" && slug.current == $slug][0]
    {
      title,
      slug,
      altText,
      publishedAt,
      'featureImg': mainImage.asset->url,
      description,
      body,
      'category': {
        'title': industryCategory->title,
        'slug': industryCategory->slug.current
      },
      author
    }
  `;

  return client.fetch(query, { slug });
};

const IndustryPostDetails = () => {

  const router = useRouter();

  const { slug } = router.query;

  const [isVisible, setIsVisible] = useState(false);

  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  const [revealed, setRevealed] = useState({ body: false, related: false });

  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["industryPost", slug],
    queryFn: () => fetchIndustryPostBySlug(slug),
    enabled: !!slug,
  });

  const resolvedPost = postData;

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
          setRevealed(prev => ({ ...prev, [key]: true }));
          io.unobserve(entry.target);
        });
      },
      { root: null, threshold: 0.32, rootMargin: "0px 0px -12% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [resolvedPost?.body, hasUserScrolled]);

  const currentSlug = useMemo(() => {
    if (!resolvedPost) return "";
    return resolvedPost?.slug?.current || resolvedPost?.slug || slug || "";
  }, [resolvedPost, slug]);

  // Related blogs query
  const relatedQuery = useMemo(() => {
    if (!currentSlug) return null;

    const skip = (currentSlug.length % 10);
    const limit = 6;
    
    return `
      *[_type == "industryPost" && slug.current != $currentSlug] | order(publishedAt desc)[${skip}...${skip + limit}] {
        title,
        slug,
        "featureImg": mainImage.asset->url,
        altText,
        publishedAt,
        description,
        "category": {
          "title": industryCategory->title,
          "slug": industryCategory->slug.current
        }
      }
    `;
  }, [currentSlug]);

  const { data: relatedBlogs } = useQuery({
    queryKey: ["relatedIndustryBlogs", currentSlug],
    queryFn: async () => {
      if (!relatedQuery) return [];
      const response = await client.fetch(relatedQuery, { currentSlug });
      return response || [];
    },
    enabled: !!relatedQuery,
  });

  // Previous/Next blogs query
  const adjacentQuery = useMemo(() => {
    if (!currentSlug) return null;
    
    return `
      *[_type == "industryPost"] | order(publishedAt desc) {
        title,
        slug,
        "featureImg": mainImage.asset->url,
        altText,
        publishedAt,
        description,
        "category": {
          "title": industryCategory->title,
          "slug": industryCategory->slug.current
        }
      }
    `;
  }, [currentSlug]);

  const { data: allIndustryBlogs } = useQuery({
    queryKey: ["allIndustryBlogs"],
    queryFn: async () => {
      if (!adjacentQuery) return [];
      const response = await client.fetch(adjacentQuery);
      return response || [];
    },
    enabled: !!adjacentQuery,
  });

  const adjacentPosts = useMemo(() => {
    if (!allIndustryBlogs || !currentSlug) return { prev: null, next: null };
    
    const currentIndex = allIndustryBlogs.findIndex(post => 
      post.slug?.current === currentSlug || post.slug === currentSlug
    );
    
    return {
      prev: currentIndex > 0 ? allIndustryBlogs[currentIndex - 1] : null,
      next: currentIndex < allIndustryBlogs.length - 1 ? allIndustryBlogs[currentIndex + 1] : null
    };
  }, [allIndustryBlogs, currentSlug]);

  if (isLoading) return <Loader />;

  if (error) {
    console.error('Industry post fetch error:', error);
    return <ErrorFallback error={error} />;
  }

  if (!resolvedPost) {
    console.log('No industry post data found for slug:', slug);
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
        <h2>Industry Post Not Found</h2>
        <p>The industry post you're looking for doesn't exist or has been removed.</p>
        <Link href="/industries" style={{ 
          color: '#007bff', 
          textDecoration: 'underline',
          marginTop: '1rem'
        }}>
          ← Back to Industries
        </Link>
      </div>
    );
  }

  const generateStructuredData = () => {
    if (!resolvedPost) return null;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": resolvedPost?.title || "",
      "description": resolvedPost?.description || "",
      "image": resolvedPost?.featureImg || "",
      "author": {
        "@type": "Organization",
        "name": "The Unicorn Times",
        "url": "https://theunicorntimes.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Unicorn Times",
        "logo": {
          "@type": "ImageObject",
          "url": "https://theunicorntimes.com/favicon.png"
        }
      },
      "datePublished": resolvedPost?.publishedAt || "",
      "dateModified": resolvedPost?.publishedAt || ""
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  };

  return (
    <>
      <HeaderOne />
      <div className="page">
        <div className="container">
                    <div className="newsLayout">
            {/* Left Side - Main Content */}
            <div className="mainContent">
              <div className="header">
                <h1 className="title">{resolvedPost?.title}</h1>
              </div>

              {resolvedPost?.featureImg && (
                <div className="hero">
                  <img
                    src={resolvedPost.featureImg}
                    alt={resolvedPost.altText || resolvedPost.title}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              <article className="body">
                {resolvedPost?.body ? (
                  <PortableText
                    value={resolvedPost.body}
                    components={{
                      block: {
                        normal: ({ children }) => <p className="p contentHtml-p">{children}</p>,
                        h1: ({ children }) => <h1 className="contentHtml-h1">{children}</h1>,
                        h2: ({ children }) => <h2 className="contentHtml-h2">{children}</h2>,
                        h3: ({ children }) => <h3 className="contentHtml-h3">{children}</h3>,
                        h4: ({ children }) => <h4 className="contentHtml-h3">{children}</h4>,
                        h5: ({ children }) => <h5 className="contentHtml-h3">{children}</h5>,
                        h6: ({ children }) => <h6 className="contentHtml-h3">{children}</h6>,
                      },
                      list: ({ children }) => <ul className="contentHtml-list">{children}</ul>,
                      listItem: ({ children }) => <li className="contentHtml-li">{children}</li>,
                      marks: {
                        strong: ({ children }) => <strong>{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                      },
                    }}
                  />
                ) : (
                  <p className="p">{resolvedPost?.description}</p>
                )}
              </article>

              {/* Previous/Next Navigation */}
              <div className="navigation">
                {adjacentPosts.prev && (
                  <Link href={`/industry-post/${adjacentPosts.prev.slug?.current || adjacentPosts.prev.slug}`} className="navLink prev">
                    <span className="navLabel">← Previous</span>
                    <span className="navTitle">{adjacentPosts.prev.title}</span>
                  </Link>
                )}
                {adjacentPosts.next && (
                  <Link href={`/industry-post/${adjacentPosts.next.slug?.current || adjacentPosts.next.slug}`} className="navLink next">
                    <span className="navLabel">Next →</span>
                    <span className="navTitle">{adjacentPosts.next.title}</span>
                  </Link>
                )}
              </div>

                          </div>

            {/* Right Side - Related Posts */}
            <div className="sidebar">
              <h3 className="relatedTitle">Related Posts</h3>
              {relatedBlogs && relatedBlogs.length > 0 ? (
                <ul className="relatedList">
                  {relatedBlogs.map((post) => (
                    <li key={post.slug} className="relatedItem">
                      <Link href={`/industry-post/${post.slug?.current || post.slug}`}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No related posts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />

      <style jsx global>{`
        html {
          overflow: visible !important;
          height: auto !important;
          max-height: none !important;
        }

        body {
          overflow: visible !important;
          height: auto !important;
          max-height: none !important;
          min-height: auto !important;
        }

        body > div {
          min-height: auto !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }

        body > div > div {
          min-height: auto !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }

        .page {
          width: 100%;
          background: #ffffff;
          color: #111111;
          padding: 2.5rem 0 3.5rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          overflow: visible !important;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          overflow: visible !important;
        }

        .newsLayout {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          gap: 3rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          overflow: visible !important;
          height: auto !important;
        }

        .mainContent {
          max-width: none;
          border-right: 1.5px solid #706464ff;
          padding-right: 3rem;
          padding-left: 2rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          overflow: visible !important;
          height: auto !important;
        }

        .sidebar {
          position: sticky !important;
          top: 80px !important;
          padding-left: 2rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          height: fit-content !important;
          max-height: none !important;
        }

        .header {
          text-align: left;
          margin-bottom: 1.5rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .title {
          margin: 0;
          font-size: clamp(2rem, 3.2vw, 3.2rem);
          font-weight: 800;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .meta {
          margin-top: 0.75rem;
          color: rgba(0, 0, 0, 0.72);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.72);
          font-size: 1.05rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .hero {
          margin: 1.25rem 0 1.75rem;
          border-radius: 0;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
          background: #f2f2f2;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .body {
          font-size: 1.5rem !important;
          line-height: 1.6 !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml {
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .p {
          margin: 0 0 1rem 0;
          color: #111111;
          -webkit-text-fill-color: #111111;
          white-space: pre-wrap;
          font-size: 1.5rem !important;
          line-height: 1.6 !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml :global(h2) {
          margin: 1.1rem 0 0.75rem;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1.25;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-h1 {
          margin: 1.5rem 0 1rem;
          color: #111f35;
          -webkit-text-fill-color: #111f35;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.25;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-h2 {
          margin: 1.5rem 0 0.75rem;
          color: #111f35;
          -webkit-text-fill-color: #111f35;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.25;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-h3 {
          margin: 1.2rem 0 0.5rem;
          color: #111f35;
          -webkit-text-fill-color: #111f35;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.25;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-image {
          display: block;
          width: 100%;
          max-width: 640px;
          height: auto;
          margin: 0.75rem auto 1.25rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .contentHtml :global(p) {
          margin: 0 0 1rem;
          color: #111111;
          -webkit-text-fill-color: #111111;
          font-size: 1.5rem !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-p {
          font-size: 1.5rem !important;
          line-height: 1.6 !important;
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-list {
          margin: 0.75rem 0 1rem;
          padding-left: 2.25rem;
          color: #111111;
          -webkit-text-fill-color: #111111;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml-li {
          margin: 0.35rem 0;
          font-size: 1.5rem !important;
          line-height: 1.5;
          color: #111111;
          -webkit-text-fill-color: #111111;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml :global(ul),
        .contentHtml :global(ol) {
          margin: 0.75rem 0 1rem;
          padding-left: 2.25rem;
          color: #111111;
          -webkit-text-fill-color: #111111;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml :global(li) {
          margin: 0.35rem 0;
          font-size: 1.5rem !important;
          line-height: 1.6;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .contentHtml :global(ul li::marker),
        .contentHtml :global(ol li::marker) {
          color: #000000;
        }

        .contentHtml :global(ul) {
          list-style-type: disc;
        }

        .contentHtml :global(ol) {
          list-style-type: decimal;
        }

        .contentHtml :global(.tableWrap) {
          width: 100%;
          overflow-x: auto;
          margin: 1rem 0 1.25rem;
        }

        .contentHtml :global(.equation) {
          margin: 0.9rem 0 1.1rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.03);
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-size: 1.35rem;
          font-weight: 800;
          text-align: center;
          letter-spacing: 0.2px;
        }

        .contentHtml :global(img.contentImage) {
          display: block;
          width: 100%;
          max-width: 640px;
          height: 240px;
          object-fit: cover;
          margin: 0.75rem auto 1.25rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .contentHtml :global(table.contentTable) {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
          background: #ffffff;
        }

        .contentHtml :global(table.contentTable th),
        .contentHtml :global(table.contentTable td) {
          border: 1px solid rgba(0, 0, 0, 0.35);
          padding: 0.85rem 1rem;
          text-align: left;
          vertical-align: top;
          color: #111111;
          -webkit-text-fill-color: #111111;
          font-size: 1.6rem;
          line-height: 1.35;
          white-space: normal;
        }

        .contentHtml :global(table.contentTable th) {
          font-weight: 800;
          background: rgba(0, 0, 0, 0.03);
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .navLink {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          max-width: 45%;
          padding: 1rem;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .navLink:hover {
          background-color: #f8f9fa;
        }

        .navLink.prev {
          text-align: left;
        }

        .navLink.next {
          text-align: right;
          margin-left: auto;
        }

        .navLabel {
          font-size: 1.3rem;
          font-weight: 600;
          color: #007bff;
          -webkit-text-fill-color: #007bff;
          margin-bottom: 0.5rem;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .navTitle {
          font-size: 1.3rem;
          font-weight: 500;
          line-height: 1.4;
          color: #000000;
          -webkit-text-fill-color: #000000;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .relatedTitle {
          margin: 0 0 1rem 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: #111f35;
          -webkit-text-fill-color: #111f35;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .relatedList {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .relatedItem {
          padding: 0.5rem 0;
          border-bottom: 1px solid #706464ff;
        }

        .relatedItem:last-child {
          border-bottom: none;
        }

        .relatedItem a {
          text-decoration: none;
          color: #111f35 !important;
          -webkit-text-fill-color: #111f35 !important;
          font-size: 1.5rem !important;
          font-weight: 400 !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }

        .relatedItem a:hover {
          text-decoration: underline;
        }

        @media (max-width: 992px) {
          .hero {
            height: 360px;
          }

          .newsLayout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sidebar {
            position: static;
          }

          .navigation {
            flex-direction: column;
            gap: 1rem;
          }

          .navLink {
            max-width: 100%;
          }

          .navLink.next {
            margin-left: 0;
          }
        }

        @media (max-width: 576px) {
          .hero {
            height: 260px;
          }

          .body {
            font-size: 1.05rem;
          }

          .newsLayout {
            gap: 1.5rem;
          }

          .relatedPosts {
            padding: 1rem;
          }

          .relatedItem {
            padding: 0.5rem;
          }

          .relatedImage {
            width: 60px;
            height: 45px;
          }

          .navigation {
            margin-top: 2rem;
            padding-top: 1.5rem;
          }
        }

        .postHero {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.2s;
        }

        .postHero.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.08s;
        }

        .postHeroImg {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          background: #f2f2f2;
        }

        .newsHero {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
          opacity: 1;
          transform: none;
        }

        .newsHero.animate-in {
          animation: fadeUp 0.55s ease forwards;
          animation-delay: 0.08s;
        }

        .newsHero-featured {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .newsHero-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .newsHero-featured:hover .newsHero-featured-image {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.18);
        }

        .newsHero-featured-image {
          width: 100%;
          height: 400px;
          position: relative;
          overflow: hidden;
        }

        .newsHero-featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .newsHero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
          padding: 2rem;
          color: #ffffff;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .newsHero-title {
          margin: 0 0 0.75rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .newsHero-description {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .newsHero-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .newsHero-sidebar-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .newsHero-sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsHero-sidebar-item {
          display: block;
          text-decoration: none;
          padding: 0.75rem;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .newsHero-sidebar-item:hover {
          border-color: #bb0505;
          background: rgba(187, 5, 5, 0.02);
          transform: translateX(-4px);
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.1);
        }

        .newsHero-sidebar-content {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .newsHero-sidebar-image {
          flex-shrink: 0;
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
        }

        .newsHero-sidebar-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .newsHero-sidebar-text {
          flex: 1;
        }

        .newsHero-sidebar-text h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }

        .postTitle {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #000;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .postCategory {
          font-size: 0.9rem;
          font-weight: 600;
          color: #bb0505;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .followUsSection {
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.3s;
        }

        .followUsSection.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .followUsTitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .socialIcons {
          display: flex;
          gap: 1rem;
        }

        .socialIcon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .socialIcon:hover {
          transform: translateY(-2px);
        }

        .socialIcon-facebook {
          background: #1877f2;
        }

        .socialIcon-twitter {
          background: #1da1f2;
        }

        .socialIcon-instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }

        .socialIcon-youtube {
          background: #ff0000;
        }

        .socialIcon-linkedin {
          background: #0077b5;
        }

        .postBody {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.4s;
        }

        .postBody.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .revealBlock {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .revealBlock.isRevealed {
          opacity: 1;
          transform: translateY(0);
        }

        .postDescription {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
        }

        .body-paragraph {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .body-h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #000;
          margin: 2rem 0 1rem 0;
        }

        .body-h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000;
          margin: 1.5rem 0 0.8rem 0;
        }

        .body-h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #000;
          margin: 1rem 0 0.6rem 0;
        }

        .shareSection {
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.5s;
        }

        .shareSection.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .shareTitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .shareButtons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .shareButton {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
        }

        .shareButton svg {
          width: 16px;
          height: 16px;
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

        .shareButton-linkedin {
          background: #0d4fa8;
        }

        .shareButton-linkedin:hover {
          background: #0a3d82;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 79, 168, 0.25);
        }

        .shareButton-instagram {
          background: #2d2d2d;
        }

        .shareButton-instagram:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(45, 45, 45, 0.25);
        }

        .backSection {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.6s;
        }

        .backSection.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .backButton {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 2rem;
          background: #bb0505;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
        }

        .backButton:hover {
          background: #990000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.35);
        }

        /* Recommended Blogs Section Styles */
        .relatedSection {
          margin-top: 3rem;
          padding: 3rem 0;
          color: #000000;
        }

        .relatedSection.animate-in {
          animation: fadeUp 0.55s ease forwards;
        }

        .relatedHeader {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .relatedTitle {
          font-size: 2.2rem;
          font-weight: 700;
          color: #000000;
          text-align: center;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .relatedContainer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .relatedGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* Related cards: match /blogs card style (white bg, black text) */
        .relatedCard {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          transform: translateY(0);
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }

        .relatedCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #bb0505;
        }

        .relatedCard:hover .relatedCardTitle {
          color: #bb0505;
        }

        .relatedImgWrap {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: relative;
        }

        .relatedImgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .relatedCard:hover .relatedImgWrap img {
          transform: translateY(-2px);
        }

        .relatedBody {
          padding: 1.25rem 1.15rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .relatedCardTitle {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #000000;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .relatedCardDesc {
          margin: 0;
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.7);
          line-height: 1.5;
          flex: 1;
        }

        .relatedReadMore {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          background: #bb0505;
          border: none;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.25);
        }

        .relatedReadMore:hover {
          background: #990000;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.35);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .postContainer {
            padding: 1rem 0.5rem;
          }

          .postLayout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .postHero {
            height: 250px;
          }

          .postTitle {
            font-size: clamp(1.5rem, 6vw, 2rem);
          }

          .newsHero {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .newsHero-featured-image {
            height: 300px;
          }

          .newsHero-title {
            font-size: 1.6rem;
          }

          .newsHero-description {
            font-size: 1rem;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
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

          .relatedImgWrap {
            height: 240px;
          }
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .postLayout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .relatedGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
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

        /* Large Mobile Responsive */
        @media (max-width: 640px) {
          .relatedGrid {
            grid-template-columns: 1fr;
            gap: 1rem;
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
    </>
  );
};

export default IndustryPostDetails;
