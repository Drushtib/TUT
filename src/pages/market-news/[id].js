import { useRouter } from "next/router";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Image from "next/image";
import { MARKET_NEWS_ITEMS } from "../../data/marketNews";

const MarketNewsDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const item = MARKET_NEWS_ITEMS.find((x) => x.id === String(id));

  return (
    <>
      <HeaderOne />
      <div className="page">
        <div className="container">
          {!item ? (
            <div className="notFound">
              <h1 className="title">Market News</h1>
              <p className="meta">News not found.</p>
             
            </div>
          ) : (
            <>
              <div className="header">
                <h1 className="title">{item.title}</h1>
                <div className="meta">
                  Updated: {item.updated} | By {item.author}
                </div>
              </div>

              <div className="hero">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1600}
                  height={900}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <article className="body">
                {item.contentHtml ? (
                  <div
                    className="contentHtml"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                  />
                ) : (
                  String(item.content || "")
                    .split("\n\n")
                    .filter(Boolean)
                    .map((block, idx) => (
                      <p key={idx} className="p">
                        {block}
                      </p>
                    ))
                )}
              </article>
            </>
          )}
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

        .header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .title {
          margin: 0;
          font-size: clamp(2rem, 3.2vw, 3.2rem);
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

        .hero {
          margin: 1.25rem 0 1.75rem;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
          height: 420px;
          background: #f2f2f2;
        }

        .body {
          font-size: 1.12rem;
          line-height: 1.9;
        }

        .p {
          margin: 0 0 0.35rem 0;
          color: #111111;
          -webkit-text-fill-color: #111111;
          white-space: pre-wrap;
        }

        .contentHtml :global(h2) {
          margin: 1.1rem 0 0.75rem;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1.25;
        }

        .contentHtml :global(p) {
          margin: 0 0 0.75rem;
          color: #111111;
          -webkit-text-fill-color: #111111;
        }

        .contentHtml :global(ul),
        .contentHtml :global(ol) {
          margin: 0.75rem 0 1rem;
          padding-left: 2.25rem;
          color: #111111;
          -webkit-text-fill-color: #111111;
        }

        .contentHtml :global(li) {
          margin: 0.35rem 0;
          font-size: 1.5rem;
          line-height: 1.6;
          
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

        .notFound {
          text-align: center;
          padding: 3rem 0;
        }

        @media (max-width: 992px) {
          .hero {
            height: 360px;
          }
        }

        @media (max-width: 576px) {
          .hero {
            height: 260px;
          }

          .body {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </>
  );
};

export default MarketNewsDetail;
