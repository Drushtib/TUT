import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";
import styles from "../../styles/footer.module.css";
import UnicornLogo from "../../../public/assest/Logo_The Unicorn Times_White.png";
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

  return (
    <footer
      className="page-footer bg-grey-dark-key"
      style={{ color: "white", paddingBottom: "1px", background: "linear-gradient(180deg, #1F1F1F 0%, #141414 100%)" }}
    >
      <style jsx>{`
        .footer-description-paragraph {
          word-spacing: -1px !important;
          letter-spacing: -0.3px !important;
        }
        .newsletter-subscribe-button {
          color: #fff !important;
          background-color: var(--primary-color) !important;
        }
        .newsletter-subscribe-button:hover {
          color: #fff !important;
          background-color: rgba(187, 5, 5, 0.9) !important;
        }

        .page-footer input::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.7) !important;
          opacity: 1 !important;
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

        .page-footer .new-footer-links li,
        .page-footer .new-footer-links li a,
        .page-footer .new-footer-links li a:visited,
        .page-footer .new-footer-links li a:active {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          opacity: 1 !important;
        }

        .new-footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1.25fr;
          gap: 2rem;
          padding: 2.1rem 2rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .new-footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 2rem 1.5rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .new-footer-grid {
            grid-template-columns: 1fr;
            padding: 1.8rem 1.25rem 1.25rem;
          }
        }

        .new-footer-quicklinks {
          padding-left: 18px;
        }

        @media (max-width: 1024px) {
          .new-footer-quicklinks {
            padding-left: 10px;
          }
        }

        .new-footer-title {
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
          font-size: 1.5rem;
          position: relative;
          display: inline-block;
        }

        .new-footer-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 72px;
          height: 2px;
          background: rgba(255, 255, 255, 0.85);
        }

        .new-footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .new-footer-logo-img {
          width: 300px;
          height: auto;
          object-fit: contain;
          max-width: 100%;
          max-height: 100px;
        }

        @media (max-width: 640px) {
          .new-footer-logo-img {
            width: 250px;
          }
        }

        .new-footer-desc {
          margin: 0;
          color: rgba(255, 255, 255, 0.92) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.92) !important;
          color: rgba(255, 255, 255, 0.82) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.82) !important;
          font-weight: 300;
          line-height: 1.7;
          max-width: 52ch;
        }

        .new-footer-links {
          list-style: none;
          padding: 0;
          margin: 0.9rem 0 0;
          display: grid;
          gap: 0.6rem;
        }

        .new-footer-links a {
          text-decoration: none;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 300;
          opacity: 0.92;
          transition: color 0.2s ease;
        }

        .new-footer-links a:hover {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
          opacity: 1;
        }

        .new-footer-links li:hover,
        .new-footer-links li:hover a {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
          opacity: 1 !important;
        }

        .new-footer-social {
          display: flex;
          gap: 0.55rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }

        .new-footer-social a {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
        }

        .new-footer-social a:hover {
          transform: translateY(-2px);
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        .new-footer-social i {
          font-size: 16px !important;
        }

        .new-footer-contact {
          margin-top: 0.75rem;
          display: grid;
          gap: 0.85rem;
        }

        .new-footer-contact-inline {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .new-footer-contact-inline-wrap {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
          white-space: normal;
        }

        .new-footer-contact-label {
          font-weight: 600;
          flex: 0 0 auto;
        }

        .new-footer-contact-inline a {
          white-space: nowrap;
        }

        .new-footer-contact-item {
          display: grid;
          grid-template-columns: 22px 1fr;
          gap: 10px;
          align-items: start;
          color: rgba(255, 255, 255, 0.85) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 300;
          line-height: 1.55;
        }

        .new-footer-contact-item i {
          color: rgba(255, 255, 255, 0.9) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.9) !important;
          font-size: 16px;
          margin-top: 2px;
        }

        .new-footer-contact-item:hover {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        .new-footer-contact-item:hover i {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        .new-footer-contact-item:hover a,
        .new-footer-contact-item:hover span {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        .new-footer-contact-item a {
          color: rgba(255, 255, 255, 0.92) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.92) !important;
          text-decoration: none;
          font-weight: 400;
        }

        .new-footer-contact-item a:hover {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        .new-footer-note {
          margin-top: 1.1rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
        }

        .new-footer-note-title {
          font-weight: 800;
          margin: 0 0 6px;
        }

        .new-footer-note-text {
          margin: 0;
          color: rgba(255, 255, 255, 0.82) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.82) !important;
          font-weight: 300;
          line-height: 1.6;
        }

        .new-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          padding: 0.85rem 1rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.8) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.8) !important;
          font-weight: 300;
        }
      `}</style>
      
      {/* Newsletter Section - Full Width at Top */}
      <div style={{
        width: "100%",
        padding: "0 1rem 0",
        backgroundColor: "#1F1F1F",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", padding: "0 0 1rem 0", marginTop: "-8px" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{ color: "white", fontSize: "2.1rem", fontWeight: "bold", marginTop: 0, marginBottom: "0.3rem", fontStyle: "initial" }}>
                Join The Newsletter
              </h3>
              <p style={{ color: "white", fontSize: "1.3rem", fontWeight: 200, margin: 0 }}>
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
                    padding: "0.75rem 1rem",
                    backgroundColor: "#1F1F1F",
                    border: "1px solid #fff",
                    borderRight: "none",
                    borderRadius: "8px 0 0 8px",
                  color: "white",
                  fontSize: "1.2rem",
                  outline: "none",
                    transition: "all 0.3s ease",
                    height: "40px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#fff";
                    e.target.style.backgroundColor = "#1F1F1F";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#fff";
                    e.target.style.backgroundColor = "#1F1F1F";
                  }}
                />
                <button
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  disabled={isSubmitting}
                  className="newsletter-subscribe-button"
                  style={{
                    padding: "0.75rem 2.4rem",
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                    border: "1px solid var(--primary-color)",
                    borderLeft: "none",
                  borderRadius: "0 8px 8px 0",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                    whiteSpace: "nowrap",
                    height: "40px",
                    boxSizing: "border-box",
                    minWidth: "150px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "rgba(187, 5, 5, 0.9)";
                      e.target.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "var(--primary-color)";
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
      <div className={`${styles.footer_start} new-footer-grid`}>
        <div>
          <Link href="/" className="new-footer-logo">
            <Image
              src={UnicornLogo}
              alt="The Unicorn Times"
              className="new-footer-logo-img"
              width={300}
              height={100}
              style={{ objectFit: "contain" }}
              priority={false}
            />
          </Link>
          <p className="new-footer-desc">
            A modern business magazine covering founders, markets, and the ideas shaping tomorrow—curated with clarity, depth, and a bias for action. Explore curated market updates, deep-dive stories, interviews, and practical insights designed to help you stay ahead.
          </p>

          <div className="new-footer-social" aria-label="Social links">
            <a href={SocialLink.fb.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className={SocialLink.fb.icon} />
            </a>
            <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className={SocialLink.instagram.icon} />
            </a>
            <a href={SocialLink.twitter.url} target="_blank" rel="noopener noreferrer" aria-label="X">
              <i className={SocialLink.twitter.icon} />
            </a>
            <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className={SocialLink.linked.icon} />
            </a>
            <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className={SocialLink.yt.icon} />
            </a>
          </div>
        </div>

        <div className="new-footer-quicklinks">
          <h4 className="new-footer-title">Quick Links</h4>
          <ul className="new-footer-links footer-bottom-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/magazines">Magazines</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/guest-post">Guest Post</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="new-footer-title">Contact</h4>
          <div className="new-footer-contact">
            <div className="new-footer-contact-item">
              <i className="fas fa-envelope" />
              <div>
                <div className="new-footer-contact-inline">
                  <span className="new-footer-contact-label">Email:</span>
                  <a href="mailto:info@theentrepreneurialchronicle.com">info@theentrepreneurialchronicle.com</a>
                </div>
              </div>
            </div>

            <div className="new-footer-contact-item">
              <i className="fas fa-phone" />
              <div>
                <div className="new-footer-contact-inline">
                  <span className="new-footer-contact-label">Phone:</span>
                  <a href="tel:+16146022959">+1 (614) 602-2959</a>
                </div>
              </div>
            </div>

            <div className="new-footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <div>
                <div className="new-footer-contact-inline-wrap">
                  <span className="new-footer-contact-label">USA:</span>
                  <span>6605 Longshore St, Dublin, OH 43017, USA</span>
                </div>
              </div>
            </div>

            <div className="new-footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <div>
                <div className="new-footer-contact-inline-wrap">
                  <span className="new-footer-contact-label">Germany:</span>
                  <span>Heßstraße 36, 80798 München, Germany</span>
                </div>
              </div>
            </div>

            <div className="new-footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <div>
                <div className="new-footer-contact-inline-wrap">
                  <span className="new-footer-contact-label">Home Address:</span>
                  <span>Office no 328B, Gera Imperium Rise, Wipro Circle, Hinjewadi Phase 2, Pune</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new-footer-bottom">
        © {new Date().getFullYear()} The Unicorn Times. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterTwo;
