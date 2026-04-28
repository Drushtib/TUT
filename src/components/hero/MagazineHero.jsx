import React, { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { client } from "../../client";

import Loader from "../common/Loader";

import HeroBackgroundImage from "../../assest/bf9abef8-a5f5-4363-8751-61fae2f18c61.jpg";



const MagazineHero = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);



  // Fetch news from Sanity using useQuery for better caching

  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery({

    queryKey: ["news-hero"],

    queryFn: async () => {

      const newsQuery = `

        *[_type == "news"] | order(publishedAt desc)[0...10]{

          title,

          "slug": slug.current,

          publishedAt,

          description,

          "featureImg": mainImage.asset->url,

          altText

        }

      `;

      const news = await client.fetch(newsQuery);

      return news || [];

    },

    refetchOnWindowFocus: true,

    refetchOnMount: true,

    staleTime: 0

  });



  const newsItems = newsData || [];



  // Vertical carousel animation for right sidebar
  const [sidebarOffset, setSidebarOffset] = useState(0);

  useEffect(() => {
    setSidebarOffset(newsCarouselIndex);
  }, [newsCarouselIndex]);

  // Slide up animation without changing content
  useEffect(() => {
    const containers = document.querySelectorAll('.newsHero-sidebar-item-container');
    containers.forEach((container, index) => {
      container.style.animation = 'slideUpOnly 0.5s ease-out';
      setTimeout(() => {
        container.style.animation = 'none';
      }, 500);
    });
  }, [newsCarouselIndex]);

  // Auto-advance news carousel every 3 seconds

  useEffect(() => {

    if (newsItems.length === 0) return;

    const interval = setInterval(() => {

      setNewsCarouselIndex((prev) => (prev + 1) % newsItems.length);

    }, 3000);

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

        publishedAt,

        _createdAt

      }`;

      const data = await client.fetch(query);

      // Force newest magazine (Forest Richter) to be first

      const sortedData = data.sort((a, b) => {

        const dateA = new Date(a.publishedAt || a._createdAt);

        const dateB = new Date(b.publishedAt || b._createdAt);

        return dateB - dateA; // Newest first

      });

      return sortedData;

    },

    refetchOnWindowFocus: true,

    refetchOnMount: true,

    staleTime: 0

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

    }

  ];



  // Use Sanity data if available, otherwise use fallback

  const displayData = magazineData && magazineData.length > 0 ? magazineData : fallbackData;



  // Force newest magazine to be center when data loads

  useEffect(() => {

    if (displayData && displayData.length > 0) {

      setCurrentIndex(0); // Always start with newest magazine (index 0)

    }

  }, [displayData]);



  // Auto-advance carousel every 3 seconds - start from center (newest magazine)

  useEffect(() => {

    if (!displayData || displayData.length === 0) return;

    

    const interval = setInterval(() => {

      setIsTransitioning(true);

      setTimeout(() => {

        // Rotate through magazines, but keep newest (index 0) as primary center

        setCurrentIndex((prev) => {

          // Start with 0 (newest), then cycle through others

          const nextIndex = (prev + 1) % displayData.length;

          return nextIndex;

        });

        setIsTransitioning(false);

      }, 500);

    }, 5000);



    return () => clearInterval(interval);

  }, [displayData]);





  if (isLoading) return <Loader />;

  if (error) return <div>Error loading magazines</div>;



  const currentMagazine = displayData[currentIndex] || displayData[0];



  return (

    <>

      <style jsx global>{`

        .read-more-button,

        a.read-more-button {

          color: #ffffff !important;

        }

        .read-more-button *,

        .read-more-button span,

        a.read-more-button *,

        a.read-more-button span {

          color: #ffffff !important;

        }

        .editorial-padding-asymmetric .read-more-button,

        .editorial-padding-asymmetric a.read-more-button,

        .editorial-padding-asymmetric .read-more-button *,

        .editorial-padding-asymmetric .read-more-button span {

          color: #ffffff !important;

        }

      `}</style>



      {/* News Hero Section */}

      <div className="newsHero-container" style={{

        maxWidth: '1400px',

        margin: '0 auto',

        padding: '0',

        position: 'relative',

        background: '#f5f5f5'

      }}>

        <div className="newsHero">

          <div className="newsHero-left">

            {newsItems.length > 0 && (

              <Link href={`/news/${newsItems[newsCarouselIndex].slug}`} className="newsHero-featured">

                <div

                  className="newsHero-featured-image"

                  style={{

                    backgroundImage: `url(${newsItems[newsCarouselIndex].featureImg || "/images/placeholder.png"})`

                  }}

                >

                  <div className="newsHero-overlay">

                    <div className="newsHero-category">NEWS</div>

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

            )}

            {/* Slider Indicator */}

            {newsItems.length > 1 && (

              <div className="newsHero-slider-indicator">

                {newsItems.map((_, index) => (

                  <div

                    key={index}

                    className={`newsHero-segment ${index === newsCarouselIndex ? 'active' : ''}`}

                  />

                ))}

              </div>

            )}

          </div>

          <div className="newsHero-right">

            <div className="newsHero-sidebar-list" style={{overflow: 'hidden', height: '480px !important', position: 'relative'}}>

              {newsItems.slice(0, 4).map((news, index) => {

                const displayIndex = (index + newsCarouselIndex) % newsItems.length;

                const actualNews = newsItems[displayIndex];

                return (

                <div key={actualNews.slug || index} className="newsHero-sidebar-item-container" style={{

                  position: 'absolute',

                  top: `${index * 120}px`,

                  left: 0,

                  right: 0,

                  transition: 'top 0.5s ease-out',

                  opacity: 1,

                  visibility: 'visible'

                }}>

                  <Link href={`/news/${actualNews.slug}`} className="newsHero-sidebar-item">

                    <div className="newsHero-sidebar-text">

                      <div className="newsHero-article-category">ARTICLES</div>

                      <h4 className="newsHero-sidebar-item-title">{actualNews.title}</h4>

                      {actualNews.description && (

                        <p className="newsHero-sidebar-description">{actualNews.description}</p>

                      )}

                    </div>

                  </Link>

                </div>

              )})}

            </div>

          </div>

        </div>

      </div>



      <style jsx>{`

        .hero-background-container {

          opacity: 1 !important;

        }

        

        .editorial-padding-asymmetric {

          // background: #ffffff !important;

          // background-color: #ffffff !important;

          // opacity: 1 !important;

        }

        

        .editorial-padding-asymmetric * {

          opacity: 1 !important;

        }

        

        .editorial-padding-asymmetric h1,

        .editorial-padding-asymmetric h1 *,

        .editorial-padding-asymmetric h2,

        .editorial-padding-asymmetric h2 *,

        .editorial-padding-asymmetric p,

        .editorial-padding-asymmetric p *,

        .editorial-padding-asymmetric div,

        .editorial-padding-asymmetric div *,

        .editorial-padding-asymmetric a,

        .editorial-padding-asymmetric a *,

        .editorial-padding-asymmetric span,

        .editorial-padding-asymmetric span *,

        .editorial-padding-asymmetric > div,

        .editorial-padding-asymmetric > div > * {

          color: #ffffff !important;

        }

        

        .editorial-grid-60-40 .editorial-padding-asymmetric h1,

        .editorial-grid-60-40 .editorial-padding-asymmetric h2,

        .editorial-grid-60-40 .editorial-padding-asymmetric p,

        .editorial-grid-60-40 .editorial-padding-asymmetric div,

        .editorial-grid-60-40 .editorial-padding-asymmetric a {

          color: #ffffff !important;

        }

        

        .hero-title-white,

        .hero-title-white * {

          color: #ffffff !important;

          text-transform: none !important;

        }

        

        .hero-text-white,

        .hero-text-white * {

          color: #ffffff !important;

        }

        

        .editorial-padding-asymmetric .hero-title-white,

        .editorial-padding-asymmetric .hero-text-white {

          color: #ffffff !important;

        }

        

        .editorial-grid-60-40 .hero-title-white,

        .editorial-grid-60-40 .hero-text-white {

          color: #ffffff !important;

        }

        

        .read-more-button,

        a.read-more-button,

        .read-more-button span,

        a.read-more-button span,

        .read-more-button *,

        a.read-more-button * {

          color: #ffffff !important;

          background: #545454 !important;

          background-color: #545454 !important;

          border-color: #545454 !important;

        }

        

        .editorial-padding-asymmetric .read-more-button,

        .editorial-padding-asymmetric a.read-more-button,

        .editorial-padding-asymmetric .read-more-button *,

        .editorial-padding-asymmetric .read-more-button span,

        .editorial-padding-asymmetric a.read-more-button *,

        .editorial-padding-asymmetric a.read-more-button span {

          color: #ffffff !important;

        }

        

        .read-more-button:hover,

        a.read-more-button:hover {

          background: #545454 !important;

          background-color: #545454 !important;

          border-color: #545454 !important;

          color: #ffffff !important;

          transform: scale(1.05) translateY(-2px) !important;

          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4) !important;

        }

        .read-more-button:hover span,

        a.read-more-button:hover span,

        .read-more-button:hover *,

        a.read-more-button:hover * {

          color: #ffffff !important;

        }

        

        /* Force white text on all states */

        .read-more-button:active,

        .read-more-button:focus,

        .read-more-button:visited,

        a.read-more-button:active,

        a.read-more-button:focus,

        a.read-more-button:visited {

          color: #ffffff !important;

        }

        

        .read-more-button:active *,

        .read-more-button:focus *,

        .read-more-button:visited *,

        a.read-more-button:active *,

        a.read-more-button:focus *,

        a.read-more-button:visited * {

          color: #ffffff !important;

        }

        

        .carousel-container {

          position: relative;

          width: 100%;

          height: 100%;

          overflow: hidden;

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 0;

          padding: 0;

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

          transform: translateY(-50%);

        }



        .carousel-item.center {

          z-index: 10;

        }



        .carousel-item.side {

          z-index: 1;

        }



         .magazine-card {

           border-radius: 5px;

           overflow: hidden;

          //  background: #ffffff !important;

           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

           width: 300px;

           height: auto;

           margin: 0;

           padding: 0;

           border: none;

           outline: none;

           transition: all 0.3s ease;

           opacity: 1 !important;

         }

        

         .magazine-card:hover {

           transform: scale(1.2);

           box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);

         }

        

        .image-container {

          width: 100%;

          height: 100%;

          transition: transform 0.3s ease-in-out;

        }



        .image-container:hover {

          // transform: scale(1.05);

        }



        .magazine-card img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          border-radius: 10px;

          border: none;

          outline: none;

        }

        

        .magazine-card img {

          border: none !important;

        }

        

        .magazine-card * {

          outline: none !important;

        }



         @media (max-width: 1200px) {

           .editorial-grid-60-40 {

             grid-template-columns: 1fr;

             gap: 2rem;

           }

           

           .carousel-container {

             height: 440px;

             minHeight: 440px;

           }

         }



         @media (max-width: 768px) {

           .carousel-container {

             height: 380px;

             minHeight: 380px;

           }



           .magazine-card {

             width: 280px;

             height: 340px;

           }

         }



        .newsHero {

          display: grid;

          grid-template-columns: 7fr 3fr;

          gap: 0;

          padding: 0;

        }



        .newsHero-left {

          position: relative;

          padding: 0;

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

          height: 500px;

          background-size: cover;

          background-position: center;

          background-repeat: no-repeat;

          border-radius: 0;

          overflow: hidden;

          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.12);

          transition: transform 0.3s ease, box-shadow 0.3s ease;

          opacity: 0.9;

        }



        .newsHero-featured:hover .newsHero-featured-image {

          transform: translateY(-4px);

          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.18);

        }



        .newsHero-slider-indicator {

          position: absolute;

          bottom: 1rem;

          left: 50%;

          transform: translateX(-50%);

          display: flex;

          gap: 0.5rem;

          z-index: 10;

        }



        .newsHero-segment {

          width: 40px;

          height: 4px;

          background: rgba(255, 255, 255, 0.3);

          border-radius: 2px;

          transition: all 0.3s ease;

        }



        .newsHero-segment.active {

          background: #ffffff;

          width: 60px;

        }



        .newsHero-title {

          margin: 0 0 0.75rem 0;

          font-size: 2.5rem;

          font-weight: 700;

          line-height: 1.3;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-overlay {

          position: absolute;

          top: 0;

          bottom: 0;

          left: 0;

          right: 0;

          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);

          padding: 5rem 2rem 2rem 15rem;

          min-height: 200px;

          display: flex;

          flex-direction: column;

          justify-content: center;

          align-items: flex-start;

          text-align: left;

        }



        .newsHero-category {

          display: inline-block;

          background: #bb0505;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          padding: 0.5rem 1rem;

          border-radius: 20px;

          font-size: 1rem;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 1px;

          margin-bottom: 1rem;

        }



        .newsHero-title {

          margin: 0 0 0.75rem 0;

          font-size: 2.5rem;

          font-weight: 700;

          line-height: 1.3;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-description {

          margin: 0 0 0.75rem 0;

          font-size: 1.4rem;

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

          font-size: 1.1rem;

          color: rgba(255, 255, 255, 0.75) !important;

          -webkit-text-fill-color: rgba(255, 255, 255, 0.75) !important;

          font-weight: 400;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-right {

          display: flex;

          flex-direction: column;

          gap: 1rem;

          background: #F3F2EC;

          padding: 1rem;

        }



        .newsHero-sidebar-title {

          margin: 0 0 1rem 0;

          font-size: 1.5rem;

          font-weight: 700;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-sidebar-list {

          display: flex;

          flex-direction: column;

          gap: 1.5rem;

          height: 480px !important;

          min-height: 480px !important;

          max-height: 480px !important;

        }

        .newsHero-sidebar-item-container {
          margin-right: 1.5rem;
          display: block;

          padding: 0.75rem;

          border-top: 1px solid #888888;

          border-bottom: 1px solid #888888;

          border-left: 1px solid #888888;

          border-right: 1px solid #888888;

          border-top-left-radius: 50px;

          border-bottom-left-radius: 50px;

          border-top-right-radius: 16px;

          border-bottom-right-radius: 16px;

          transition: all 0.3s ease;

          margin-bottom: 0.5rem;

        }

        .newsHero-sidebar-item-container.animate-up {
          animation: slideUpGroup 0.5s ease-out;
        }

        


        .newsHero-sidebar-item {

          display: block;

          text-decoration: none;

        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(-20px);
          }
        }

        @keyframes slideUpGroup {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-50px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUpOnly {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-120px);
          }
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

        }



        .newsHero-sidebar-text {

          flex: 1;

          min-width: 0;

          padding-left: 1rem;

        }



        .newsHero-article-category {

          display: inline-block;

          

          color: #000000 !important;

          -webkit-text-fill-color: #000000 !important;

          padding: 0.3rem 0.75rem;

          border: 1px solid rgba(255, 255, 255, 0.2);

          border-radius: 20px;

          font-size: 0.85rem;

          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 0.5px;

          margin-bottom: 0.75rem;

        }



        .newsHero-sidebar-item-title {

          margin: 0 0 0.5rem 0;

          font-size: 1.4rem;

          font-weight: 700;

          color: #000000 !important;

          -webkit-text-fill-color: #000000 !important;

          line-height: 1.4;

          display: -webkit-box;

          -webkit-line-clamp: 1;

          -webkit-box-orient: vertical;

          overflow: hidden;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-sidebar-description {

          margin: 0;

          font-size: 1.1rem;

          color: #000000 !important;

          -webkit-text-fill-color: #000000 !important;

          line-height: 1.5;

          display: -webkit-box;

          -webkit-line-clamp: 1;

          -webkit-box-orient: vertical;

          overflow: hidden;

          font-family: 'Poppins', sans-serif;

          font-weight: 400;

        }



        .newsHero-sidebar-date {

          margin: 0;

          font-size: 0.85rem;

          color: rgba(0, 0, 0, 0.6) !important;

          -webkit-text-fill-color: rgba(0, 0, 0, 0.6) !important;

          font-weight: 400;

          font-family: 'Poppins', sans-serif;

        }



        .newsHero-sidebar-item:hover .newsHero-sidebar-item-title {

          color: #bb0505 !important;

          -webkit-text-fill-color: #bb0505 !important;

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

            font-size: 2.5rem;

          }



          .newsHero-description {

            font-size: 1.3rem;

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



          .newsHero-sidebar-image {

            width: 70px;

            height: 50px;

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



          .newsHero-sidebar-image {

            width: 60px;

            height: 45px;

          }



          .newsHero-sidebar-item-title {

            font-size: 0.85rem;

          }

        }

      `}</style>

    </>

  );

};



export default MagazineHero;

