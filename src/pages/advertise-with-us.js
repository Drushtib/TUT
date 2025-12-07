import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import Loader from "../components/common/Loader";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const AdvertiseWithUs = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    website: false,
    digital: false,
    cta: false,
  });

  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = Object.keys(sectionRefs.current).find(
            (key) => sectionRefs.current[key] === entry.target
          );
          if (sectionName) {
            setIsVisible((prev) => ({ ...prev, [sectionName]: true }));
          }
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Trigger hero animation immediately
    setIsVisible((prev) => ({ ...prev, hero: true }));

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <HeadMeta
        metaTitle="Advertise With Us - The Entrepreneurial Chronicles Magazine"
        metaDesc="Partner with The Entrepreneurial Chronicles Magazine to reach entrepreneurs and business leaders worldwide. Discover our advertising opportunities and connect with your target audience."
      />

      <HeaderOne />

      {/* Hero Section with Animation */}
      <div
        ref={(el) => (sectionRefs.current.hero = el)}
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(10, 10, 10, 0.85) 0%, rgba(26, 26, 26, 0.85) 50%, rgba(10, 10, 10, 0.85) 100%), url('/images/advertise-bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          padding: "13rem 2rem",
          position: "relative",
        }}
      >
        <div 
          className="container" 
          style={{ position: "relative", zIndex: 1 }}
        >
          <div 
            style={{ 
              textAlign: "center", 
              maxWidth: "900px", 
              margin: "0 auto",
              opacity: isVisible.hero ? 1 : 0,
              transform: isVisible.hero ? "translateY(0)" : "translateY(-50px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <h1
              style={{
                fontSize: "4.2rem",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "2rem",
                letterSpacing: "-0.02em",
                lineHeight: "1.4",
                fontFamily: "Poppins, sans-serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
              className="page-title"
            >
              ADVERTISE WITH US
            </h1>
            <p
              style={{
                fontSize: "1.8rem",
                color: "#ffffff",
                lineHeight: "3rem",
                fontWeight: "400",
                fontFamily: "Roboto, sans-serif",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Welcome to The Entrepreneurial Chronicles Magazine, where we
              spotlight trailblazers from all sectors transforming the business
              magazine landscape. Our mission is to inspire and empower new
              leaders with groundbreaking ideas worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        ref={(el) => (sectionRefs.current.features = el)}
        style={{
          backgroundColor: "#000",
          padding: "6rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              opacity: isVisible.features ? 1 : 0,
              transform: isVisible.features ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  color: "#fff",
                  marginBottom: "2rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Why Choose Us?
              </h2>
              <div
                style={{
                  width: "100px",
                  height: "4px",
                  background: "#FF0000",
                  margin: "0 auto 3rem",
                  borderRadius: "2px",
                }}
              />
            </div>
            <div className="row" style={{ marginTop: "4rem", justifyContent: "center" }}>
              <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    padding: "3rem 2.5rem",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
                    borderRadius: "20px",
                    border: "1px solid rgba(212,175,55,0.2)",
                    height: "100%",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(212,175,55,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>🎯</div>
                  <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#d4af37", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                    Targeted Reach
                  </h3>
                  <p style={{ color: "#ccc", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                    Connect with entrepreneurs, business leaders, and innovators actively seeking solutions and opportunities.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    padding: "3rem 2.5rem",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
                    borderRadius: "20px",
                    border: "1px solid rgba(212,175,55,0.2)",
                    height: "100%",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(212,175,55,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>📈</div>
                  <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#d4af37", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                    High Engagement
                  </h3>
                  <p style={{ color: "#ccc", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                    Reach engaged readers who value quality content and are ready to take action on your offerings.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    padding: "3rem 2.5rem",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
                    borderRadius: "20px",
                    border: "1px solid rgba(212,175,55,0.2)",
                    height: "100%",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(212,175,55,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>🌟</div>
                  <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#d4af37", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                    Brand Authority
                  </h3>
                  <p style={{ color: "#ccc", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                    Showcase your brand alongside industry leaders and gain credibility in the entrepreneurial community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Placement Section */}
      <div
        ref={(el) => (sectionRefs.current.website = el)}
        style={{
          backgroundColor: "#0a0a0a",
          padding: "6rem 0",
          position: "relative",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              opacity: isVisible.website ? 1 : 0,
              transform: isVisible.website ? "translateX(0)" : "translateX(-100px)",
              transition: "all 1s ease-out",
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h2
                  style={{
                    fontSize: "3.2rem",
                    fontWeight: "800",
                    color: "#fff",
                    marginBottom: "2rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Website Placement Advertising
                </h2>
                <div
                  style={{
                    width: "100px",
                    height: "4px",
                    background: "#FF0000",
                    marginBottom: "2.5rem",
                    borderRadius: "2px",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.6rem",
                    color: "#ccc",
                    lineHeight: "2.8rem",
                    marginBottom: "1.8rem",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  A wise businessman once said, &quot;The toothpaste you use to the shiny shoes you wear to the car you drive to the bed you sleep in is advertised,&quot; and adding to that we say, &quot;and you, my friend are afraid to advertise with us!&quot;
                </p>
                <p
                  style={{
                    fontSize: "1.6rem",
                    color: "#ccc",
                    lineHeight: "2.8rem",
                    marginBottom: "1.8rem",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Being a magazine that strives to bring new age businesses to light, it makes a perfect hub of new blood in the market to recognise you!
                </p>
                <p
                  style={{
                    fontSize: "1.6rem",
                    color: "#ccc",
                    lineHeight: "2.8rem",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Advertise with us and connect yourself with the brand leaders of the paradigm shift in the business world.
                </p>
              </div>
              <div className="col-lg-6">
                <div
                  style={{
                    opacity: isVisible.website ? 1 : 0,
                    transform: isVisible.website ? "translateX(0) scale(1)" : "translateX(100px) scale(0.9)",
                    transition: "all 1.2s ease-out 0.4s",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #FF0000",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                  >
                    <Image
                      src="/images/ads-img.png"
                      alt="Website Advertisement Placements"
                      width={600}
                      height={800}
                      layout="responsive"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Magazine Placement Section */}
      <div
        ref={(el) => (sectionRefs.current.digital = el)}
        style={{
          backgroundColor: "#000",
          padding: "6rem 0",
          position: "relative",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              opacity: isVisible.digital ? 1 : 0,
              transform: isVisible.digital ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "3.2rem",
                  fontWeight: "800",
                  color: "#fff",
                  marginBottom: "2rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Digital Magazine Placement Advertising
              </h2>
              <div
                style={{
                  width: "100px",
                  height: "4px",
                  background: "#FF0000",
                  margin: "0 auto 2rem",
                  borderRadius: "2px",
                }}
              />
              <p
                style={{
                  fontSize: "1.6rem",
                  color: "#ccc",
                  lineHeight: "2.8rem",
                  maxWidth: "800px",
                  margin: "0 auto",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                The space and dimension of the Ad on the print and digital platforms are mentioned below.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div
                  style={{
                    opacity: isVisible.digital ? 1 : 0,
                    transform: isVisible.digital ? "translateX(0) scale(1)" : "translateX(-60px) scale(0.9)",
                    transition: "all 1.2s ease-out 0.3s",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #FF0000",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                  >
                    <Image
                      src="/images/Advertisement-1.jpg"
                      alt="Digital Magazine Advertisement Placements"
                      width={600}
                      height={800}
                      layout="responsive"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div
                  style={{
                    opacity: isVisible.digital ? 1 : 0,
                    transform: isVisible.digital ? "translateX(0) scale(1)" : "translateX(60px) scale(0.9)",
                    transition: "all 1.2s ease-out 0.5s",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #FF0000",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "#FF0000";
                    }}
                  >
                    <Image
                      src="/images/Advertisement-2.jpg"
                      alt="Digital Magazine Advertisement Placements"
                      width={600}
                      height={800}
                      layout="responsive"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        ref={(el) => (sectionRefs.current.cta = el)}
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          padding: "7rem 0",
          position: "relative",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: "center",
              opacity: isVisible.cta ? 1 : 0,
              transform: isVisible.cta ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
              transition: "all 1.2s ease-out",
            }}
          >
            <h2
              style={{
                fontSize: "4rem",
                fontWeight: "800",
                color: "#fff",
                marginBottom: "2rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              style={{
                fontSize: "1.6rem",
                color: "#ccc",
                lineHeight: "2.4rem",
                marginBottom: "3.5rem",
                maxWidth: "700px",
                margin: "0 auto 3.5rem",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Let's discuss how we can help you reach your target audience and achieve your advertising goals.
            </p>
            <Link href="/contact">
              <button
                style={{
                  background: "#FF0000",
                  color: "#000",
                  border: "none",
                  padding: "1.8rem 5rem",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                GET IN TOUCH
              </button>
            </Link>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default AdvertiseWithUs;
