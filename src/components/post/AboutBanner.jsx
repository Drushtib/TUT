import React, { useState, useEffect } from "react";
import Link from "next/link";

const AboutBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageInView, setImageInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.about-banner-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-banner-section">
      {imageInView && (
        <img 
          src="/assest/Asset 4.png" 
          alt="About The Unicorn Times" 
          className={`about-banner-full-img ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      )}
      {!imageLoaded && (
        <div className="about-banner-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-text">Loading...</div>
          </div>
        </div>
      )}
      <div className="about-banner-overlay">
        <div className="about-banner-container">
          <div className="about-banner-content-box">
            <h2 className="about-banner-title">The Unicorn Times: A Leading Voice in Business and Innovation</h2>
            <div className="about-banner-description">
              The Unicorn Times is a dynamic online business magazine focused on delivering insightful coverage of the rapidly evolving startup and entrepreneurial ecosystem. As a growing platform in the digital media space, we provide in-depth business insights, inspiring entrepreneur journeys, and success stories that reflect the spirit of innovation across industries. Our platform features exclusive cover stories of business leaders, emerging startup narratives, and thought-provoking content that highlights the trends shaping the future of business. With regular updates on industry news, press releases, and market developments, The Unicorn Times keeps entrepreneurs, investors, and professionals well-informed and ahead in the competitive landscape.
            </div>
            <Link href="/about-us" className="about-banner-button">
              Read More
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-banner-section {
          width: 100%;
          position: relative;
          min-height: 600px;
        }

        .about-banner-full-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .about-banner-full-img.loaded {
          opacity: 0.9;
        }

        .about-banner-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-content {
          text-align: center;
        }

        .placeholder-text {
          font-size: 1.2rem;
          color: #666;
          font-family: 'Poppins', sans-serif;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .about-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .about-banner-container {
          max-width: 1400px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .about-banner-content-box {
          background: rgba(230, 68, 58, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 20px;
          padding: 4rem;
          max-width: 800px;
          width: 100%;
          border: 1px solid rgba(230, 68, 58, 0.4);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          text-align: left;
          margin-left: 40rem;
        }

        .about-banner-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff !important;
          margin-bottom: 1.5rem;
          font-family: "Poppins", sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .about-banner-description {
          font-size: 1.4rem;
          color: #ffffff !important;
          margin-bottom: 1rem;
          line-height: 1.7;
          font-family: "Roboto", sans-serif;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .about-banner-button,
        .about-banner-content-box .about-banner-button,
        a.about-banner-button {
          display: inline-block !important;
          padding: 1rem 2.5rem !important;
          background: #bb0505 !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-size: 1.2rem !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          transition: background 0.3s ease, transform 0.3s ease !important;
          font-family: "Poppins", sans-serif !important;
          border: 2px solid #bb0505 !important;
          margin-top: 1.5rem !important;
        }

        .about-banner-button:hover {
          background: #990404;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .about-banner-section {
            min-height: 600px;
          }

          .about-banner-overlay {
            justify-content: center;
            padding: 1rem;
          }

          .about-banner-container {
            justify-content: center;
          }

          .about-banner-content-box {
            max-width: 90%;
            padding: 2rem;
          }

          .about-banner-title {
            font-size: 2rem;
            text-align: center;
          }

          .about-banner-description {
            font-size: 1rem;
            text-align: center;
          }

          .about-banner-button {
            padding: 0.8rem 2rem;
            font-size: 1rem;
            display: block;
            margin: 1.5rem auto 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutBanner;
