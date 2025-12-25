import Link from "next/link";
import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";
import HeaderLogo from "../../assest/Logo_The Unicorn Times_2.jpg";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose }) => {
  return (
    <Offcanvas
      show={ofcshow}
      onHide={ofcHandleClose}
      placement="end"
      className="offcanvas-menu"
    >
      <Offcanvas.Header
        closeButton
        className="close-offcanvasmeu"
      ></Offcanvas.Header>
      <div className="side-nav">
        <div className="side-nav-inner nicescroll-container">
          <div style={{ padding: "16px 0 8px" }}>
            <Link
              href="/"
              onClick={ofcHandleClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <Image
                src={HeaderLogo}
                alt="The Unicorn Time logo"
                width={44}
                height={44}
                style={{ objectFit: "contain", height: "44px", width: "44px" }}
              />
              <span style={{ fontWeight: 700, fontSize: "18px", lineHeight: 1.1 }}>
                The Unicorn Time
              </span>
            </Link>
          </div>
          <form action="#" className="side-nav-search-form">
            <div className="form-group search-field">
              <input
                type="text"
                className="search-field"
                name="search-field"
                placeholder="Search..."
              />
              <button className="side-nav-search-btn">
                <i className="fas fa-search" />
              </button>
            </div>
            {/* End of .side-nav-search-form */}
          </form>
          {/* End of .side-nav-search-form */}
          <div className="side-nav-content">
            <div className="row ">
              <div className="col-lg-6">
                <ul className="main-navigation side-navigation list-inline flex-column">
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
                    <Link href="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/media-kit">Media Kit</Link>
                  </li>
                  <li>
                    <Link href="/advertise-with-us">Advertise With Us</Link>
                  </li>
                </ul>
                {/* End of .main-navigation */}
              </div>
              {/* End of  .col-md-6 */}
              <div className="col-lg-6">
                <div className="axil-contact-info-inner">
                  <h5 className="h5 m-b-xs-10">Contact Information</h5>
                  <div className="axil-contact-info">
                    <address className="address">
                      <p className="m-b-xs-30  mid grey-dark-three ">
                        6605 Longshore St, Dublin,
                        <br />
                        OH 43017, USA
                      </p>
                      <div className="h5 m-b-xs-5">
                        We&apos;re Available 24/ 7. Call Now.
                      </div>
                      <div>
                        <a className="tel" href="tel:+16143567697">
                          <i className="fas fa-phone" />
                          +1 (614) 602-2959{" "}
                        </a>
                      </div>
                    </address>
                    {/* End of address */}
                    <div className="contact-social-share m-t-xs-30">
                      <div className="axil-social-title h5">Follow Us</div>
                      <ul className="social-share social-share__with-bg">
                        <li>
                          <a href={SocialLink.fb.url}>
                            <i className={SocialLink.fb.icon} />
                          </a>
                        </li>
                        <li>
                          <a href={SocialLink.twitter.url}>
                            <i className={SocialLink.twitter.icon} />
                          </a>
                        </li>
                        <li>
                          <a href={SocialLink.behance.url}>
                            <i className={SocialLink.behance.icon} />
                          </a>
                        </li>
                        <li>
                          <a href={SocialLink.linked.url}>
                            <i className={SocialLink.linked.icon} />
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* End of .contact-shsdf */}
                  </div>
                  {/* End of .axil-contact-info */}
                </div>
                {/* End of .axil-contact-info-inner */}
              </div>
            </div>
            {/* End of .row */}
          </div>
        </div>
        {/* End of .side-nav-inner */}
      </div>
    </Offcanvas>
  );
};

export default OffcanvasMenu;
