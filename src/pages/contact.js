import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";

import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const ContactPage = () => {
  const router = useRouter();

  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    companyName: "",
    industry: "",
    address: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setFormData({
      name: "",
      email: "",
      contactNo: "",
      companyName: "",
      industry: "",
      address: "",
      message: "",
    });

    requestAnimationFrame(() => {
      if (successRef.current && typeof successRef.current.scrollIntoView === "function") {
        successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  useEffect(() => {
    if (!submitSuccess) return;
    const t = setTimeout(() => setSubmitSuccess(false), 2500);
    return () => clearTimeout(t);
  }, [submitSuccess]);

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
    <div style={{ background: '#ffffff', color: '#171717', minHeight: '100vh' }}>
      <HeadMeta
        metaTitle="Contact Us | The Unicorn Time"
        metaDesc="Share your entrepreneurial journey and inspire others with The Unicorn Time. Connect with a global community of business leaders, innovators, and changemakers by contributing your unique story and insights."
      />

      <HeaderOne />

      <div className="contact-page-section" style={{ padding: "2.5rem 0 1rem" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="contact-page-heading">Contact Us</div>
          <div className="row" style={{ alignItems: "stretch" }}>
            <div className="col-lg-6" style={{ marginBottom: "1.5rem" }}>
              <div className="contact-card contact-card-left">
                <h2 className="contact-card-title">Send Us a Message</h2>
                <p className="contact-card-subtitle">Fill in the details and we’ll get back to you.</p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="contact-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="contact-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="contactNo">Contact No.</label>
                      <input
                        id="contactNo"
                        name="contactNo"
                        type="tel"
                        className="contact-input contact-input--square"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="companyName">Company Name</label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        className="contact-input"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="industry">Industry</label>
                      <input
                        id="industry"
                        name="industry"
                        type="text"
                        className="contact-input"
                        value={formData.industry}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="contact-label" htmlFor="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="contact-input"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="contact-label" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="contact-textarea"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    {submitSuccess && (
                      <div
                        ref={successRef}
                        className="contact-success"
                        role="status"
                        aria-live="polite"
                      >
                        Form submitted successfully.
                      </div>
                    )}
                    <button type="submit" className="contact-submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6" style={{ marginBottom: "1.5rem" }}>
              <div className="contact-card contact-card-right">
                <h2 className="contact-card-title">Contact Information</h2>
                <p className="contact-card-subtitle">Reach us through any of the following.</p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <span className="contact-info-icon"><i className="fas fa-map-marker-alt" /></span>
                    <div>
                      <div className="contact-info-heading">USA</div>
                      <div className="contact-info-text">6605 Longshore St, Dublin, OH 43017, USA</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon"><i className="fas fa-map-marker-alt" /></span>
                    <div>
                      <div className="contact-info-heading">Germany</div>
                      <div className="contact-info-text">Heßstraße 36, 80798 München, Germany</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon"><i className="fas fa-map-marker-alt" /></span>
                    <div>
                      <div className="contact-info-heading">Home Address</div>
                      <div className="contact-info-text">328B, Gera Imperium Rise, Wipro Circle, Pune, India</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon"><i className="fas fa-phone" /></span>
                    <div>
                      <div className="contact-info-heading">Phone</div>
                      <a className="contact-info-link" href="tel:+16146022959">+1 (614) 602-2959</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon"><i className="fas fa-envelope" /></span>
                    <div>
                      <div className="contact-info-heading">Email</div>
                      <a className="contact-info-link" href="mailto:info@theunicorntimes.com">info@theunicorntimes.com</a>
                    </div>
                  </div>
                </div>

                <div className="contact-note">
                  <div className="contact-note-title">We’re Available 24/7</div>
                  <div className="contact-note-text">Drop your message and our team will respond soon.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-gap our-location section-gap-top__with-text" style={{ background: '#ffffff', color: '#171717', paddingTop: "2.25rem", paddingBottom: "2.5rem" }}>
        <div className="container">
          <div className="section-title" style={{ color: '#171717', textAlign: 'center', paddingTop: '0.5rem', width: '100%' }}>
            <h2 className="axil-title m-b-xs-40" style={{ color: '#000000', WebkitTextFillColor: '#000000', textAlign: 'center', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>Our Locations</h2>
          </div> 
          {/* End of .section-title */}
        </div>
        {/* End of .container */}
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="row" style={{ rowGap: "1.5rem" }}>
            <div className="col-lg-6" id="usa-map">
              <div className="map-card">
                <iframe
                  src="https://www.google.com/maps?q=6605+Longshore+St,+Dublin,+OH+43017,+USA&output=embed"
                  width="100%"
                  height={320}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="6605 Longshore St, Dublin, OH 43017, USA"
                />
                <div style={{ textAlign: 'center', padding: '10px', background: '#f8f9fa' }}>
                  <a
                    href="https://www.google.com/maps?q=6605+Longshore+St,+Dublin,+OH+43017,+USA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#000000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary-color)';
                      e.currentTarget.style.backgroundColor = 'rgba(187, 5, 5, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-external-link-alt" style={{ fontSize: '12px' }} />
                    View large map
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6" id="germany-map">
              <div className="map-card">
                <iframe
                  src="https://www.google.com/maps?q=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany&output=embed"
                  width="100%"
                  height={320}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Heßstraße 36, 80798 München, Germany"
                />
                <div style={{ textAlign: 'center', padding: '10px', background: '#f8f9fa' }}>
                  <a
                    href="https://www.google.com/maps?q=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#000000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary-color)';
                      e.currentTarget.style.backgroundColor = 'rgba(187, 5, 5, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-external-link-alt" style={{ fontSize: '12px' }} />
                    View large map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End of .container */}
      </div>

      <style jsx global>{`
        body .contact-page-section {
          background: #ffffff !important;
        }

        body .contact-page-section,
        body .contact-page-section * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }

        body .contact-page-section .contact-card-subtitle,
        body .contact-page-section .contact-info-text,
        body .contact-page-section .contact-note-text {
          color: rgba(0, 0, 0, 0.75) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.75) !important;
        }

        body .contact-page-section .contact-input::placeholder,
        body .contact-page-section .contact-textarea::placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.55) !important;
          opacity: 1;
        }

        body .contact-page-section .contact-submit,
        body .contact-page-section .contact-submit * {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        body .contact-page-section .contact-info-icon,
        body .contact-page-section .contact-info-icon * {
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        body .contact-page-section .contact-success {
          background: rgba(76, 175, 80, 0.12) !important;
          border: 1px solid rgba(76, 175, 80, 0.40) !important;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .contact-page-heading {
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 18px;
          line-height: 1.1;
          text-align: center;
          padding-bottom: 1.5rem;
        }

        .contact-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 24px;
          border: 2px solid rgba(187, 5, 5, 0.22);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.14);
          height: 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .contact-card:hover {
          transform: translateY(-3px);
          border-color: rgba(187, 5, 5, 0.35);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
        }

        .contact-success {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          animation: slideDown 0.25s ease-out both;
          position: relative;
          z-index: 2;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-card-title {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          color: #000000;
        }

        .contact-card-subtitle {
          margin: 10px 0 20px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
        }

        .contact-label {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: #000000;
          margin: 0 0 6px;
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          background: #ffffff;
          color: #000000 !important;
          border: 1.5px solid var(--primary-color) !important;
          border-radius: 10px;
          padding: 12px 12px;
          margin-bottom: 14px;
          outline: none;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .contact-input--square {
          border-radius: 0 !important;
        }

        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
          opacity: 1;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 4px rgba(187, 5, 5, 0.10), 0 12px 28px rgba(0, 0, 0, 0.10);
          transform: translateY(-1px);
        }

        .contact-submit {
          width: 100%;
          background: var(--primary-color);
          color: #ffffff !important;
          border: none;
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .contact-submit * {
          color: #ffffff !important;
        }

        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(187, 5, 5, 0.25);
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
        }

        .contact-info-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .contact-info-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(187, 5, 5, 0.08);
          color: var(--primary-color);
          flex-shrink: 0;
        }

        .contact-info-icon i {
          color: var(--primary-color) !important;
        }

        .contact-info-heading {
          font-weight: 800;
          color: #000000;
          margin-bottom: 2px;
        }

        .contact-info-text {
          color: rgba(0, 0, 0, 0.75);
          line-height: 1.35;
        }

        .contact-info-link {
          color: #000000;
          text-decoration: none;
          font-weight: 700;
        }

        .contact-info-link:hover {
          color: var(--primary-color);
        }

        .contact-note {
          margin-top: 18px;
          padding: 14px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .contact-note-title {
          font-weight: 900;
          color: #000000;
          margin-bottom: 4px;
        }

        .contact-note-text {
          color: rgba(0, 0, 0, 0.70);
        }

        .map-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.10);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.10);
        }

        .map-card .view-map-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          background: #f8f9fa;
          border: none;
          border-radius: 6px;
          color: #000000;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .map-card .view-map-link:hover {
          color: var(--primary-color);
          background: rgba(187, 5, 5, 0.1);
        }

        body .our-location .section-title,
        body .our-location .section-title * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          opacity: 1 !important;
        }

        body .our-location .axil-title {
          display: inline-block !important;
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        body .our-location .section-title {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }

        .contact-card-left {
          animation: slideInLeft 0.7s ease-out both;
        }

        .contact-card-right {
          animation: slideInRight 0.7s ease-out both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-26px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(26px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 991px) {
          .contact-page-section {
            padding: 1.5rem 0 0.5rem !important;
          }

          .contact-page-heading {
            font-size: 26px;
            margin-bottom: 14px;
          }

          .contact-card {
            padding: 18px;
            border-radius: 16px;
          }

          .contact-card-title {
            font-size: 22px;
          }

          .contact-card-subtitle {
            margin: 8px 0 16px;
          }

          .contact-info-text {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            line-height: 1.4;
          }
        }

        @media (max-width: 768px) {
          .contact-page-section {
            padding: 1rem 0 0.5rem !important;
          }

          .contact-page-heading {
            font-size: 22px;
            margin-bottom: 12px;
          }

          .contact-card {
            padding: 14px;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          .contact-card-title {
            font-size: 20px;
          }

          .contact-card-subtitle {
            margin: 6px 0 12px;
            font-size: 13px;
          }

          .contact-info-item {
            gap: 10px;
          }

          .contact-info-icon {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .contact-info-heading {
            font-size: 14px;
          }

          .contact-info-text {
            font-size: 13px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            line-height: 1.3;
          }

          .contact-info-link {
            font-size: 13px;
          }

          .contact-note {
            margin-top: 12px;
            padding: 10px;
          }

          .contact-note-title {
            font-size: 13px;
          }

          .contact-note-text {
            font-size: 12px;
          }

          .map-card iframe {
            height: 250px !important;
          }

          .map-card .view-map-link {
            font-size: 13px;
            padding: 6px 10px;
          }
        }

        @media (max-width: 575px) {
          .contact-page-section {
            padding: 0.75rem 0 0.25rem !important;
          }

          .contact-page-heading {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .contact-card {
            padding: 12px;
            border-radius: 10px;
            margin-bottom: 0.75rem;
          }

          .contact-card-title {
            font-size: 18px;
          }

          .contact-card-subtitle {
            margin: 4px 0 10px;
            font-size: 12px;
          }

          .contact-info-item {
            gap: 8px;
            align-items: flex-start;
          }

          .contact-info-icon {
            width: 28px;
            height: 28px;
            font-size: 12px;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .contact-info-heading {
            font-size: 13px;
            margin-bottom: 1px;
          }

          .contact-info-text {
            font-size: 12px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            line-height: 1.25;
          }

          .contact-info-link {
            font-size: 12px;
            word-break: break-all;
          }

          .contact-note {
            margin-top: 10px;
            padding: 8px;
          }

          .contact-note-title {
            font-size: 12px;
          }

          .contact-note-text {
            font-size: 11px;
          }

          .contact-input,
          .contact-textarea {
            border-radius: 8px;
            padding: 10px 11px;
            font-size: 14px;
          }

          .contact-label {
            font-size: 12px;
            margin-bottom: 4px;
          }

          .contact-submit {
            padding: 10px 14px;
            font-size: 13px;
          }

          .map-card iframe {
            height: 200px !important;
          }

          .map-card .view-map-link {
            font-size: 12px;
            padding: 5px 8px;
          }

          .container {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
        }

        @media (max-width: 480px) {
          .contact-info-text {
            font-size: 11px;
            line-height: 1.2;
          }

          .contact-card {
            padding: 10px;
          }

          .map-card iframe {
            height: 180px !important;
          }

          .map-card .view-map-link {
            font-size: 11px;
            padding: 4px 6px;
          }
        }
      `}</style>
      <FooterTwo />
    </div>
  );
};

export default ContactPage;
