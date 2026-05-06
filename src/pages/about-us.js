import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getFileContentBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../client";

import HeaderOne from "../components/header/HeaderOne";
import TeamOne from "../components/team/TeamOne";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import { removeDuplicates } from "../utils";
import { authorsData } from "../data/about/TeamData";
import FooterTwo from "../components/footer/FooterTwo";
// Custom hook for count-up animation
const useCountUp = (end, duration = 2000, startOnVisible = false, isVisible = false) => {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);
  const timerRef = useRef(null);
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    // Clean up any existing animation
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }

    // Reset if visibility changed from true to false
    if (prevVisibleRef.current && !isVisible && startOnVisible) {
      setCount(0);
      hasStartedRef.current = false;
    }
    prevVisibleRef.current = isVisible;

    if (startOnVisible) {
      // If we need to wait for visibility
      if (!isVisible) {
        return;
      }

      // If visible and not started yet, start the animation
      if (isVisible && !hasStartedRef.current) {
        hasStartedRef.current = true;
        setCount(0); // Reset to 0 before starting
        let startTime = null;
        const startValue = 0;

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(startValue + (end - startValue) * easeOutQuart);

          setCount(current);

          if (progress < 1) {
            timerRef.current = requestAnimationFrame(animate);
          } else {
            setCount(end);
            timerRef.current = null;
          }
        };

        timerRef.current = requestAnimationFrame(animate);
      }
    } else {
      // Start immediately if not waiting for visibility
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        let startTime = null;
        const startValue = 0;

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(startValue + (end - startValue) * easeOutQuart);

          setCount(current);

          if (progress < 1) {
            timerRef.current = requestAnimationFrame(animate);
          } else {
            setCount(end);
            timerRef.current = null;
          }
        };

        timerRef.current = requestAnimationFrame(animate);
      }
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [end, duration, startOnVisible, isVisible]);

  return count;
};

// Stat Card Component with count-up animation
const StatCard = React.forwardRef(({ endValue, suffix, label, isVisible, delay }, ref) => {
  const count = useCountUp(endValue, 2000, true, isVisible);

  return (
    <div className="col-lg-3 col-md-6 col-sm-6" style={{ marginBottom: "2rem" }}>
      <div
        ref={ref}
        style={{
          textAlign: "center",
          padding: "2.2rem 1.4rem",
          background: "#ffffff",
          border: "1px solid #8b0000",
          borderRadius: "18px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          opacity: 1,
          transform: "none",
          transition: "none",
        }}
      >
        <div style={{ fontSize: "4.2rem", fontWeight: "600", color: "#111111", marginBottom: "0.6rem", fontFamily: "Poppins, sans-serif" }}>
          {count}{suffix}
        </div>
        <div style={{ fontSize: "1.8rem", color: "#111111", textTransform: "uppercase", letterSpacing: "2px", fontFamily: "Roboto, sans-serif" }}>
          {label}
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

const AboutUs = ({ aboutData }) => {
  // Animation states
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    // Set hero visible immediately
    setIsVisible((prev) => ({ ...prev, hero: true }));

    const observers = {};
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    // Function to observe all refs
    const observeRefs = () => {
      Object.keys(sectionRefs.current).forEach((key) => {
        if (key === "hero") return; // Skip hero, already visible

        if (observers[key]) {
          observers[key].disconnect();
        }

        observers[key] = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => {
                const newState = { ...prev, [key]: true };
                // When stats section becomes visible, also make all stat cards visible
                if (key === "stats") {
                  newState.stat1 = true;
                  newState.stat2 = true;
                  newState.stat3 = true;
                  newState.stat4 = true;
                }
                return newState;
              });
            }
          });
        }, observerOptions);

        if (sectionRefs.current[key]) {
          observers[key].observe(sectionRefs.current[key]);
        }
      });
    };

    // Initial observation
    observeRefs();

    // Re-observe after a short delay to catch any late-rendering components
    const timeoutId = setTimeout(() => {
      observeRefs();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      Object.values(observers).forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);
  // Fetch magazines for background collage
  const magazinesQuery = `
    *[_type == "magazine"] {
      title,
      slug,
      'featureImg': mainImage.asset->url,
      publishedAt,
      _createdAt
    } | order(_createdAt desc)[0...9]
  `;

  const { data: magazines } = useQuery({
    queryKey: ["magazinesForAbout"],
    queryFn: async () => {
      const response = await client.fetch(magazinesQuery);
      return response;
    },
  });
  return (
    <div className="about-us-page" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <HeadMeta
        metaTitle={
          "About Us | The Unicorn Time"
        }
        metaDesc={
          "The Unicorn Time is a global business magazine featuring visionary business leaders, industry experts, and entrepreneurial minds from around the world."
        }
      />
      <HeaderOne />

      {/* Hero Section with Image Background */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "350px",
          backgroundImage: "url('/assest/Asset 2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          className="hero-section-text"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 2rem",
            maxWidth: "1200px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "1.5rem",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.2",
            }}
          >
            About Us
          </h1>
          <p
            style={{
              fontSize: "1.6rem",
              color: "#ffffff",
              lineHeight: "2.6rem",
              fontFamily: "Roboto, sans-serif",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            The Unicorn Times is a modern business and entrepreneurship website where we publish inspiring founder stories, industry insights, and practical ideas that help readers think bigger, build smarter, and stay ahead.
          </p>
        </div>
      </div>

      {/* About Us Content Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#111111",
              marginBottom: "2rem",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.3",
            }}
          >
            About Us
          </h2>
          <p
            style={{
              fontSize: "1.6rem",
              color: "#555555",
              lineHeight: "2.8rem",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            We are a modern digital magazine dedicated to delivering insightful, engaging, and high-quality content across business, technology, innovation, and global trends. Our platform is built to inform and inspire readers through well-researched articles, expert perspectives, and compelling storytelling. We focus on highlighting the ideas, people, and developments shaping today's world—bringing clarity to complex topics and offering meaningful insights that matter. With a strong commitment to accuracy, originality, and editorial integrity, we aim to create content that is both informative and impactful. Our goal is to provide a trusted space where readers can stay updated, explore new perspectives, and connect with stories that drive progress and innovation.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div
        style={{
          padding: "5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#111111",
              marginBottom: "2rem",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.3",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1.6rem",
              color: "#555555",
              lineHeight: "2.8rem",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Our mission is to deliver high-quality, engaging, and reliable content that informs, inspires, and connects readers. We are committed to presenting meaningful stories, emerging trends, and innovative ideas that shape industries and influence perspectives.

            Through thoughtful storytelling and in-depth insights, we aim to provide clarity in a fast-moving world, helping our audience stay informed and ahead of the curve. We uphold the highest standards of accuracy, originality, and editorial integrity, ensuring every piece reflects credibility and purpose.

            By fostering a strong editorial voice and a reader-first approach, we strive to create a platform that not only shares information but also sparks curiosity, encourages innovation, and builds lasting connections with our audience.
          </p>
        </div>
      </div>

      {/* Mission, Vision, Values Section - Animated from different directions */}
      <div
        style={{ backgroundColor: "#ffffff", padding: "2.25rem 2rem" }}
        ref={(el) => (sectionRefs.current.foundation = el)}
      >
        <div className="container">
          <div
            style={{
              opacity: isVisible.foundation ? 1 : 0,
              transform: isVisible.foundation ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <SectionTitleTwo
              title="Our Foundation"
              paragraph="The core principles that drive everything we do"
            />
          </div>
          <div className="row" style={{ marginTop: "1.25rem", justifyContent: "center", alignItems: "stretch" }}>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.mission = el)}
                style={{
                  padding: "1.5rem 1.2rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #8b0000",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.mission ? 1 : 0,
                  transform: isVisible.mission ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.8s ease-out 0.2s",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(187, 5, 5, 0.35)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/target.png"
                    alt="Mission"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.2rem", fontWeight: "600", marginBottom: "1rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Mission
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.4rem", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  We inspire entrepreneurs by sharing authentic stories of innovation and success that drive meaningful change.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.vision = el)}
                style={{
                  padding: "1.5rem 1.2rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #8b0000",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.vision ? 1 : 0,
                  transform: isVisible.vision ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.8s ease-out 0.4s",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(187, 5, 5, 0.35)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/business_13586897.png"
                    alt="Vision"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.2rem", fontWeight: "600", marginBottom: "1rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Vision
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.4rem", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  We are building a trusted platform that connects visionary leaders and fosters a global community of innovators.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.values = el)}
                style={{
                  padding: "1.5rem 1.2rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #8b0000",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.values ? 1 : 0,
                  transform: isVisible.values ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.8s ease-out 0.6s",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(187, 5, 5, 0.35)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/value_17994255.png"
                    alt="Values"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.2rem", fontWeight: "600", marginBottom: "1rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Values
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.4rem", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  Integrity, innovation, and inclusivity guide our authentic storytelling and empower future leaders worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Editorial Principles Section */}
      <div
        className="editorial-section"
        style={{
          backgroundColor: "#ffffff",
          padding: "5rem 8rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
        }}
      >
        <div className="editorial-column" style={{ flex: 1, maxWidth: "45%" }}>
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              color: "#111111",
              marginBottom: "1.5rem",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.2",
            }}
          >
            Our Editorial Principles
          </h2>
          <p
            style={{
              fontSize: "1.6rem",
              color: "#555555",
              lineHeight: "2.8rem",
              fontFamily: "Roboto, sans-serif",
            }}
          >
           Every feature we publish is guided by a well-defined editorial process designed to uphold accuracy, clarity, and impactful storytelling. Our team carefully reviews each piece to ensure it meets high standards of quality and relevance. We place strong emphasis on originality, shaping every narrative to authentically capture the voice, vision, and achievements behind the story, while delivering content that resonates with and adds value to our readers.
          </p>
        </div>

        <div className="editorial-column" style={{ flex: 1, maxWidth: "55%" }}>
          {[
            {
              question: "Authentic Stories",
              answer: "We share real experiences and genuine journeys of leaders and entrepreneurs.",
            },
            {
              question: "Quality Content",
              answer: "Every piece is carefully researched and crafted to provide value to our readers.",
            },
            {
              question: "Diverse Perspectives",
              answer: "We feature voices from various industries, backgrounds, and regions worldwide.",
            },
            {
              question: "Timely Insights",
              answer: "Our content reflects current trends and developments in the business world.",
            },
            {
              question: "Reader Focus",
              answer: "We prioritize content that educates, informs, and helps our audience grow.",
            },
          ].map((principle, index) => (
            <div
              key={index}
              className="editorial-item"
              style={{
                marginBottom: "1.2rem",
                borderBottom: index < 4 ? "1px solid #e0e0e0" : "none",
                paddingBottom: index < 4 ? "1.2rem" : "0",
              }}
            >
              <div
                className="editorial-toggle"
                onClick={() => {
                  const answers = document.querySelectorAll('.editorial-answer');
                  const currentAnswer = answers[index];
                  const icons = document.querySelectorAll('.editorial-icon');
                  const currentIcon = icons[index];
                  
                  if (currentAnswer.style.display === 'block') {
                    currentAnswer.style.display = 'none';
                    currentIcon.innerHTML = '+';
                  } else {
                    answers.forEach((ans, i) => {
                      ans.style.display = 'none';
                      icons[i].innerHTML = '+';
                    });
                    currentAnswer.style.display = 'block';
                    currentIcon.innerHTML = '−';
                  }
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "0.5rem 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: "#111111",
                    fontFamily: "Poppins, sans-serif",
                    margin: 0,
                  }}
                >
                  {principle.question}
                </h3>
                <span
                  className="editorial-icon"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "300",
                    color: "#111111",
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </div>
              <div
                className="editorial-answer"
                style={{
                  display: "none",
                  paddingTop: "0.8rem",
                }}
              >
                <p
                  style={{
                    fontSize: "1.4rem",
                    color: "#666666",
                    lineHeight: "2.4rem",
                    fontFamily: "Roboto, sans-serif",
                    margin: 0,
                  }}
                >
                  {principle.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="axil-our-team section-gap section-gap-top__with-text" style={{ backgroundColor: '#fff', color: '#111' }}>
        {/* <div className="container">
          <div className="axil-team-grid-wrapper">
            <SectionTitleTwo
              title="Meet Our Company Pillars"
              paragraph="Wherever &amp; whenever you need us. We are here for you - contact us for all your support needs, <br> be it technical, general queries or information support."
            />
            <div className="row">
              {authorsData.map((author, index) => (
                <div className="col-lg-4 " key={author.slug}>
                  <TeamOne key={index} data={author} />
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <style jsx global>{`
        .about-us-page .page-title,
        .about-us-page .section-title,
        .about-us-page .section-title .axil-title,
        .about-us-page .section-title p,
        .about-us-page h1,
        .about-us-page h2,
        .about-us-page h3,
        .about-us-page h4,
        .about-us-page p,
        .about-us-page li,
        .about-us-page a {
          color: #111111 !important;
          opacity: 1 !important;
        }

        .about-us-page .about-stats,
        .about-us-page .about-stats * {
          color: #111111 !important;
          opacity: 1 !important;
        }

        .about-us-page .about-hero-desc {
          max-width: 1100px !important;
        }

        .about-us-page .editorial-section {
          background-color: #ffffff;
          padding: 5rem 8rem;
          display: flex;
          justify-content: space-between;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .about-us-page .editorial-column {
          flex: 1;
          min-width: 280px;
        }

        .about-us-page .editorial-item {
          margin-bottom: 1.2rem;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 1.2rem;
        }

        .about-us-page .editorial-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .about-us-page .editorial-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem 0;
        }

        .about-us-page .editorial-icon {
          transition: transform 0.2s ease;
        }

        .about-us-page .editorial-answer {
          display: none;
          padding-top: 0.8rem;
        }

        .about-us-page .editorial-answer p {
          font-size: 1.4rem;
          color: #666666;
          line-height: 2.4rem;
        }

        .about-us-page .hero-section-text h1,
        .about-us-page .hero-section-text p {
          color: #ffffff !important;
        }

        @media (max-width: 1199px) {
          .about-us-page .about-hero-desc {
            max-width: 100% !important;
          }
        }

        @media (max-width: 991px) {
          .about-us-page .page-title {
            font-size: 28px !important;
            margin-bottom: 1.2rem !important;
            line-height: 1.25 !important;
          }

          .about-us-page .about-hero-desc {
            max-width: 100% !important;
            font-size: 16px !important;
            line-height: 28px !important;
            padding-left: 10px;
            padding-right: 10px;
          }

          .about-us-page h2 {
            font-size: 28px !important;
            line-height: 1.25 !important;
          }

          /* Hero section responsive */
          .about-us-page > div[style*="height: 350px"] {
            height: 300px !important;
          }

          .about-us-page .hero-section-text h1 {
            font-size: 2.8rem !important;
          }

          .about-us-page .hero-section-text p {
            font-size: 1.4rem !important;
            line-height: 2.2rem !important;
          }

          /* About Us & Mission sections padding */
          .about-us-page > div[style*="padding: 5rem 8rem"] {
            padding: 3rem 4rem !important;
          }

          .about-us-page .editorial-section {
            padding: 3rem 2rem !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }

          .about-us-page .editorial-column {
            max-width: 100% !important;
          }

          .about-us-page .editorial-toggle h3 {
            font-size: 1.4rem !important;
          }

          .about-us-page .editorial-answer p {
            font-size: 1.3rem !important;
            line-height: 2rem !important;
          }

          /* Editorial Principles section - stack columns */
          .about-us-page > div[style*="display: flex"] > div[style*="maxWidth: 45%"],
          .about-us-page > div[style*="display: flex"] > div[style*="maxWidth: 55%"] {
            max-width: 100% !important;
            flex: none !important;
          }

          .about-us-page > div[style*="display: flex"][style*="gap: 4rem"] {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 767px) {
          .about-us-page > div[style*="height: 300px"],
          .about-us-page > div[style*="height: 350px"] {
            height: 250px !important;
          }

          .about-us-page .hero-section-text h1 {
            font-size: 2.2rem !important;
          }

          .about-us-page .hero-section-text p {
            font-size: 1.2rem !important;
            line-height: 2rem !important;
          }

          .about-us-page > div[style*="padding: 3rem 4rem"],
          .about-us-page > div[style*="padding: 5rem 8rem"] {
            padding: 2.5rem 2rem !important;
          }

          .about-us-page .editorial-section {
            padding: 2.5rem 1.5rem !important;
          }

          .about-us-page .editorial-toggle h3 {
            font-size: 1.3rem !important;
          }

          .about-us-page .editorial-icon {
            font-size: 1.8rem !important;
          }

          .about-us-page h2 {
            font-size: 2.2rem !important;
          }

          .about-us-page p {
            font-size: 1.4rem !important;
            line-height: 2.4rem !important;
          }
        }

        @media (max-width: 575px) {
          .about-us-page .page-title {
            font-size: 24px !important;
          }

          .about-us-page .about-hero-desc {
            font-size: 15px !important;
            line-height: 26px !important;
          }

          .about-us-page > div[style*="height: 250px"],
          .about-us-page > div[style*="height: 300px"],
          .about-us-page > div[style*="height: 350px"] {
            height: 200px !important;
          }

          .about-us-page .hero-section-text h1 {
            font-size: 1.8rem !important;
            margin-bottom: 1rem !important;
          }

          .about-us-page .hero-section-text p {
            font-size: 1.1rem !important;
            line-height: 1.8rem !important;
          }

          .about-us-page > div[style*="padding: 2.5rem 2rem"],
          .about-us-page > div[style*="padding: 3rem 4rem"],
          .about-us-page > div[style*="padding: 5rem 8rem"] {
            padding: 2rem 1.5rem !important;
          }

          .about-us-page .editorial-section {
            padding: 2rem 1rem !important;
          }

          .about-us-page h2 {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem !important;
          }

          .about-us-page .editorial-toggle h3 {
            font-size: 1.2rem !important;
          }

          .about-us-page .editorial-icon {
            font-size: 1.6rem !important;
          }

          .about-us-page p {
            font-size: 1.3rem !important;
            line-height: 2.2rem !important;
          }

          /* Editorial Principles items */
          .about-us-page h3 {
            font-size: 1.4rem !important;
          }

          .about-us-page .editorial-answer p {
            font-size: 1.2rem !important;
            line-height: 2rem !important;
          }
        }

        /* About Us & Our Mission sections - add horizontal padding on mobile */
        @media (max-width: 767px) {
          .about-us-page > div[style*="padding: 5rem 3rem"] {
            padding: 2.5rem 2rem !important;
          }

          .about-us-page > div[style*="padding: 5rem 3rem"] > div {
            maxWidth: 100% !important;
          }
        }

        @media (max-width: 575px) {
          .about-us-page > div[style*="padding: 5rem 3rem"] {
            padding: 2rem 2rem !important;
          }

          .about-us-page > div[style*="padding: 5rem 3rem"] > div {
            maxWidth: 100% !important;
          }
        }

        /* Foundation cards - single row on mobile */
        @media (max-width: 767px) {
          .about-us-page > div[style*="padding: 2.25rem 2rem"] .row {
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 0.6rem !important;
            justify-content: center !important;
            align-items: stretch !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] .col-lg-4 {
            flex: 1 1 0 !important;
            max-width: 32% !important;
            min-width: 0 !important;
            padding-left: 0.2rem !important;
            padding-right: 0.2rem !important;
            margin-bottom: 0 !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] .col-lg-4 > div {
            padding: 1rem 0.5rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] h3 {
            font-size: 1.2rem !important;
            margin-bottom: 0.5rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] p {
            font-size: 0.85rem !important;
            line-height: 1.4rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] img {
            width: 28px !important;
            height: 28px !important;
            margin-bottom: 0.5rem !important;
          }
        }

        @media (max-width: 575px) {
          .about-us-page > div[style*="padding: 2.25rem 2rem"] .row {
            gap: 0.3rem !important;
            align-items: stretch !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] .col-lg-4 {
            max-width: 33% !important;
            padding-left: 0.1rem !important;
            padding-right: 0.1rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] .col-lg-4 > div {
            padding: 0.7rem 0.3rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] h3 {
            font-size: 0.9rem !important;
            margin-bottom: 0.3rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] p {
            font-size: 0.7rem !important;
            line-height: 1.2rem !important;
          }

          .about-us-page > div[style*="padding: 2.25rem 2rem"] img {
            width: 24px !important;
            height: 24px !important;
            margin-bottom: 0.3rem !important;
          }
        }
      `}</style>
      <FooterTwo />
    </div>
  );
};

export default AboutUs;

export async function getStaticProps() {
  try {
    const aboutData = getFileContentBySlug("AboutData", "src/data/about");
    const content = await markdownToHtml(aboutData.content || "");
    return {
      props: {
        aboutData: {
          ...aboutData,
          content,
        },
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        aboutData: {
          content: "",
        },
      },
    };
  }
}
