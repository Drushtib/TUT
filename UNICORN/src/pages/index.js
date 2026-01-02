import Head from "next/head";
import { useEffect, useRef } from "react";
import HeadMeta from "../components/elements/HeadMeta";
import FooterTwo from "../components/footer/FooterTwo";
import HeaderOne from "../components/header/HeaderOne";
import MasterTalks from "../components/post/MasterTalks";
import LogoSlider from "../components/post/LogoSlider";
import Magazines from "../components/post/Magazines";
import BusinessBulletin from "../components/post/BusinessBulletin";
import SliderOne from "../components/slider/SliderOne";
import WebProfiles from "../components/post/WebProfiles";
import MarketNews from "../components/post/MarketNews";
import MagazineHero from "../components/hero/MagazineHero";
import ScrollToTop from "../components/common/ScrollToTop";
import SocialLink from "../data/social/SocialLink.json";

const Home = () => {
  console.log("Home component rendering");
  const snowCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = snowCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = null;
    const snowflakes = [];
    const snowflakeShapes = ["❄", "✶", "✻", "✼", "✺"];

    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createSnowflakes() {
      snowflakes.length = 0;
      const total = 140;
      for (let i = 0; i < total; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 24 + 8,
          speed: Math.random() * 1 + 0.5,
          shape: snowflakeShapes[Math.floor(Math.random() * snowflakeShapes.length)],
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    }

    function updateSnowflakes() {
      snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
          flake.y = 0;
          flake.x = Math.random() * canvas.width;
        }
      });
    }

    function drawSnowflakes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((flake) => {
        ctx.globalAlpha = flake.opacity;
        ctx.font = `${flake.size}px Arial`;
        ctx.fillStyle = "white";
        ctx.fillText(flake.shape, flake.x, flake.y);
      });
      ctx.globalAlpha = 1;
      updateSnowflakes();
    }

    function animateSnowflakes() {
      drawSnowflakes();
      rafId = window.requestAnimationFrame(animateSnowflakes);
    }

    setCanvasSize();
    createSnowflakes();
    animateSnowflakes();

    const handleResize = () => {
      setCanvasSize();
      createSnowflakes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
  
  return (
    <div suppressHydrationWarning style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Head>
        <meta name="google-site-verification" content="Hb-PBtfDrWImSPQKiNhfbw0JxtOLWsPKDEbfz_WJ8ZE" />
      </Head>
      <HeadMeta
        metaTitle="The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories"
        metaDesc="The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
      />
      <HeaderOne />
      <canvas id="snow-canvas" ref={snowCanvasRef}></canvas>
      <MagazineHero />
      {/* <LogoSlider /> */}
      <SliderOne />
      <LogoSlider title="Our Partner Brands" showTitle={true} />
      <BusinessBulletin />
      <WebProfiles />
      <MarketNews />
      <Magazines />
      <MasterTalks />
      <LogoSlider title="Our Partner Brands" showTitle={true} />
      <FooterTwo />
      <ScrollToTop />
      
      {/* Fixed Social Icons - Right Side */}
      <div className="fixed-social-icons">
        <ul className="social-share-vertical" style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.yt.icon} />
            </a>
          </li>
          <li>
            <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.instagram.icon} />
            </a>
          </li>
          <li>
            <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.linked.icon} />
            </a>
          </li>
        </ul>
      </div>

      <style jsx global>{`
        #snow-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }

        /* Fixed Social Icons - Right Side */
        .fixed-social-icons {
          position: fixed;
          right: 20px;
          top: 70%;
          transform: translateY(-50%);
          z-index: 999;
          background: transparent;
          padding: 0;
        }

        .social-share-vertical {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .social-share-vertical li {
          margin: 0;
        }

        .social-share-vertical li a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          color: #fff;
          font-size: 18px;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
        }

        .social-share-vertical li a:hover {
          transform: scale(1.1);
        }

        /* YouTube hover - Red */
        .social-share-vertical li:nth-child(1) a:hover {
          background: #FF0000;
          color: #fff;
        }

        /* Instagram hover - Gradient */
        .social-share-vertical li:nth-child(2) a:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #fff;
        }

        /* LinkedIn hover - Blue */
        .social-share-vertical li:nth-child(3) a:hover {
          background: #0077b5;
          color: #fff;
        }

        .social-share-vertical li a i {
          line-height: 1;
        }

        /* Mobile Responsive for Fixed Social Icons */
        @media (max-width: 768px) {
          .fixed-social-icons {
            right: 10px;
            padding: 0;
          }

          .social-share-vertical li a {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .fixed-social-icons {
            right: 5px;
            padding: 0;
          }

          .social-share-vertical li a {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .social-share-vertical {
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
