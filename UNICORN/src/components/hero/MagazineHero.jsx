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
              
              // Calculate position for 9-card layout: 4 left + 1 center + 4 right
              let position = relativePosition;
              if (position > 4) position = position - displayData.length; // Wrap around for circular effect
              if (position < -4) position = position + displayData.length;
              
              // Only show cards within the 9-card range
              if (Math.abs(position) > 4) return null;
              
              // Create horizontal row with progressive scaling - no rotation, cards stay upright
              const offset = position * 150; // Horizontal spacing between cards
              const scale = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2); // Progressive scaling: 100%, 80%, 60%, 40%, 20%
              const opacity = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2); // Progressive opacity: 100%, 80%, 60%, 40%, 20%
              
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
