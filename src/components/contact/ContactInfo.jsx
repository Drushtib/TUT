import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30" style={{ background: 'var(--background)', color: 'var(--text)' }}>
      <div className="axil-contact-info-inner" style={{ color: 'var(--text)', background: 'transparent' }}>
        <h2 className="h4 m-b-xs-10" style={{ color: 'var(--text)' }}>Contact Information</h2>
        <div className="axil-contact-info" style={{ color: 'var(--text)' }}>
          <address className="address">
            <p className="mid m-b-xs-30" style={{ color: 'var(--text-secondary)' }}>
              6605 Longshore St, Dublin,
              <br />
              OH 43017, USA
            </p>
            <div className="h5 m-b-xs-10" style={{ color: 'var(--text)' }}>
              We&apos;re Available 24/ 7. Call Now.
            </div>
            <div>
              <a className="tel" href="tel:8884562790" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                <i className="fas fa-phone" style={{ color: 'var(--primary-color)', marginRight: '8px' }} />
                +1 (614) 602-2959
              </a>
            </div>
            <div></div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30" style={{ color: 'var(--text)' }}>
            <div className="axil-social-title h5" style={{ color: 'var(--text)' }}>Follow Us</div>
            <ul className="social-share social-share__with-bg" style={{ gap: '8px' }}>
              <li>
                <a href={SocialLink.fb.url} style={{ color: 'var(--text)' }}>
                  <i className={SocialLink.fb.icon} style={{ color: 'var(--primary-color)' }} />
                </a>
              </li>
              <li>
                <a href={SocialLink.twitter.url} style={{ color: 'var(--text)' }}>
                  <i className={SocialLink.twitter.icon} style={{ color: 'var(--primary-color)' }} />
                </a>
              </li>

              <li>
                <a href={SocialLink.linked.url} style={{ color: 'var(--text)' }}>
                  <i className={SocialLink.linked.icon} style={{ color: 'var(--primary-color)' }} />
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
