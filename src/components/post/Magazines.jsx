import SectionTitle from "../elements/SectionTitle";
import { useMagazines } from "../../hooks/useMagazines";
import Loader from "../common/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import PostLayoutformag_Home from "./layout/PostLayoutformag_Home";
import { QUERY_LIMITS } from "../../config/constants";
import { ROUTES } from "../../config/routes";
import ErrorFallback from "../common/ErrorFallback";

const Magazines = () => {
  const { data, isLoading, error } = useMagazines(QUERY_LIMITS.LATEST_MAGAZINES);

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;

  if (!data || data.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        .magazines-header-wrapper {
          position: relative !important;
          margin-bottom: 0.5rem !important;
        }
        
        .magazines-header-wrapper h2 {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .magazines-grid-wrapper {
          margin-top: -0.5rem !important;
          padding-top: 0 !important;
        }
        
        .magazines-grid-wrapper .splide {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        .magazines-grid-wrapper .splide__track {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        .magazines-grid-wrapper .splide__list {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        
        .grid-wrapper .content-block {
          margin-top: 0 !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .grid-wrapper .splide__slide {
          height: auto !important;
        }
        
        .grid-wrapper .splide__slide > div {
          height: 100% !important;
        }
        
        .grid-wrapper .content-block > a {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block {
          overflow: visible !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block > a {
          overflow: visible !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container,
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div {
          border: none !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
          margin: 2rem !important;
          overflow: visible !important;
          height: 520px !important;
          min-height: 520px !important;
          max-height: 520px !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 10px !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image-wrapper,
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image-wrapper {
          flex: 0 0 auto !important;
          min-height: 400px !important;
          max-height: 400px !important;
          height: 400px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 8px !important;
          overflow: visible !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div .caption-content,
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .caption-content {
          flex: 0 0 auto !important;
          min-height: auto !important;
          height: auto !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div .caption-content h4,
        .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .caption-content h4 {
          margin-top: 0.5rem !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        .grid-wrapper .content-block > a > div:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
          transform: translateY(-4px) !important;
        }
        
        .grid-wrapper .content-block > a > div .magazine-image-wrapper {
          overflow: visible !important;
        }
        
        .grid-wrapper .content-block > a > div:hover .magazine-image-wrapper {
          overflow: visible !important;
        }
        
        .grid-wrapper .content-block > a > div .magazine-image {
          border: none !important;
          object-fit: contain !important;
          transition: transform 0.3s ease !important;
        }
        
        .grid-wrapper .content-block > a > div:hover .magazine-image {
          transform: scale(1.05) !important;
        }
        
        .grid-wrapper .content-block .magazine-title,
        .grid-wrapper .content-block h4 {
          font-size: 1.6rem !important;
          font-weight: 600 !important;
          line-height: 1.5 !important;
        }
        
        .grid-wrapper .content-block .caption-content {
          font-size: 1.6rem !important;
        }
        
        .grid-wrapper .content-block .caption-content a {
          font-size: 1.6rem !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .magazine-title a,
        .magazines-grid-wrapper .grid-wrapper .content-block .caption-content a,
        .magazines-grid-wrapper .grid-wrapper .content-block h4 a,
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line a,
        .grid-wrapper .content-block .magazine-title a,
        .grid-wrapper .content-block .caption-content a,
        .grid-wrapper .content-block h4 a,
        .grid-wrapper .content-block .hover-line a {
          text-decoration: none !important;
          transition: color 0.3s ease !important;
          background-image: none !important;
          background-size: 0 !important;
          padding: 0 !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .magazine-title a:hover,
        .magazines-grid-wrapper .grid-wrapper .content-block .caption-content a:hover,
        .magazines-grid-wrapper .grid-wrapper .content-block h4 a:hover,
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line a:hover,
        .grid-wrapper .content-block .magazine-title a:hover,
        .grid-wrapper .content-block .caption-content a:hover,
        .grid-wrapper .content-block h4 a:hover,
        .grid-wrapper .content-block .hover-line a:hover {
          color: #545454 !important;
          text-decoration: none !important;
          background-image: none !important;
          background-size: 0 !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line,
        .grid-wrapper .content-block .hover-line {
          position: relative !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line::after,
        .grid-wrapper .content-block .hover-line::after {
          display: none !important;
          content: none !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line:hover,
        .grid-wrapper .content-block .hover-line:hover {
          text-decoration: none !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line:hover::after,
        .grid-wrapper .content-block .hover-line:hover::after {
          display: none !important;
          content: none !important;
        }
        
        .magazines-grid-wrapper .grid-wrapper .content-block .hover-line a::after,
        .grid-wrapper .content-block .hover-line a::after {
          display: none !important;
          content: none !important;
        }
        
        .magazines-grid-wrapper .splide__pagination {
          bottom: -2rem !important;
        }
        
        .magazines-grid-wrapper .splide__pagination__page {
          background: #d3d3d3 !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          margin: 0 4px !important;
        }
        
        .magazines-grid-wrapper .splide__pagination__page.is-active {
          background: #545454 !important;
          transform: scale(1.2) !important;
        }
        
        .magazines-grid-wrapper .splide__pagination__page:hover {
          background: #545454 !important;
          opacity: 0.8 !important;
        }
        
        /* Tablet View (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .magazines-header-wrapper h2 {
            font-size: clamp(1.75rem, 3.5vw, 2.5rem) !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div {
            margin: 1.5rem !important;
            height: 480px !important;
            min-height: 480px !important;
            max-height: 480px !important;
            padding: 8px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image-wrapper,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image-wrapper {
            min-height: 360px !important;
            max-height: 360px !important;
            height: 360px !important;
            padding: 8px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image {
            max-height: 340px !important;
          }
          
          .grid-wrapper .content-block .magazine-title,
          .grid-wrapper .content-block h4 {
            font-size: 1.4rem !important;
          }
          
          .grid-wrapper .content-block .caption-content,
          .grid-wrapper .content-block .caption-content a {
            font-size: 1.4rem !important;
          }
        }
        
        /* Mobile View (up to 768px) */
        @media (max-width: 768px) {
          .magazines-header-wrapper {
            margin-bottom: 1rem !important;
          }
          
          .magazines-header-wrapper h2 {
            font-size: clamp(1.5rem, 5vw, 2rem) !important;
            letter-spacing: 0.5px !important;
          }
          
          .magazines-grid-wrapper {
            margin-top: 0 !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div {
            margin: 1rem 0.5rem !important;
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            padding: 8px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image-wrapper,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image-wrapper {
            min-height: 280px !important;
            max-height: 280px !important;
            height: 280px !important;
            padding: 5px !important;
            margin-bottom: 6px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image {
            max-height: 270px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .caption-content h4,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .caption-content h4 {
            margin-top: 0.5rem !important;
          }
          
          .grid-wrapper .content-block .magazine-title,
          .grid-wrapper .content-block h4 {
            font-size: 1.2rem !important;
            line-height: 1.4 !important;
          }
          
          .grid-wrapper .content-block .caption-content,
          .grid-wrapper .content-block .caption-content a {
            font-size: 1.2rem !important;
          }
          
          .magazines-grid-wrapper .splide__pagination {
            bottom: -1.5rem !important;
          }
          
          .magazines-grid-wrapper .splide__pagination__page {
            width: 10px !important;
            height: 10px !important;
            margin: 0 3px !important;
          }
        }
        
        /* Small Mobile View (up to 480px) */
        @media (max-width: 480px) {
          .magazines-container {
            padding: 0 1rem !important;
          }
          
          .magazines-header-wrapper h2 {
            font-size: clamp(1.25rem, 6vw, 1.75rem) !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div {
            margin: 0.75rem 0.25rem !important;
            padding: 6px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image-wrapper,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image-wrapper {
            min-height: 240px !important;
            max-height: 240px !important;
            height: 240px !important;
            padding: 4px !important;
          }
          
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div .magazine-image,
          .magazines-grid-wrapper .grid-wrapper .content-block > a > div.magazine-card-container .magazine-image {
            max-height: 230px !important;
          }
          
          .grid-wrapper .content-block .magazine-title,
          .grid-wrapper .content-block h4 {
            font-size: 1.1rem !important;
          }
          
          .grid-wrapper .content-block .caption-content,
          .grid-wrapper .content-block .caption-content a {
            font-size: 1.1rem !important;
          }
          
          .magazines-grid-wrapper .splide__pagination__page {
            width: 8px !important;
            height: 8px !important;
            margin: 0 2px !important;
          }
        }
        
        /* Tablet - Adjust container padding */
        @media (max-width: 1024px) and (min-width: 769px) {
          .magazines-container {
            padding: 0 1.5rem !important;
          }
        }
        
        /* Mobile - Adjust container padding */
        @media (max-width: 768px) {
          .magazines-container {
            padding: 0 1rem !important;
          }
        }
      `}</style>
      <div style={{ background: '#ffffff' }}>
        <div className="magazines-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="magazines-header-wrapper" style={{ position: "relative", marginBottom: "0.5rem" }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#171717',
              margin: 0,
              padding: 0,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Latest MAGAZINES
            </h2>
          </div>
          <div className="grid-wrapper magazines-grid-wrapper" style={{ marginTop: "-0.5rem" }}>
          <Splide
            aria-label="Latest Magazines"
            options={{
              type: "loop",
              arrows: false,
              breakpoints: {
                2000: {
                  perPage: 3,
                },
                1200: {
                  perPage: 3,
                },
                900: {
                  perPage: 2,
                },
                480: {
                  perPage: 1,
                },
              },
              autoplay: true,
              interval: 3000,
            }}
          >
            {data.map((post, index) => (
              <SplideSlide key={index}>
                <PostLayoutformag_Home data={post} />
              </SplideSlide>
            ))}
          </Splide>
          </div>
        </div>
      </div>
    </>
  );
};

export default Magazines;
