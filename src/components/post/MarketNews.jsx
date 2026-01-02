import Image from "next/image";
import Link from "next/link";
import { MARKET_NEWS_ITEMS } from "../../data/marketNews";

const MarketNews = () => {
  const newsItems = MARKET_NEWS_ITEMS;

  const leftColumnItems = newsItems.slice(0, 8);
  const rightColumnItems = newsItems.slice(8, 16);

  return (
    <>
      <style jsx>{`
        .market-news-section {
          width: 100%;
          animation: fadeIn 0.8s ease-out;
        }

        .market-news-heading {
          font-size: 3rem;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 2.5rem 0;
          padding-bottom: 1rem;
          text-align: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .market-news-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .news-column {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .news-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #e0e0e0;
          transition: transform 0.3s ease;
        }

        .news-card:last-child {
          border-bottom: none;
        }

        .news-card:hover {
          transform: translateX(5px);
        }

        .news-image-wrapper {
          position: relative;
          width: 200px;
          height: 150px;
          flex-shrink: 0;
          overflow: hidden;
          background: #f5f5f5;
        }

        .news-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-image-wrapper img {
          transform: scale(1.1);
        }

        .category-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #000000;
          color: #ffffff;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .news-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .news-title-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .play-icon {
          width: 20px;
          height: 20px;
          background: #000000;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .play-icon::before {
          content: '';
          width: 0;
          height: 0;
          border-left: 6px solid #ffffff;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          margin-left: 2px;
        }

        .news-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
          line-height: 1.4;
          flex: 1;
        }

        .news-title a {
          color: #000000;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .news-title a:hover {
          color: #393939 !important;
        }

        .news-meta {
          font-size: 1.15rem;
          color: #666666;
          margin-bottom: 0.75rem;
        }

        .news-description {
          font-size: 1.35rem;
          color: #666666;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .market-news-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .news-column {
            gap: 0;
          }

          .news-card {
            padding: 1.25rem 0;
          }
        }

        @media (max-width: 768px) {
          .news-card {
            flex-direction: column;
            gap: 1rem;
          }

          .news-image-wrapper {
            width: 100%;
            height: 200px;
          }

          .news-title {
            font-size: 1.5rem;
          }

          .news-meta {
            font-size: 1.1rem;
          }

          .news-description {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .news-card {
            padding: 1rem 0;
          }

          .news-image-wrapper {
            height: 180px;
          }

          .market-news-heading {
            font-size: 2rem;
          }

          .news-title {
            font-size: 1.4rem;
          }

          .news-meta {
            font-size: 1.05rem;
          }

          .news-description {
            font-size: 1.15rem;
          }
        }
      `}</style>

      <div id="market-news" className="market-news-section">
        <h2 className="market-news-heading">Market News</h2>
        <div className="market-news-layout">
          {/* Left Column */}
          <div className="news-column">
            {leftColumnItems.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-image-wrapper">
                  <Link href={`/market-news/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="news-content">
                  <div className="news-title-wrapper">
                    <div className="play-icon"></div>
                    <h3 className="news-title">
                      <Link href={`/market-news/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="news-meta">
                    Updated: {item.updated} | By {item.author}
                  </div>
                  {item.description && (
                    <p className="news-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="news-column">
            {rightColumnItems.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-image-wrapper">
                  <Link href={`/market-news/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="news-content">
                  <div className="news-title-wrapper">
                    <div className="play-icon"></div>
                    <h3 className="news-title">
                      <Link href={`/market-news/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="news-meta">
                    Updated: {item.updated} | By {item.author}
                  </div>
                  {item.description && (
                    <p className="news-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketNews;
