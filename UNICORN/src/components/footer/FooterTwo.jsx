import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";
import styles from "../../styles/footer.module.css";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../common/Loader";
import { client } from "../../client";
import { useQuery } from "@tanstack/react-query";

const FooterTwo = () => {
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
      style={{ color: "white", paddingBottom: "1px" }}
    >
      <style jsx>{`
        .footer-description-paragraph {
          word-spacing: -1px !important;
          letter-spacing: -0.3px !important;
        }
      `}</style>
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
        }}
      >
        {/* Column 1: Logo + Description */}
        <div className="logo" style={{ flex: "1 1 280px", minWidth: "280px", maxWidth: "350px" }}>
          <div className="footer-logo-container">
            <Link href="/">
              <Image
                src="/logos/logo-primary-white.png"
                alt="brand-logo"
                width={300}
                height={100}
                style={{ objectFit: "contain", marginBottom: "1rem" }}
              />
            </Link>
            <p className="footer-description-paragraph" style={{ width: "100%", color: "white", fontWeight: 200, lineHeight: "1.4", textAlign: "justify", wordSpacing: "-1px", letterSpacing: "-0.3px" }}>
              The Entrepreneurial Chronicles is a business magazine that shares
              inspiring success stories of entrepreneurs, transforming intriguing
              tales into captivating narratives. With a skilled storytelling team
              and extensive industry expertise, we amplify untold stories from the
              business world, making our magazine both compelling and insightful.
            </p>
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
            className="footer-bottom-links "
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/magazines">Magazine</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
          
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/guest-post">Guest Post</Link>
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

        {/* Column 4: Social Links + Contact Info */}
        <div className="footer-social-share-wrapper" style={{ flex: "1 1 250px", minWidth: "250px" }}>
          <div
            className="footer-social-share"
            style={{ marginBottom: "1.5rem" }}
          >
            <div className="axil-social-title" style={{ fontWeight: 400, marginBottom: "0.5rem" }}>
              Social Media :
            </div>
            <ul className="social-share social-share__with-bg" style={{ listStyle: "none", padding: 0, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <li>
                <a href={SocialLink.fb.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.fb.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.yt.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.linked.icon} />
                </a>
              </li>
            </ul>
          </div>
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
          <div className="axil-social-title" style={{ fontWeight: 400, lineHeight: "1.6" }}>
            Home Branch - office no 328B, Gera imperium Rise, Wipro circle, opp to wipro company, Hinjewadi phase 2, Pune
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "3rem", fontWeight: 400 }}>
        &copy;Copyright 2025 | The Entrepreneurial Chronicles| All Rights
        Reserved.
      </p>
      <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: 400 }}>
        Designed by{" "}
        <a
          href="https://www.intellisysitsolutions.com/index.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "underline" }}
        >
          team Intellisys
        </a>
      </p>
    </footer>
  );
};

export default FooterTwo;
