import React, { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { client } from "../../client";

import Loader from "../common/Loader";



const MagazineHero = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(false);

  

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

      <div style={{ width: "100%", height: "80vh", background: "linear-gradient(180deg, #000, #111 50%, #000)", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Custom Carousel */}

        <div className="carousel-container">

          <div className="carousel-track">

            {displayData.map((magazine, index) => {

              const isCenter = index === currentIndex;

              const relativePosition = index - currentIndex;

              

              // Calculate position for 19-card layout: 9 left + 1 center + 9 right

              let position = relativePosition;

              if (position > 9) position = position - displayData.length; // Wrap around for circular effect

              if (position < -9) position = position + displayData.length;

              

              // Only show cards within the 19-card range

              if (Math.abs(position) > 9) return null;

              

              // Create horizontal row with progressive scaling - no rotation, cards stay upright

              const offset = position * 120; // Reduced horizontal spacing for more cards

              const scale = isCenter ? 1.0 : Math.max(0.1, 1.0 - Math.abs(position) * 0.1); // Progressive scaling: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%

              const opacity = isCenter ? 1.0 : Math.max(0.1, 1.0 - Math.abs(position) * 0.1); // Progressive opacity: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%

              

              return (

                <div

                  key={`${magazine.slug?.current || magazine.slug}-${index}`}

                  className={`carousel-item ${isCenter ? 'center' : 'side'}`}

                  style={{

                    left: `calc(50% + ${offset}px)`,

                    transform: `translateX(-50%) translateY(-50%) scale(${scale})`,

                    opacity: opacity,

                    zIndex: isCenter ? 10 : Math.max(1, 10 - Math.abs(position)),

                  }}

                >

                  <div className="magazine-card">

                    {magazine.title.includes("Media Kit") ? (
                      
                      <div className="image-container">
                        <Image
                          src={magazine.featureImg || magazine.image}
                          alt={magazine.title}
                          width={1000}
                          height={1000}
                          className="img-fluid"
                        />
                      </div>

                    ) : (

                      <Link href={`/magazine/${magazine.slug?.current || magazine.slug}`}>

                        <div className="image-container">

                          <Image

                            src={magazine.featureImg || magazine.image}

                            alt={magazine.title}

                            width={1000}

                            height={1000}

                            className="img-fluid"

                          />

                        </div>

                      </Link>

                    )}

                  </div>

                </div>

              );

            })}

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

      `}</style>

    </>

  );

};



export default MagazineHero;

