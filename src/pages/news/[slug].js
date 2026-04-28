import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Image from "next/image";
import Loader from "../../components/common/Loader";
import { PortableText } from "@portabletext/react";

const NewsDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: newsData, isLoading, error } = useQuery({
    queryKey: ["news-detail", slug],
    queryFn: async () => {
      if (!slug) return null;
      const query = `
        *[_type == "news" && slug.current == "${slug}"][0]{
          title,
          "slug": slug.current,
          publishedAt,
          description,
          "featureImg": mainImage.asset->url,
          altText,
          content,
          body,
          author
        }
      `;
      const news = await client.fetch(query);
      return news;
    },
    enabled: !!slug,
  });

  // Fetch related posts
  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts-10", slug],
    queryFn: async () => {
      if (!slug) return [];
      const query = `
        *[_type == "news" && slug.current != "${slug}"] | order(publishedAt desc)[0...10]{
          title,
          "slug": slug.current,
          publishedAt,
          description,
          "featureImg": mainImage.asset->url,
          altText
        }
      `;
      const posts = await client.fetch(query);
      return posts || [];
    },
    enabled: !!slug,
  });

  // Fetch all news for navigation
  const { data: allNews } = useQuery({
    queryKey: ["all-news"],
    queryFn: async () => {
      const query = `
        *[_type == "news"] | order(publishedAt desc){
          title,
          "slug": slug.current,
          publishedAt
        }
      `;
      const news = await client.fetch(query);
      return news || [];
    },
  });

  // Find current news index and get previous/next
  const getCurrentIndex = () => {
    if (!allNews || !slug) return -1;
    return allNews.findIndex(news => news.slug === slug);
  };

  const currentIndex = getCurrentIndex();
  const previousNews = currentIndex > 0 && allNews ? allNews[currentIndex - 1] : null;
  const nextNews = currentIndex < (allNews?.length || 0) - 1 && allNews ? allNews[currentIndex + 1] : null;

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading news</div>;
  if (!newsData) {
    return (
      <>
        <HeaderOne />
        <div className="page">
          <div className="container">
            <div className="notFound">
              <h1 className="title">News</h1>
              <p className="meta">News not found.</p>
            </div>
          </div>
        </div>
        <FooterTwo />
        <style jsx>{`
          .page {
            width: 100%;
            background: #ffffff;
            color: #111111;
            padding: 2.5rem 0 3.5rem;
            min-height: 100vh;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .notFound {
            text-align: center;
            padding: 3rem 0;
          }
          .title {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 800;
            color: #000000;
            -webkit-text-fill-color: #000000;
          }
          .meta {
            margin-top: 0.75rem;
            color: rgba(0, 0, 0, 0.72);
            -webkit-text-fill-color: rgba(0, 0, 0, 0.72);
            font-size: 1.05rem;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <HeaderOne />
      <div className="page">
        <div className="container">
          <div className="newsLayout">
            {/* Left Side - Main Content */}
            <div className="mainContent">
              <div className="header">
                <h1 className="title">{newsData.title}</h1>
                {newsData.author && (
                  <div className="meta">
                    By {newsData.author}
                  </div>
                )}
              </div>

              {newsData.featureImg && (
                <div className="hero">
                  <Image
                    src={newsData.featureImg}
                    alt={newsData.altText || newsData.title}
                    width={1600}
                    height={900}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              <article className="body">
                {newsData.content ? (
                  <div
                    className="contentHtml"
                    dangerouslySetInnerHTML={{ __html: newsData.content }}
                  />
                ) : newsData.body && Array.isArray(newsData.body) ? (
                  <PortableText
                    value={newsData.body}
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
                  <p className="p">{newsData.description}</p>
                )}
              </article>

              {/* Previous/Next Navigation */}
              <div className="navigation">
                {previousNews && (
                  <Link href={`/news/${previousNews.slug}`} className="navLink prev">
                    <span className="navLabel">← Previous</span>
                    <span className="navTitle">{previousNews.title}</span>
                  </Link>
                )}
                {nextNews && (
                  <Link href={`/news/${nextNews.slug}`} className="navLink next">
                    <span className="navLabel">Next →</span>
                    <span className="navTitle">{nextNews.title}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Side - Related Posts */}
            <div className="sidebar">
              <h3 className="relatedTitle">Related Posts</h3>
              {relatedPosts && relatedPosts.length > 0 ? (
                <ul className="relatedList">
                  {relatedPosts.map((post) => (
                    <li key={post.slug} className="relatedItem">
                      <Link href={`/news/${post.slug}`}>
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

        .relatedTitle {
          margin: 0 0 1rem 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: #111f35;
          -webkit-text-fill-color: 111f35;
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

        @media (max-width: 992px) {
          .hero {
            height: 360px;
          }
        }

        @media (max-width: 992px) {
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
      `}</style>
    </>
  );
};

export default NewsDetail;
