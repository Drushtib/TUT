import React, { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { client } from "../../client";

import Loader from "../common/Loader";



const MagazineHero = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Fetch news from Sanity
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsQuery = `
          *[_type == "news"] | order(publishedAt desc)[0...10]{
            title,
            "slug": slug.current,
            publishedAt,
            description,
            category,
            "featureImg": mainImage.asset->url,
            altText
          }
        `;
        console.log('Fetching news with query:', newsQuery);
        const news = await client.fetch(newsQuery);
        console.log('News fetched:', news);
        setNewsItems(news || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  // Auto-advance news carousel every 3 seconds
  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setNewsCarouselIndex((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [newsItems]);

  // Auto-scroll right side news every 2 seconds
  useEffect(() => {
    if (newsItems.length <= 3) return;
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % (newsItems.length - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, [newsItems]);

  // Fetch real magazine data from Sanity

  const { data: magazineData, isLoading, error } = useQuery({

    queryKey: ["magazine-hero"],

    queryFn: async () => {

      const query = `*[_type == "magazine"] | order(publishedAt desc) [0...9] {

        title,

        slug,

        'featureImg': mainImage.asset->url,

        description,

        publishedAt

      }`;

      return await client.fetch(query);

    },

  });



  // Fallback static data if Sanity data is not available

  const fallbackData = [

    {

      id: 1,

      title: "Anchel Gupta",

      slug: { current: "anchel-gupta" },

      featureImg: "/images/magzine1_anchel.webp",

      description: "Featured Entrepreneur"

    },

    {

      id: 2,

      title: "Jorden",

      slug: { current: "jorden" },

      featureImg: "/images/magzine2_jorden.webp",

      description: "Business Leader"

    },

    {

      id: 3,

      title: "Manuel",

      slug: { current: "manuel" },

      featureImg: "/images/magzine3_manuel.webp",

      description: "Innovation Expert"

    },

    {

      id: 4,

      title: "Suzanne",

      slug: { current: "suzanne" },

      featureImg: "/images/magzine4_suzanne.webp",

      description: "Tech Pioneer"

    },

    {

      id: 5,

      title: "Nilmini",

      slug: { current: "nilmini" },

      featureImg: "/images/magzine5_nilmini.webp",

      description: "Startup Founder"

    },

    {

      id: 6,

      title: "Shabnam",

      slug: { current: "shabnam" },

      featureImg: "/images/magzine6_shabnam.webp",

      description: "Industry Leader"

    },

    {

      id: 7,

      title: "Valenia",

      slug: { current: "valenia" },

      featureImg: "/images/magzine7_valenia.webp",

      description: "Visionary CEO"

    },

    {

      id: 8,

      title: "Ross",

      slug: { current: "ross" },

      featureImg: "/images/magzine8_ross.webp",

      description: "Business Strategist"

    },

    {

      id: 9,

      title: "Khalid",

      slug: { current: "khalid" },

      featureImg: "/images/magzine9_khalid.webp",

      description: "Market Innovator"

    },

    {

      id: 10,

      title: "Media Kit Page 1",

      slug: { current: "media-kit-page-1" },

      featureImg: "/images/mediakitpage1.webp",

      description: "Media Kit"

    },

    {

      id: 11,

      title: "Media Kit Page 2",

      slug: { current: "media-kit-page-2" },

      featureImg: "/images/mediakitpage2.webp",

      description: "Media Kit"

    },

    {

      id: 12,

      title: "Media Kit Page 3",

      slug: { current: "media-kit-page-3" },

      featureImg: "/images/mediakitpage3.webp",

      description: "Media Kit"

    },

    {

      id: 13,

      title: "Media Kit Page 4",

      slug: { current: "media-kit-page-4" },

      featureImg: "/images/mediakitpage4.webp",

      description: "Media Kit"

    },

    {

      id: 14,

      title: "Media Kit Page 5",

      slug: { current: "media-kit-page-5" },

      featureImg: "/images/mediakitpage5.webp",

      description: "Media Kit"

    },

    {

      id: 15,

      title: "Media Kit Page 6",

      slug: { current: "media-kit-page-6" },

      featureImg: "/images/mediakitpage6.webp",

      description: "Media Kit"

    },

    {

      id: 16,

      title: "Media Kit Page 7",

      slug: { current: "media-kit-page-7" },

      featureImg: "/images/mediakitpage7.webp",

      description: "Media Kit"

    },

    {

      id: 17,

      title: "Media Kit Page 8",

      slug: { current: "media-kit-page-8" },

      featureImg: "/images/mediakitpage8.webp",

      description: "Media Kit"

    },

    {

      id: 18,

      title: "Media Kit Page 9",

      slug: { current: "media-kit-page-9" },

      featureImg: "/images/mediakitpage9.webp",

      description: "Media Kit"

    },

    {

      id: 19,

      title: "Media Kit Page 10",

      slug: { current: "media-kit-page-10" },

      featureImg: "/images/mediakitpage10.webp",

      description: "Media Kit"

    }

  ];



  // Use Sanity data if available, otherwise use fallback

  const displayData = magazineData && magazineData.length > 0 ? magazineData : fallbackData;



  // Auto-advance carousel every 3 seconds

  useEffect(() => {

    if (!displayData || displayData.length === 0) return;

    

    const interval = setInterval(() => {

      setIsTransitioning(true);

      setTimeout(() => {

        setCurrentIndex((prev) => (prev + 1) % displayData.length);

        setIsTransitioning(false);

      }, 300);

    }, 3000);



    return () => clearInterval(interval);

  }, [displayData]);





  if (isLoading) return <Loader />;

  if (error) return <div>Error loading magazines</div>;



  return (

    <>

      {/* News Hero Section */}
      <div className="newsHero-container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 2rem',
      }}>
        <div className="newsHero">
          <div className="newsHero-left">
            {newsItems.length > 0 ? (
              <Link href={`/news/${newsItems[newsCarouselIndex].slug}`} className="newsHero-featured">
                <div
                  className="newsHero-featured-image"
                  style={{
                    backgroundImage: `url(${newsItems[newsCarouselIndex].featureImg || "/images/placeholder.png"})`
                  }}
                >
                  <div className="newsHero-overlay">
                    <h2 className="newsHero-title">{newsItems[newsCarouselIndex].title}</h2>
                    {newsItems[newsCarouselIndex].description && (
                      <p className="newsHero-description">{newsItems[newsCarouselIndex].description}</p>
                    )}
                    {newsItems[newsCarouselIndex].publishedAt && (
                      <p className="newsHero-date">
                        {new Date(newsItems[newsCarouselIndex].publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="newsHero-placeholder" style={{
                width: '100%',
                height: '450px',
                background: '#f5f5f5',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>
                No news available - Add news in Sanity CMS
              </div>
            )}
            {/* Slider Dots */}
            {newsItems.length > 1 && (
              <div className="newsHero-slider-dots">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    className={`newsHero-dot ${index === newsCarouselIndex ? 'active' : ''}`}
                    onClick={() => setNewsCarouselIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="newsHero-right" style={{ backgroundColor: '#9b1c10', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 className="newsHero-sidebar-title">Latest Articles</h3>
            <div className="newsHero-sidebar-scroll">
              <div className="newsHero-sidebar-list" style={{
                transform: `translateY(-${scrollIndex * 110}px)`,
                transition: 'transform 0.5s ease'
              }}>
                {newsItems.length > 0 ? newsItems.map((news, index) => (
                  <Link key={news.slug || index} href={`/news/${news.slug}`} className="newsHero-sidebar-item">
                    <div className="newsHero-sidebar-content">
                      <div className="newsHero-sidebar-text">
                        <h4 className="newsHero-sidebar-item-title">{news.title}</h4>
                        {news.publishedAt && (
                          <p className="newsHero-sidebar-date">
                            {new Date(news.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )) : (
                  <p style={{ color: '#666', padding: '1rem' }}>No news items available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

        .carousel-container {

          position: relative;

          width: 100%;

          height: 100%;

          overflow: visible;

          display: flex;

          align-items: center;

          justify-content: center;

        }



        .carousel-track {

          position: relative;

          width: 100%;

          height: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

        }



        .carousel-item {

          position: absolute;

          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

          display: flex;

          align-items: center;

          justify-content: center;

          transform-origin: center center;

          top: 50%;

          bottom: 50%;

          transform: translateY(-50%);

        }



        .carousel-item.center {

          z-index: 10;

        }



        .carousel-item.side {

          z-index: 1;

        }



        .magazine-card {

          border-radius: 0.5rem;

          overflow: hidden;

          background: transparent;

          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

          width: 280px;

          height: 380px;

          margin: 0;

          padding: 0;

          border: none;

          outline: none;

          transition: all 0.3s ease;

        }

        

        .magazine-card:hover {

          transform: scale(1.05);

          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);

        }

        

        .image-container {

          width: 100%;

          height: 100%;

          transition: transform 0.3s ease-in-out;

        }



        .image-container:hover {

          transform: scale(1.05);

        }



        .magazine-card img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          border-radius: 0.5rem;

          border: none;

          outline: none;

        }

        

        .magazine-card * {

          border: none !important;

          outline: none !important;

        }

        .newsHero {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .newsHero-left {
          width: 100%;
        }

        .newsHero-featured {
          display: block;
          text-decoration: none;
          width: 100%;
          height: 100%;
        }

        .newsHero-featured-image {
          position: relative;
          width: 100%;
          height: 450px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .newsHero-featured:hover .newsHero-featured-image {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.18);
        }

        .newsHero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 40, 0.7) 50%, transparent 100%);
          padding: 2rem;
          color: #ffffff;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .newsHero-category-badge {
          display: inline-block;
          background: rgba(187, 5, 5, 0.9);
          color: #ffffff;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.3);
        }

        .newsHero-slider-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .newsHero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsHero-dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .newsHero-dot.active {
          background: #bb0505;
          width: 36px;
          border-radius: 6px;
        }

        .newsHero-title {
          margin: 0 0 0.75rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.3;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
        }

        .newsHero-title:hover {
          text-decoration: underline;
        }

        .newsHero-description {
          margin: 0 0 0.75rem 0;
          font-size: 1.1rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.9) !important;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Lora', serif;
        }

        .newsHero-date {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.75) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.75) !important;
          font-weight: 400;
          font-family: 'Poppins', sans-serif;
        }

        .newsHero-right,
        .newsHero .newsHero-right,
        div.newsHero-right {
          display: flex !important;
          flex-direction: column !important;
          gap: 1rem !important;
          background: #9b1c10 !important;
          border-radius: 16px !important;
          padding: 1.5rem !important;
        }

        .newsHero-sidebar-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-family: 'Poppins', sans-serif;
        }

        .newsHero-sidebar-scroll {
          height: 330px;
          overflow: hidden;
        }

        .newsHero-sidebar-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsHero-sidebar-item {
          display: block;
          text-decoration: none;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .newsHero-sidebar-item:hover {
          border-color: #bb0505;
          background: rgba(187, 5, 5, 0.1);
          transform: translateX(-4px);
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.2);
        }

        .newsHero-sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .newsHero-sidebar-text {
          flex: 1;
          min-width: 0;
        }

        .newsHero-sidebar-category {
          display: inline-block;
          background: rgba(187, 5, 5, 0.8);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .newsHero-sidebar-item-title {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .newsHero-sidebar-date {
          margin: 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 400;
          font-family: 'Poppins', sans-serif;
        }

        .newsHero-sidebar-item:hover .newsHero-sidebar-item-title {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        .newsHero-view-all {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #bb0505;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          text-align: center;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .newsHero-view-all:hover {
          background: #990000;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.3);
        }

        @media (max-width: 991px) {
          .newsHero {
            grid-template-columns: 1fr;
          }

          .newsHero-featured-image {
            height: 350px;
          }

          .newsHero-title {
            font-size: 1.6rem;
          }

          .newsHero-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .newsHero {
            gap: 1rem;
          }

          .newsHero-featured-image {
            height: 300px;
          }

          .newsHero-title {
            font-size: 1.4rem;
          }

          .newsHero-sidebar-title {
            font-size: 1.3rem;
          }

          .newsHero-sidebar-item-title {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 576px) {
          .newsHero-featured-image {
            height: 250px;
          }

          .newsHero-overlay {
            padding: 1.5rem;
          }

          .newsHero-title {
            font-size: 1.2rem;
          }

          .newsHero-description {
            font-size: 0.95rem;
          }

          .newsHero-category-badge {
            font-size: 0.75rem;
            padding: 0.3rem 0.75rem;
          }

          .newsHero-sidebar-item-title {
            font-size: 0.85rem;
          }

          .newsHero-slider-dots {
            bottom: 1.5rem;
          }

          .newsHero-dot {
            width: 10px;
            height: 10px;
          }

          .newsHero-dot.active {
            width: 30px;
          }
        }
      `}</style>

    </>

  );

};



export default MagazineHero;

