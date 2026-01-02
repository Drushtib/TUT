import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30" style={{ background: '#171717', color: '#fff' }}>
      <div className="axil-contact-info-inner" style={{ color: '#fff', background: 'transparent' }}>
        <h2 className="h4 m-b-xs-10" style={{ color: '#fff' }}>Contact Information</h2>
        <div className="axil-contact-info" style={{ color: '#fff' }}>
          <address className="address">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=6605+Longshore+St,+Dublin,+OH+43017,+USA" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: '10px' }}
              className="mid m-b-xs-30"
            >
              <i className="fas fa-map-marker-alt" style={{ color: '#D4AF37', marginTop: '4px', flexShrink: 0 }} />
              <span>
                6605 Longshore st, Dublin
                <br />
                OH 43017, USA
              </span>
            </a>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: '10px' }}
              className="mid m-b-xs-30"
            >
              <i className="fas fa-map-marker-alt" style={{ color: '#D4AF37', marginTop: '4px', flexShrink: 0 }} />
              <span>
                Heßstraße 36, 80798 München, Germany
              </span>
            </a>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=office+no+328B,+Gera+imperium+Rise,+Wipro+circle,+Hinjewadi+phase+2,+Pune" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: '10px' }}
              className="mid m-b-xs-30"
            >
              <i className="fas fa-map-marker-alt" style={{ color: '#D4AF37', marginTop: '4px', flexShrink: 0 }} />
              <span>
                Home Branch - office no 328, Gera imperium Rise,Wipro circle,opp to wipro company, Hinjewadi phase 2, Pune
              </span>
            </a>
            <div className="h5 m-b-xs-10" style={{ color: '#fff' }}>
              We&apos;re Available 24/ 7. Call Now.
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <a 
                className="tel contact-link-no-underline" 
                href="tel:+16146022959" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center'
                }}
              >
                <i className="fas fa-phone" style={{ color: '#D4AF37', marginRight: '8px' }} />
                +1 (614) 602-2959
              </a>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <a 
                className="email contact-link-no-underline" 
                href="mailto:Info@theentrepreneurialchronicle.com" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                <i className="fas fa-envelope" style={{ color: '#D4AF37', marginRight: '8px' }} />
                Info@theentrepreneurialchronicle.com
              </a>
            </div>
            <div></div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30" style={{ color: '#fff' }}>
            <div className="axil-social-title h5" style={{ color: '#fff' }}>Follow Us</div>
            <ul className="social-share social-share__with-bg" style={{ gap: '8px', listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
              <li 
                style={{ 
                  padding: '8px', 
                  overflow: 'visible',
                }}
              >
                <a 
                  href={SocialLink.fb.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-fb"
                  style={{ 
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  <i className={SocialLink.fb.icon} style={{ fontSize: '1.5rem' }} />
                </a>
              </li>
              <li 
                style={{ 
                  padding: '8px', 
                  overflow: 'visible',
                }}
              >
                <a 
                  href={SocialLink.twitter.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-twitter"
                  style={{ 
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  <i className={SocialLink.twitter.icon} style={{ fontSize: '1.5rem' }} />
                </a>
              </li>
              <li 
                style={{ 
                  padding: '8px', 
                  overflow: 'visible',
                }}
              >
                <a 
                  href={SocialLink.linked.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-linkedin"
                  style={{ 
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  <i className={SocialLink.linked.icon} style={{ fontSize: '1.5rem' }} />
                </a>
              </li>
              <li 
                style={{ 
                  padding: '8px', 
                  overflow: 'visible',
                }}
              >
                <a 
                  href={SocialLink.yt.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-youtube"
                  style={{ 
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  <i className={SocialLink.yt.icon} style={{ fontSize: '1.5rem' }} />
                </a>
              </li>
              <li 
                style={{ 
                  padding: '8px', 
                  overflow: 'visible',
                }}
              >
                <a 
                  href={SocialLink.instagram.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-instagram"
                  style={{ 
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  <i className={SocialLink.instagram.icon} style={{ fontSize: '1.5rem' }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .contact-social-share .social-link-fb {
          background: #1877F2 !important;
        }
        .contact-social-share .social-link-fb:hover {
          background: #1877F2 !important;
        }
        .contact-social-share .social-link-twitter {
          background: #1DA1F2 !important;
        }
        .contact-social-share .social-link-twitter:hover {
          background: #1DA1F2 !important;
        }
        .contact-social-share .social-link-linkedin {
          background: #0A66C2 !important;
        }
        .contact-social-share .social-link-linkedin:hover {
          background: #0A66C2 !important;
        }
        .contact-social-share .social-link-youtube {
          background: #FF0000 !important;
        }
        .contact-social-share .social-link-youtube:hover {
          background: #FF0000 !important;
        }
        .contact-social-share .social-link-instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
        }
        .contact-social-share .social-link-instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
        }
        .contact-social-share .social-share__with-bg li {
          perspective: 1000px;
        }
        .contact-social-share .social-share__with-bg li a {
          border-radius: 100% !important;
          transition: all 0.3s ease !important;
          transform-style: preserve-3d;
        }
        .contact-social-share .social-share__with-bg li a:hover {
          transform: translateZ(20px) scale(1.3) !important;
        }
        .axil-contact-info-wrapper address .tel,
        .axil-contact-info-wrapper address .tel:hover,
        .axil-contact-info-wrapper address .tel:focus,
        .axil-contact-info-wrapper address .tel:active,
        .axil-contact-info-wrapper address .email,
        .axil-contact-info-wrapper address .email:hover,
        .axil-contact-info-wrapper address .email:focus,
        .axil-contact-info-wrapper address .email:active,
        .axil-contact-info-wrapper .contact-link-no-underline,
        .axil-contact-info-wrapper .contact-link-no-underline:hover,
        .axil-contact-info-wrapper .contact-link-no-underline:focus,
        .axil-contact-info-wrapper .contact-link-no-underline:active {
          text-decoration: none !important;
          border-bottom: none !important;
          background-image: none !important;
          background-size: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ContactInfo;
