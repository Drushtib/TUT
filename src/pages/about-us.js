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
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: "18px",
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.08)",
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
    <div className="about-us-page">
      <HeadMeta
        metaTitle={
          "About Us | The Unicorn Time"
        }
        metaDesc={
          "The Unicorn Time is a global business magazine featuring visionary business leaders, industry experts, and entrepreneurial minds from around the world."
        }
      />
      <HeaderOne />

      {/* Modern Hero Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "3.5rem 2rem 4rem",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{ position: "relative", zIndex: 1 }}
          ref={(el) => (sectionRefs.current.hero = el)}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              opacity: isVisible.hero ? 1 : 0,
              transform: isVisible.hero ? "translateY(0)" : "translateY(-50px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <h1
              style={{
                fontSize: "34px",
                fontWeight: "800",
                color: "#111111",
                marginBottom: "2rem",
                letterSpacing: "-0.02em",
                lineHeight: "1.4",
                fontFamily: "Poppins, sans-serif",
                textShadow: "none",
              }}
              className="page-title"
            >
              About Us
            </h1>

            <p
              className="about-hero-desc"
              style={{
                fontSize: "1.7rem",
                lineHeight: "2.9rem",
                color: "#111111",
                fontFamily: "Roboto, sans-serif",
                maxWidth: "1100px",
                margin: "0 auto 1.6rem",
              }}
            >
              The Unicorn Times is a modern business and entrepreneurship website where we publish inspiring founder stories, industry insights, and practical ideas that help readers think bigger, build smarter, and stay ahead.
            </p>

          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Section - Animated from different directions */}
      <div
        style={{ backgroundColor: "#ffffff", padding: "2.25rem 0" }}
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
          <div className="row" style={{ marginTop: "1.25rem", justifyContent: "center" }}>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.mission = el)}
                style={{
                  padding: "3rem 2.5rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.08)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.mission ? 1 : 0,
                  transform: isVisible.mission ? "translateX(0)" : "translateX(-100px)",
                  transition: "all 0.8s ease-out 0.2s",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(187, 5, 5, 0.35)";
                  e.currentTarget.style.boxShadow = "0 22px 60px rgba(0, 0, 0, 0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/target.png"
                    alt="Mission"
                    width={56}
                    height={56}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Mission
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  To inspire and empower entrepreneurs worldwide by sharing authentic stories of innovation, resilience, and success that drive meaningful change in the business world.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.vision = el)}
                style={{
                  padding: "3rem 2.5rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.08)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.vision ? 1 : 0,
                  transform: isVisible.vision ? "translateY(0)" : "translateY(100px)",
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
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/business_13586897.png"
                    alt="Vision"
                    width={56}
                    height={56}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Vision
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  To become the world's most trusted platform for entrepreneurial insights, connecting visionary leaders and fostering a global community of innovators.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div
                ref={(el) => (sectionRefs.current.values = el)}
                style={{
                  padding: "3rem 2.5rem",
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.08)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  opacity: isVisible.values ? 1 : 0,
                  transform: isVisible.values ? "translateX(0)" : "translateX(100px)",
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
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/assest/value_17994255.png"
                    alt="Values"
                    width={56}
                    height={56}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "2.4rem", fontWeight: "600", marginBottom: "1.2rem", color: "#111111", fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
                  Our Values
                </h3>
                <p style={{ color: "#111111", lineHeight: "2.8rem", fontSize: "1.6rem", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
                  Integrity, innovation, and inclusivity guide our work. We believe in authentic storytelling, diverse perspectives, and empowering the next generation of leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - Animated from bottom */}
      <div
        ref={(el) => (sectionRefs.current.stats = el)}
        className="about-stats"
        style={{
          backgroundColor: "#ffffff",
          padding: "3.5rem 0",
          opacity: 1,
          transform: "none",
          transition: "none",
        }}
      >
        <div className="container">
          <div className="row">
            <StatCard
              ref={(el) => (sectionRefs.current.stat1 = el)}
              endValue={1000}
              suffix="+"
              label="Featured Stories"
              isVisible={isVisible.stat1}
              delay={0.1}
            />
            <StatCard
              ref={(el) => (sectionRefs.current.stat2 = el)}
              endValue={50}
              suffix="+"
              label="Global Leaders"
              isVisible={isVisible.stat2}
              delay={0.2}
            />
            <StatCard
              ref={(el) => (sectionRefs.current.stat3 = el)}
              endValue={25}
              suffix="+"
              label="Industries Covered"
              isVisible={isVisible.stat3}
              delay={0.3}
            />
            <StatCard
              ref={(el) => (sectionRefs.current.stat4 = el)}
              endValue={100}
              suffix="K+"
              label="Monthly Readers"
              isVisible={isVisible.stat4}
              delay={0.4}
            />
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div
        ref={(el) => (sectionRefs.current.whoWeAre = el)}
        style={{
          backgroundColor: "#ffffff",
          padding: "3.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(187, 5, 5, 0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            opacity: isVisible.whoWeAre ? 1 : 0,
            transform: isVisible.whoWeAre ? "scale(1)" : "scale(0.5)",
            transition: "all 1.2s ease-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(187, 5, 5, 0.05) 0%, transparent 70%)",
            borderRadius: "50%",
            opacity: isVisible.whoWeAre ? 1 : 0,
            transform: isVisible.whoWeAre ? "scale(1)" : "scale(0.5)",
            transition: "all 1.5s ease-out 0.3s",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1500px" }}>
          <div
            style={{
              opacity: isVisible.whoWeAre ? 1 : 0,
              transform: isVisible.whoWeAre ? "translateX(0)" : "translateX(-100px)",
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <div style={{ maxWidth: "1320px", margin: "0 auto", background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "22px", boxShadow: "0 18px 50px rgba(0,0,0,0.08)", padding: "3.5rem 3rem", borderLeft: "6px solid #bb0505" }}>
                  <h2
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: "800",
                      color: "#111111",
                      marginBottom: "2rem",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: "1.2",
                      opacity: isVisible.whoWeAre ? 1 : 0,
                      transform: isVisible.whoWeAre ? "translateY(0) scale(1)" : "translateY(-30px) scale(0.9)",
                      transition: "all 0.8s ease-out 0.2s",
                    }}
                  >
                    Who We Are
                  </h2>
                  <div
                    style={{
                      opacity: isVisible.whoWeAre ? 1 : 0,
                      transform: isVisible.whoWeAre ? "translateY(0)" : "translateY(30px)",
                      transition: "all 0.8s ease-out 0.6s",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.6rem",
                        color: "#111111",
                        lineHeight: "2.8rem",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "left",
                      }}
                    >
                      The Unicorns Times is a professional magazine platform dedicated to covering everything related to entrepreneurship, innovation, and success. Our focus is on capturing the essence of the entrepreneurial journey — from the spark of an idea to the realization of major business goals. We highlight how entrepreneurship goes beyond starting a business; it's about solving problems, creating value, and making an impact. Our magazine showcases diverse entrepreneurial stories that reflect resilience, creativity, determination, and the drive to innovate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div
        ref={(el) => (sectionRefs.current.ourStory = el)}
        style={{
          backgroundColor: "#ffffff",
          padding: "3.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(187, 5, 5, 0.04) 0%, transparent 70%)",
            borderRadius: "50%",
            opacity: isVisible.ourStory ? 1 : 0,
            transform: isVisible.ourStory ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.3)",
            transition: "all 1.5s ease-out",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1500px" }}>
          <div
            style={{
              opacity: isVisible.ourStory ? 1 : 0,
              transform: isVisible.ourStory ? "translateX(0)" : "translateX(100px)",
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <div style={{ maxWidth: "1320px", margin: "0 auto", background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "22px", boxShadow: "0 18px 50px rgba(0,0,0,0.08)", padding: "3.5rem 3rem", borderLeft: "6px solid #bb0505" }}>
                  <h2
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: "800",
                      color: "#111111",
                      marginBottom: "2rem",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: "1.2",
                      opacity: isVisible.ourStory ? 1 : 0,
                      transform: isVisible.ourStory ? "translateY(0) scale(1)" : "translateY(-30px) scale(0.9)",
                      transition: "all 0.8s ease-out 0.2s",
                    }}
                  >
                    Our Story
                  </h2>
                  <div
                    style={{
                      opacity: isVisible.ourStory ? 1 : 0,
                      transform: isVisible.ourStory ? "translateY(0)" : "translateY(30px)",
                      transition: "all 0.8s ease-out 0.6s",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.6rem",
                        color: "#111111",
                        lineHeight: "2.8rem",
                        marginBottom: "2rem",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "left",
                      }}
                    >
The Unicorns Times was created with a clear purpose: to capture the true essence of the entrepreneurial journey and bring it to readers in a meaningful, inspiring way. We follow the path entrepreneurs take — from the moment an idea is born to the point it grows into a successful venture.

Over time, we have witnessed how entrepreneurship is not just about launching a business. It is a path defined by problem-solving, value creation, and the desire to make a real difference. This understanding became the foundation of our magazine.

Our story reflects the stories we tell. We document the resilience of individuals who start with limited resources, the creativity that turns simple ideas into remarkable innovations, and the determination that pushes entrepreneurs through challenges, failures, and turning points. Whether it's a startup working out of a garage or a company expanding onto the global stage, we showcase the full spectrum of entrepreneurial experiences.

In our pages, readers find real journeys—stories of risk-taking, breakthrough moments, lessons learned, and the courage required to build something meaningful. The Unicorns Times continues to evolve with each story we publish, staying committed to celebrating the spirit of entrepreneurship and giving a voice to those who shape the future through their ideas and determination.                    </p>
                    <p
                      style={{
                        fontSize: "1.6rem",
                        color: "#111111",
                        lineHeight: "2.8rem",
                        marginBottom: "2rem",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "left",
                      }}
                    >
                      Over time, we have witnessed how entrepreneurship is not just about launching a business. It is a path defined by problem-solving, value creation, and the desire to make a real difference. This understanding became the foundation of our magazine.
                    </p>
                    <p
                      style={{
                        fontSize: "1.6rem",
                        color: "#111111",
                        lineHeight: "2.8rem",
                        marginBottom: "2rem",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "left",
                      }}
                    >
                      Our story reflects the stories we tell. We document the resilience of individuals who start with limited resources, the creativity that turns simple ideas into remarkable innovations, and the determination that pushes entrepreneurs through challenges, failures, and turning points. Whether it's a startup working out of a garage or a company expanding onto the global stage, we showcase the full spectrum of entrepreneurial experiences.
                    </p>
                    <p
                      style={{
                        fontSize: "1.6rem",
                        color: "#111111",
                        lineHeight: "2.8rem",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "left",
                      }}
                    >
                      In our pages, readers find real journeys—stories of risk-taking, breakthrough moments, lessons learned, and the courage required to build something meaningful. The Entrepreneurial Chronicles continues to evolve with each story we publish, staying committed to celebrating the spirit of entrepreneurship and giving a voice to those who shape the future through their ideas and determination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        }

        @media (max-width: 575px) {
          .about-us-page .page-title {
            font-size: 24px !important;
          }

          .about-us-page .about-hero-desc {
            font-size: 15px !important;
            line-height: 26px !important;
          }
        }
      `}</style>
      <FooterTwo />
    </div>
  );
};

export default AboutUs;

export async function getStaticProps() {
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
}
