import Image from "next/image";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";

import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import emailjs from "@emailjs/browser";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

const ContactPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Handle scroll to map when hash is present in URL
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [router.asPath]);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <HeadMeta
        metaTitle="Connect and Share Your Story with The Entrepreneurial Chronicles Magazine
"
        metaDesc="Share your entrepreneurial journey and inspire others with The Entrepreneurial Chronicles Magazine. Connect with a global community of business leaders, innovators, and changemakers by contributing your unique story and insights."
      />

      <HeaderOne />
      <Breadcrumb aPage="Contact Us" />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 0",
        }}
      >
        {/* Background Image with Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('/images/Contact_us.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
            // filter: "brightness(0.8)", // Darken the image
          }}
        ></div>

        <div
          style={{
            width: "90%",
            height: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 1rem",
            color: "white",
          }}
        >
          <p
            style={{
              fontSize: "4rem",
              fontWeight: "bolder",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            Contact Us
          </p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "lighter",
              color: "white",
            }}
          >
            Welcome to The Entrepreneurial Chronicles Magazine, where we
            spotlight trailblazers from all sectors transforming the business
            magazine landscape. Our mission is to inspire and empower new
            leaders with groundbreaking ideas worldwide. Count on us for
            reliable insights, advice, and industry trends, supporting both
            established and aspiring leaders.
          </p>
        </div>
      </div>
      {/* <BreadcrumbBanner pageTitle="Contact Us" /> */}

      <div className="contact-form section-gap" style={{ background: '#000', color: '#fff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <ContactForm />
            </div>
            <div className="col-lg-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <div className="section-gap our-location section-gap-top__with-text" style={{ background: '#000', color: '#fff' }}>
        <div className="container">
          <div className="section-title" style={{ color: '#fff' }}>
            <h2 className="axil-title m-b-xs-40" style={{ color: '#fff' }}>Our Locations</h2>
          </div> 
          {/* End of .section-title */}
        </div>
        {/* End of .container */}
        <div className="container">
          <div style={{ 
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch"
          }}>
            {/* USA Location Map */}
            <div id="usa-map" style={{ 
              flex: "1 1 45%",
              minWidth: "300px",
              marginBottom: "2rem"
            }}>
              <div className="axil-map-wrapper" style={{ 
                width: "100%", 
                border: "2px solid #D4AF37",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
              }}>
                <iframe
                  src="https://www.google.com/maps?q=6605+Longshore+St,+Dublin,+OH+43017,+USA&output=embed"
                  width="100%"
                  height={350}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="6605 Longshore St, Dublin, OH 43017, USA"
                />
              </div>
            </div>

            {/* Germany Location Map */}
            <div id="germany-map" style={{ 
              flex: "1 1 45%",
              minWidth: "300px",
              marginBottom: "2rem"
            }}>
              <div className="axil-map-wrapper" style={{ 
                width: "100%", 
                border: "2px solid #D4AF37",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
              }}>
                <iframe
                  src="https://www.google.com/maps?q=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany&output=embed"
                  width="100%"
                  height={350}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Heßstraße 36, 80798 München, Germany"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End of .container */}
      </div>
      <FooterTwo />
    </div>
  );
};

export default ContactPage;
