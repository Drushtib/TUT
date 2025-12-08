import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";
import styles from "../../styles/footer.module.css";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../common/Loader";
import { client } from "../../client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const FooterTwo = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail("");
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };
  const query = `
*[_type == "magazine"] 
{
  title,
  slug,
  'featureImg': mainImage.asset->url,
  publishedAt
 
} | order(publishedAt desc)[0...6] 
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["magazines"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  if (!data) return null;

  return (
    <footer
      className="page-footer bg-grey-dark-key"
      style={{ color: "white", paddingBottom: "1px", backgroundColor: "#000" }}
    >
      <style jsx>{`
        .footer-description-paragraph {
          word-spacing: -1px !important;
          letter-spacing: -0.3px !important;
        }
        .newsletter-subscribe-button {
          color: #000 !important;
          background-color: #fff !important;
        }
        .newsletter-subscribe-button:hover {
          color: #000 !important;
          background-color: #f0f0f0 !important;
        }
        .footer-social-share i {
          font-size: 20px !important;
        }
        .social-share i {
          font-size: 20px !important;
        }
        .page-footer,
        .page-footer * {
          color: white !important;
        }
        .page-footer a {
          color: white !important;
        }
        .page-footer .footer-bottom-links,
        .page-footer .footer-bottom-links li,
        .page-footer .footer-bottom-links a,
        .page-footer .footer-bottom-links li a,
        .footer-bottom-links,
        .footer-bottom-links li,
        .footer-bottom-links a,
        .footer-bottom-links li a,
        .bg-grey-dark-key .footer-bottom-links,
        .bg-grey-dark-key .footer-bottom-links li,
        .bg-grey-dark-key .footer-bottom-links a,
        .bg-grey-dark-key .footer-bottom-links li a {
          color: white !important;
        }
        .page-footer p,
        .page-footer .footer-bottom-links p {
          color: white !important;
        }
        .page-footer h4,
        .page-footer .footer-bottom-links h4 {
          color: white !important;
        }
        .page-footer li,
        .page-footer .footer-bottom-links li {
          color: white !important;
        }
        .page-footer ul.footer-bottom-links li a {
          color: white !important;
        }
      `}</style>
      
      {/* Newsletter Section - Full Width at Top */}
      <div style={{
        width: "100%",
        padding: "0 2rem",
        backgroundColor: "#000",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", padding: "0 0 2rem 0" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{ color: "white", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", fontStyle: "initial" }}>
                Join The Newsletter
              </h3>
              <p style={{ color: "white", fontSize: "1.6rem", fontWeight: 200 }}>
                Subscribe to our newsletter now and stay informed!
              </p>
            </div>
            <div style={{ flex: "1 1 400px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  style={{
                    flex: "1",
                    padding: "1rem 1.2rem",
                    backgroundColor: "#000",
                    border: "1px solid #fff",
                    borderRight: "none",
                    borderRadius: "8px 0 0 8px",
                  color: "white",
                  fontSize: "1.3rem",
                  outline: "none",
                    transition: "all 0.3s ease",
                    height: "48px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#fff";
                    e.target.style.backgroundColor = "#000";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#fff";
                    e.target.style.backgroundColor = "#000";
                  }}
                />
                <button
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  disabled={isSubmitting}
                  className="newsletter-subscribe-button"
                  style={{
                    padding: "1rem 3.5rem",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #fff",
                    borderLeft: "none",
                  borderRadius: "0 8px 8px 0",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                    whiteSpace: "nowrap",
                    height: "48px",
                    boxSizing: "border-box",
                    minWidth: "180px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "#f0f0f0";
                      e.target.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
                </button>
              </div>
              {isSubscribed && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(76, 175, 80, 0.15)",
                    border: "2px solid #4CAF50",
                    borderRadius: "8px",
                    color: "#4CAF50",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "500",
                    width: "auto",
                    maxWidth: "300px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  ✓ Thank you for subscribing!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* White Separator Line */}
      <div style={{
        width: "100%",
        height: "1px",
        backgroundColor: "#fff",
      }} />

      {/* Main Footer Content - 4 Columns */}
      <div
        className={`${styles.footer_start} footer_start`}
        style={{
          display: "flex",
          gap: "2rem",
          marginRight: "2rem",
          marginLeft: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "3rem",
          paddingBottom: "2rem",
        }}
      >
        {/* Column 1: Logo + Description + Social Icons */}
        <div className="logo" style={{ flex: "1 1 280px", minWidth: "280px", maxWidth: "350px" }}>
          <div className="footer-logo-container">
            <Link href="/">
              <Image
                src="/logos/logo-primary-white.png"
                alt="brand-logo"
                width={400}
                height={133}
                style={{ objectFit: "contain", marginBottom: "1.5rem" }}
              />
            </Link>
            <p className="footer-description-paragraph" style={{ width: "100%", color: "white", fontWeight: 200, lineHeight: "1.4", textAlign: "justify", wordSpacing: "-1px", letterSpacing: "-0.3px", marginTop: "-0.5rem", marginBottom: "2rem" }}>
              The Entrepreneurial Chronicles is a business magazine that shares
              inspiring success stories of entrepreneurs, transforming intriguing
              tales into captivating narratives. With a skilled storytelling team
              and extensive industry expertise, we amplify untold stories from the
              business world, making our magazine both compelling and insightful.
            </p>

            {/* Social Media Icons */}
            <div
              className="footer-social-share"
              style={{ marginTop: "1.5rem", perspective: "1000px", padding: "10px 0", overflow: "visible" }}
            >
              <div className="axil-social-title" style={{ fontWeight: 400, marginBottom: "0.8rem" }}>
                Social Media :
              </div>
              <ul className="social-share social-share__with-bg" style={{ 
                listStyle: "none", 
                padding: "10px 0", 
                display: "flex", 
                gap: "0.5rem", 
                flexWrap: "nowrap",
                overflow: "visible"
              }}>
                <li style={{ perspective: "1000px", transition: "all 0.3s ease", padding: "5px", overflow: "visible" }}>
                  <a 
                    href={SocialLink.fb.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      overflow: "visible"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateZ(20px) scale(1.3)";
                      e.currentTarget.style.backgroundColor = "#1877F2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0) scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <i className={SocialLink.fb.icon} style={{ fontSize: "20px" }} />
                  </a>
                </li>
                <li style={{ perspective: "1000px", transition: "all 0.3s ease", padding: "5px", overflow: "visible" }}>
                  <a 
                    href={SocialLink.twitter.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      overflow: "visible"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateZ(20px) scale(1.3)";
                      e.currentTarget.style.backgroundColor = "#1DA1F2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0) scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <i className={SocialLink.twitter.icon} style={{ fontSize: "20px" }} />
                  </a>
                </li>
                <li style={{ perspective: "1000px", transition: "all 0.3s ease", padding: "5px", overflow: "visible" }}>
                  <a 
                    href={SocialLink.yt.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      overflow: "visible"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateZ(20px) scale(1.3)";
                      e.currentTarget.style.backgroundColor = "#FF0000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0) scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <i className={SocialLink.yt.icon} style={{ fontSize: "20px" }} />
                  </a>
                </li>
                <li style={{ perspective: "1000px", transition: "all 0.3s ease", padding: "5px", overflow: "visible" }}>
                  <a 
                    href={SocialLink.linked.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      overflow: "visible"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateZ(20px) scale(1.3)";
                      e.currentTarget.style.backgroundColor = "#0077B5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0) scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <i className={SocialLink.linked.icon} style={{ fontSize: "20px" }} />
                  </a>
                </li>
                <li style={{ perspective: "1000px", transition: "all 0.3s ease", padding: "5px", overflow: "visible" }}>
                  <a 
                    href={SocialLink.pinterest.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      overflow: "visible"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateZ(20px) scale(1.3)";
                      e.currentTarget.style.backgroundColor = "#BD081C";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0) scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <i className={SocialLink.pinterest.icon} style={{ fontSize: "20px" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
          <h4
            style={{
              color: "white",
              fontWeight: "bold",
              position: "relative",
              fontStyle: "initial",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            QUICK LINKS
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: "1px",
                backgroundColor: "white",
              }}
            />
          </h4>
          <ul
            style={{ 
              color: "white", 
              fontWeight: 200, 
              fontSize: "medium",
              listStyle: "none",
              padding: 0,
              lineHeight: "2",
              textAlign: "center"
            }}
            className="footer-bottom-links"
          >
            <li style={{ color: "white" }}>
              <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
            </li>
            <li style={{ color: "white" }}>
              <Link href="/magazines" style={{ color: "white", textDecoration: "none" }}>Magazine</Link>
            </li>
            <li style={{ color: "white" }}>
              <Link href="/about-us" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
            </li>
          
            <li style={{ color: "white" }}>
              <Link href="/blogs" style={{ color: "white", textDecoration: "none" }}>Blogs</Link>
            </li>
            <li style={{ color: "white" }}>
              <Link href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact Us</Link>
            </li>
            <li style={{ color: "white" }}>
              <Link href="/guest-post" style={{ color: "white", textDecoration: "none" }}>Guest Post</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Magazines */}
        <div style={{ flex: "1 1 250px", minWidth: "250px", textAlign: "center" }}>
          <h4
            style={{
              color: "white",
              fontWeight: "bold",
              fontStyle: "initial",
              position: "relative",
              marginBottom: "1.5rem",
            }}
          >
            MAGAZINES
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40%",
                height: "1px",
                backgroundColor: "white",
              }}
            />
          </h4>
          <Carousel indicators={false}>
            {data.map((mag, index) => {
              return (
                <Carousel.Item key={index}>
                  <Image
                    src={mag.featureImg}
                    width={500}
                    height={200}
                    alt="magazines"
                    className="object-fit-contain"
                    style={{ width: "100%", height: "auto", maxWidth: "250px", margin: "0 auto" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>

         {/* Column 4: Contact Info + Social Links */}
         <div className="footer-social-share-wrapper" style={{ flex: "1 1 250px", minWidth: "250px" }}>
           <h4
             style={{
               color: "white",
               fontWeight: "bold",
               fontStyle: "initial",
               position: "relative",
               marginBottom: "1.5rem",
             }}
           >
             CONTACT US
           </h4>
           <div
             style={{
               width: "50%",
               height: "1px",
               backgroundColor: "white",
               marginBottom: "1.5rem",
               marginLeft: "0",
             }}
           />
           <div
             className="mail"
             style={{ fontWeight: 400, marginBottom: "1rem", lineHeight: "1.6" }}
           >
             Reach Us:
             <a
               href="mailto:info@theentrepreneurialchronicle.com"
               className="bold"
               style={{ display: "block", marginTop: "0.25rem", color: "white" }}
             >
               Info@theentrepreneurialchronicle.com
             </a>
           </div>

           <div
             className="number"
             style={{ fontWeight: 400, marginBottom: "1rem", lineHeight: "1.6" }}
           >
             Call Us :
             <a href="tel:+1 (614) 602-2959" style={{ display: "block", marginTop: "0.25rem", color: "white" }}> +1 (614) 602-2959</a>
           </div>

           <a 
             href="https://www.google.com/maps/search/?api=1&query=6605+Longshore+St,+Dublin,+OH+43017,+USA" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ textDecoration: "none", color: "white" }}
           >
             <div className="axil-social-title" style={{ fontWeight: 400, marginBottom: "1rem", lineHeight: "1.6", cursor: "pointer" }}>
               6605 Longshore st, Dublin
               <br />
               OH 43017, USA
             </div>
           </a>
           <a 
             href="https://www.google.com/maps/search/?api=1&query=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ textDecoration: "none", color: "white" }}
           >
             <div className="axil-social-title" style={{ fontWeight: 400, marginBottom: "1rem", lineHeight: "1.6", cursor: "pointer" }}>
               Heßstraße 36, 80798 München, Germany
             </div>
           </a>
           <div className="axil-social-title" style={{ fontWeight: 400, marginBottom: "1.5rem", lineHeight: "1.6" }}>
             Home Branch - office no 328B, Gera imperium Rise, Wipro circle, opp to wipro company, Hinjewadi phase 2, Pune
           </div>
         </div>
      </div>
       <p style={{ textAlign: "center", marginTop: "1.5rem", fontWeight: 400, color: "white" }}>
         &copy;Copyright 2025 | The Entrepreneurial Chronicles| All Rights
         Reserved.
       </p>
    </footer>
  );
};

export default FooterTwo;
