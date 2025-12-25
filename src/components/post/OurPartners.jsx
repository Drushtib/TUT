import React from "react";
import Image from "next/image";

const OurPartners = () => {
  // Logo files from the assets folder
  const partnerLogos = [
    {
      src: "/assest/8figurefirm_logo 6.jpg",
      alt: "8 Figure Firm",
    },
    {
      src: "/assest/alloypersonaltraining_logo 4.jpg",
      alt: "Alloy Personal Training",
    },
    {
      src: "/assest/cube_software_logo.jpeg",
      alt: "Cube Software",
    },
    {
      src: "/assest/exepresence_logo.jpeg",
      alt: "Exepresence",
    },
    {
      src: "/assest/miyazaki_logo.jpeg",
      alt: "Miyazaki",
    },
    {
      src: "/assest/newworldwind_logo.jpeg",
      alt: "New World Wind",
    },
    {
      src: "/assest/pickup_usa_franchise_company_logo.jpeg",
      alt: "PickUp USA Franchise",
    },
  ];
  
  const logoCount = partnerLogos.length;

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];
  
  // Calculate animation distances for different breakpoints
  const desktopWidth = 180;
  const desktopGap = 48; // 3rem = 48px
  const desktopDistance = (desktopWidth + desktopGap) * logoCount;
  
  const tabletWidth = 160;
  const tabletGap = 40; // 2.5rem = 40px
  const tabletDistance = (tabletWidth + tabletGap) * logoCount;
  
  const mobileWidth = 140;
  const mobileGap = 32; // 2rem = 32px
  const mobileDistance = (mobileWidth + mobileGap) * logoCount;
  
  const smallMobileWidth = 120;
  const smallMobileGap = 24; // 1.5rem = 24px
  const smallMobileDistance = (smallMobileWidth + smallMobileGap) * logoCount;
  
  const extraSmallWidth = 100;
  const extraSmallGap = 20; // 1.25rem = 20px
  const extraSmallDistance = (extraSmallWidth + extraSmallGap) * logoCount;

  return (
    <>
      <style jsx global>{`
        .partners-section {
          background: #ffffff;
          padding: 4rem 0;
          overflow-x: hidden;
          overflow-y: visible;
        }
        
        .partners-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .partners-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .partners-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #171717;
          margin: 0;
          padding: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .partners-slider-wrapper {
          position: relative;
          overflow: visible;
          width: 100%;
          padding: 2rem 0;
        }
        
        .partners-slider-track {
          display: flex;
          align-items: center;
          gap: 3rem;
          animation: slide 30s linear infinite;
          width: fit-content;
        }
        
        .partners-slider-track:hover {
          animation-play-state: paused;
        }
        
        .partner-logo-item {
          flex-shrink: 0;
          width: 180px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: #ffffff;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .partner-logo-item:hover {
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
          transform: translateY(-4px);
          z-index: 2;
        }
        
        .partner-logo-item img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: none;
          opacity: 1;
        }
        
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${desktopDistance}px);
          }
        }
        
        /* Large Tablet View (1025px - 1399px) */
        @media (max-width: 1399px) and (min-width: 1025px) {
          .partners-section {
            padding: 3.5rem 0;
          }
          
          .partners-container {
            padding: 0 1.75rem;
          }
          
          .partners-header {
            margin-bottom: 2.75rem;
          }
          
          .partners-header h2 {
            font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          }
          
          .partners-slider-track {
            gap: 2.75rem;
          }
          
          .partner-logo-item {
            width: 170px;
            height: 110px;
            padding: 1.35rem;
          }
        }
        
        /* Tablet View (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .partners-section {
            padding: 3rem 0;
          }
          
          .partners-container {
            padding: 0 1.5rem;
          }
          
          .partners-header {
            margin-bottom: 2.5rem;
          }
          
          .partners-header h2 {
            font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          }
          
          .partners-slider-track {
            gap: 2.5rem;
            animation-duration: 25s;
          }
          
          .partner-logo-item {
            width: 160px;
            height: 100px;
            padding: 1.25rem;
          }
          
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${tabletDistance}px);
            }
          }
        }
        
        /* Tablet Portrait View (481px - 768px) */
        @media (max-width: 768px) and (min-width: 481px) {
          .partners-section {
            padding: 2.5rem 0;
          }
          
          .partners-container {
            padding: 0 1rem;
          }
          
          .partners-header {
            margin-bottom: 2rem;
          }
          
          .partners-header h2 {
            font-size: clamp(1.5rem, 5vw, 2rem);
            letter-spacing: 0.5px;
          }
          
          .partners-slider-track {
            gap: 2rem;
            animation-duration: 20s;
          }
          
          .partner-logo-item {
            width: 140px;
            height: 90px;
            padding: 1rem;
          }
          
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${mobileDistance}px);
            }
          }
        }
        
        /* Mobile View (320px - 480px) */
        @media (max-width: 480px) {
          .partners-section {
            padding: 2rem 0;
          }
          
          .partners-container {
            padding: 0 0.75rem;
          }
          
          .partners-header {
            margin-bottom: 1.5rem;
          }
          
          .partners-header h2 {
            font-size: clamp(1.25rem, 6vw, 1.75rem);
            letter-spacing: 0.3px;
          }
          
          .partners-slider-track {
            gap: 1.5rem;
            animation-duration: 18s;
          }
          
          .partner-logo-item {
            width: 120px;
            height: 80px;
            padding: 0.75rem;
          }
          
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${smallMobileDistance}px);
            }
          }
        }
        
        /* Extra Small Mobile View (up to 360px) */
        @media (max-width: 360px) {
          .partners-section {
            padding: 1.5rem 0;
          }
          
          .partners-container {
            padding: 0 0.5rem;
          }
          
          .partners-header {
            margin-bottom: 1.25rem;
          }
          
          .partners-header h2 {
            font-size: clamp(1.1rem, 7vw, 1.5rem);
          }
          
          .partners-slider-track {
            gap: 1.25rem;
            animation-duration: 15s;
          }
          
          .partner-logo-item {
            width: 100px;
            height: 70px;
            padding: 0.5rem;
          }
          
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${extraSmallDistance}px);
            }
          }
        }
      `}</style>
      
      <div className="partners-section">
        <div className="partners-container">
          <div className="partners-header">
            <h2>Our Partners</h2>
          </div>
          
          <div className="partners-slider-wrapper">
            <div className="partners-slider-track">
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="partner-logo-item">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={120}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurPartners;

