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
      <div className="hero-background-container" style={{ 
        width: "100%", 
        padding: '0', 
        margin: '0',
        position: "relative", 
        zIndex: 1, 
        backgroundImage: `url(/assest/bf9abef8-a5f5-4363-8751-61fae2f18c61.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        opacity: 1
      }}>
        {/* Background overlay for opacity */}
        {/* <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 252, 252, 0.3)',
          zIndex: 1
        }}></div> */}
        <div className="editorial-grid-60-40" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 0 0 4rem', width: "100%", alignItems: "stretch", gap: '0rem', gridTemplateColumns: '1fr 1.5fr', position: 'relative', zIndex: 2 }}>
          {/* Typography-Focused Left Side - Separate Block */}
          <div className="editorial-padding-asymmetric" style={{
            position: "relative", 
            zIndex: 1,
            background: 'transparent',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0',
            padding: '2rem 0rem',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            isolation: 'isolate'
          }}>
            <div className="hero-text-white" style={{ 
              marginBottom: "1.5rem", 
              color: "#ffffff", 
              opacity: 1,
              backgroundColor: 'transparent',
              fontWeight: 700,
              fontSize: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
              zIndex: 11
            }}>
              FEATURED MAGAZINE
            </div>
            
            <Link href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`} style={{ textDecoration: "none", display: "block", position: 'relative', zIndex: 11, color: "#ffffff" }}>
              <h1 className="hero-title-white" style={{ 
                marginBottom: "1rem", 
                cursor: "pointer", 
                opacity: 1,
                backgroundColor: 'transparent',
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.01em",
                fontFamily: "'Playfair Display', serif",
                textTransform: "none"
              }}>
                {currentMagazine.title ? currentMagazine.title.charAt(0).toUpperCase() + currentMagazine.title.slice(1).toLowerCase() : currentMagazine.title}
              </h1>
            </Link>
            
            {/* White accent line separator */}
            <div style={{
              width: "80px",
              height: "3px",
              background: "#ffffff",
              marginBottom: "2rem",
              position: 'relative',
              zIndex: 11
            }}></div>
            
            {currentMagazine.description && (
              <p className="hero-text-white" style={{ 
                fontSize: "0.95rem", 
                marginBottom: "2.5rem", 
                opacity: 1,
                backgroundColor: 'transparent',
                color: "#ffffff",
                fontWeight: 400,
                lineHeight: "1.7",
                fontFamily: "'Lora', serif",
                fontStyle: "normal",
                textTransform: "none",
                position: 'relative',
                zIndex: 11
              }}>
                {currentMagazine.description.charAt(0).toUpperCase() + currentMagazine.description.slice(1).toLowerCase()}
              </p>
            )}
            
            <Link 
              href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`}
              className="read-more-button"
              style={{
                background: "var(--primary-color)",
                backgroundColor: "var(--primary-color)",
                color: "#ffffff",
                padding: "1.25rem 3rem",
                borderRadius: "0",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "1.25rem",
                transition: "all 0.3s ease",
                border: "2px solid var(--primary-color)",
                width: 'fit-content',
                position: 'relative',
                zIndex: 11,
                opacity: 1,
                transform: "scale(1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#990000";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.border = "2px solid #990000";
                e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary-color)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.border = "2px solid var(--primary-color)";
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
              }}
            >
              <span style={{ color: "#ffffff" }}>READ MORE</span>
            </Link>
          </div>

          {/* Magazine Carousel Right Side - Separate Block */}
          <div className="carousel-container" style={{ 
            position: "relative", 
            height: "650px",
            minHeight: "650px",
            background: 'transparent',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0',
            padding: '0',
            margin: '0',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            overflow: 'hidden'
          }}>
            {/* Dark overlay behind magazines */}
            {/* <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div> */}
            <div className="carousel-track" style={{ margin: 0, padding: 0, position: 'relative', zIndex: 2 }}>
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
                
                return (
                  <div
                    key={`${magazine.slug?.current || magazine.slug}-${index}`}
                    className={`carousel-item ${isCenter ? 'center' : 'side'}`}
                    style={{
                      left: `calc(50% + ${offset}px)`,
                      transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
                      opacity: 1,
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
                    background: currentIndex === index ? "#C6A054" : "rgba(255, 255, 255, 0.3)",
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
      {/* <div style={{
        width: '100%',
        height: '2px',
        background: 'var(--primary-color)',
        marginTop: '3rem'
      }}></div> */}
      
      {/* Featured Magazine Title Below Separator */}
      {/* <div style={{
        marginTop: '1.5rem',
        textAlign: 'left'
      }}>
        <Link 
          href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`}
          style={{
            textDecoration: 'none',
            color: '#171717',
            fontSize: '1.25rem',
            fontWeight: 600,
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#171717';
          }}
        >
          {currentMagazine.title} - {currentMagazine.description || 'Featured Story'}
        </Link>
      </div> */}

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
             height: 500px;
             minHeight: 500px;
           }
         }

         @media (max-width: 768px) {
           .carousel-container {
             height: 400px;
             minHeight: 400px;
           }
           
           .magazine-card {
             width: 280px;
             height: 380px;
           }
         }
      `}</style>
    </>
  );
};

export default MagazineHero;
