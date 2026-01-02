import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30" style={{ background: '#000', color: '#fff' }}>
      <div className="axil-contact-info-inner" style={{ color: '#fff', background: 'transparent' }}>
        <h2 className="h4 m-b-xs-10" style={{ color: '#fff' }}>Contact Information</h2>
        <div className="axil-contact-info" style={{ color: '#fff' }}>
          <address className="address">
            <p className="mid m-b-xs-30" style={{ color: '#ccc' }}>
              6605 Longshore st, Dublin
              <br />
              OH 43017, USA
            </p>

            <p className="mid m-b-xs-30" style={{ color: '#ccc' }}>
              Heßstraße 36, 80798 München, Germany
            </p>

            <p className="mid m-b-xs-30" style={{ color: '#ccc' }}>
              Home Branch - office no 328B, Gera imperium Rise,Wipro circle,opp to wipro company, Hinjewadi phase 2, Pune
            </p>
            <div className="h5 m-b-xs-10" style={{ color: '#fff' }}>
              We&apos;re Available 24/ 7. Call Now.
            </div>
            <div>
              <a className="tel" href="tel:+91 8421174213" style={{ color: '#fff', textDecoration: 'none' }}>
                <i className="fas fa-phone" style={{ color: '#D4AF37', marginRight: '8px' }} />
                +1 (614) 602-2959
              </a>
            </div>
            <div></div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30" style={{ color: '#fff' }}>
            <div className="axil-social-title h5" style={{ color: '#fff' }}>Follow Us</div>
            <ul className="social-share social-share__with-bg" style={{ gap: '8px' }}>
              <li>
                <a href={SocialLink.yt.url} style={{ color: '#fff' }}>
                  <i className={SocialLink.yt.icon} style={{ color: '#D4AF37' }} />
                </a>
              </li>
              <li>
                <a href={SocialLink.instagram.url} style={{ color: '#fff' }}>
                  <i className={SocialLink.instagram.icon} style={{ color: '#D4AF37' }} />
                </a>
              </li>
              <li>
                <a href={SocialLink.linked.url} style={{ color: '#fff' }}>
                  <i className={SocialLink.linked.icon} style={{ color: '#D4AF37' }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
