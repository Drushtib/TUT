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

  const currentMagazine = displayData[currentIndex] || displayData[0];

  return (
    <>
      <div className="editorial-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="editorial-grid-60-40" style={{ width: "100%", alignItems: "center" }}>
          {/* Typography-Focused Left Side */}
          <div className="editorial-padding-asymmetric" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ 
              marginBottom: "1.5rem", 
              color: "var(--primary-color)", 
              opacity: 1, 
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              FEATURED MAGAZINE
            </div>
            
            <Link href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <h1 style={{ 
                marginBottom: "1rem", 
                cursor: "pointer", 
                opacity: 1, 
                color: "var(--text)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em"
              }}>
                {currentMagazine.title?.toUpperCase() || currentMagazine.title}
              </h1>
            </Link>
            
            {/* Red-orange accent line separator */}
            <div style={{
              width: "80px",
              height: "3px",
              background: "var(--primary-color)",
              marginBottom: "2rem"
            }}></div>
            
            {currentMagazine.description && (
              <p style={{ 
                fontSize: "1.125rem", 
                marginBottom: "2.5rem", 
                opacity: 1, 
                color: "var(--text)",
                fontWeight: 400,
                lineHeight: "1.6"
              }}>
                {currentMagazine.description}
              </p>
            )}
            
            <Link 
              href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`}
              style={{
                background: "var(--primary-color)",
                color: "var(--text-dark)",
                padding: "1rem 2.5rem",
                borderRadius: "0",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "0.875rem",
                transition: "all 0.3s ease",
                border: "2px solid var(--primary-color)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--primary-color)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary-color)";
                e.currentTarget.style.color = "var(--text-dark)";
              }}
            >
              READ MORE
            </Link>
          </div>

          {/* Magazine Carousel Right Side */}
          <div className="carousel-container" style={{ position: "relative", height: "600px" }}>
            <div className="carousel-track">
              {displayData.map((magazine, index) => {
                const isCenter = index === currentIndex;
                const relativePosition = index - currentIndex;
                
                // Calculate position for 9-card layout: 4 left + 1 center + 4 right
                let position = relativePosition;
                if (position > 4) position = position - displayData.length;
                if (position < -4) position = position + displayData.length;
                
                // Only show cards within the 9-card range
                if (Math.abs(position) > 4) return null;
                
                // Create horizontal row with progressive scaling
                const offset = position * 150;
                const scale = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2);
                const opacity = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2);
                
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
            
            {/* Navigation Dots */}
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 20
            }}>
              {displayData.slice(0, Math.min(5, displayData.length)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: currentIndex === index ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: currentIndex === index ? "var(--primary-color)" : "rgba(255, 255, 255, 0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Separator Line Below Hero */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'var(--primary-color)',
        marginTop: '3rem'
      }}></div>
      
      {/* Featured Magazine Title Below Separator */}
      <div style={{
        marginTop: '1.5rem',
        textAlign: 'left'
      }}>
        <Link 
          href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`}
          style={{
            textDecoration: 'none',
            color: 'var(--text)',
            fontSize: '1.25rem',
            fontWeight: 600,
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text)';
          }}
        >
          {currentMagazine.title} - {currentMagazine.description || 'Featured Story'}
        </Link>
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
          transform: translateY(-50%);
        }

        .carousel-item.center {
          z-index: 10;
        }

        .carousel-item.side {
          z-index: 1;
        }

        .magazine-card {
          border-radius: 10px;
          overflow: hidden;
          background: transparent;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          width: 280px;
          height: 380px;
          margin: 0;
          padding: 0;
          border: 3px solid var(--primary-color);
          outline: none;
          transition: all 0.3s ease;
        }
        
        .magazine-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(187, 5, 5, 0.4);
          border-color: var(--primary-color);
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
            gap: 3rem;
          }
          
          .carousel-container {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .carousel-container {
            height: 400px;
          }
          
          .magazine-card {
            width: 220px;
            height: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default MagazineHero;
