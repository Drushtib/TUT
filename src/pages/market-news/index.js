import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Link from "next/link";
import Image from "next/image";
import { MARKET_NEWS_ITEMS } from "../../data/marketNews";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/#market-news",
      permanent: false
    }
  };
}

const MarketNewsPage = () => {
  return (
    <>
      <HeaderOne />
      <div className="page">
        <div className="container">
          <h1 className="title">Market News</h1>

          <div className="grid">
            {MARKET_NEWS_ITEMS.map((item) => (
              <Link key={item.id} href={`/market-news/${item.id}`} className="card">
                <div className="imgWrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={540}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="body">
                  <h3 className="cardTitle">{item.title}</h3>
                  {item.description ? <p className="desc">{item.description}</p> : null}
                  <span className="read">Read More</span>
                </div>
              </Link>
            ))}
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
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .title {
          margin: 0 0 2rem;
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
          color: #000000;
          -webkit-text-fill-color: #000000;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2.25rem 1.75rem;
        }

        .card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.1);
          border-color: rgba(187, 5, 5, 0.35);
        }

        .imgWrap {
          width: 100%;
          height: 220px;
          background: rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        .body {
          padding: 1.25rem 1.15rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .cardTitle {
          margin: 0;
          font-weight: 800;
          font-size: 1.35rem;
          line-height: 1.35;
          color: #000000;
          -webkit-text-fill-color: #000000;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .desc {
          margin: 0;
          color: rgba(0, 0, 0, 0.82);
          -webkit-text-fill-color: rgba(0, 0, 0, 0.82);
          font-size: 1.1rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.6em;
        }

        .read {
          margin-top: auto;
          width: fit-content;
          padding: 0.75rem 1.05rem;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #000000;
          color: #000000;
          -webkit-text-fill-color: #000000;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
        }

        @media (max-width: 1200px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 992px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .title {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 576px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .title {
            font-size: 2rem;
          }

          .imgWrap {
            height: 240px;
          }
        }
      `}</style>
    </>
  );
};

export default MarketNewsPage;
