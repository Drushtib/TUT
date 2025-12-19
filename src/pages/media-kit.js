import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import Breadcrumb from "../components/common/Breadcrumb";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MediaKitPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );

      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const images = [
    { src: "/images/mediakit1.jpg", alt: "Media Kit 1", direction: "none" },
    { src: "/images/mediakit2.jpg", alt: "Media Kit 2", direction: "left" },
    { src: "/images/mediakit3.jpg", alt: "Media Kit 3", direction: "right" },
    { src: "/images/mediakit4.jpg", alt: "Media Kit 4", direction: "left" },
    { src: "/images/mediakit5.jpg", alt: "Media Kit 5", direction: "right" },
    { src: "/images/mediakit6.jpg", alt: "Media Kit 6", direction: "left" },
    { src: "/images/mediakit7.jpg", alt: "Media Kit 7", direction: "right" },
  ];

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <HeadMeta
        metaTitle="Media Kit | The Unicorn Time"
        metaDesc="Download our media kit to learn more about advertising opportunities and editorial features in The Unicorn Time."
      />

      <HeaderOne />
      <Breadcrumb aPage="Media Kit" />

      <div
        style={{
          width: "100%",
          padding: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[`image${index}`] = el)}
            style={{
              width: "100%",
              opacity: image.direction === "none" ? 1 : (isVisible[`image${index}`] ? 1 : 0),
              transform: image.direction === "none" 
                ? "none" 
                : isVisible[`image${index}`]
                ? "translateX(0)"
                : image.direction === "left"
                ? "translateX(-100px)"
                : "translateX(100px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={2560}
              layout="responsive"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <FooterTwo />
    </div>
  );
};

export default MediaKitPage;

