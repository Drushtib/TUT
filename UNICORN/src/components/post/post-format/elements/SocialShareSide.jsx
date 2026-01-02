import { useEffect, useState } from "react";
import SocialLink from "../../../../data/social/SocialLink.json";

const SocialShareSide = () => {
  const [windowPath, setwindowPath] = useState(null);
  const [isWebProfile, setIsWebProfile] = useState(false);

  useEffect(() => {
    setwindowPath(window.location.href);
    
    // Check if current page is a web profile post
    const checkWebProfile = () => {
      const path = window.location.pathname;
      // Check URL path
      if (path.includes('/category/web-profiles')) {
        setIsWebProfile(true);
        return;
      }
      // Check for web profile category links on the page
      const categoryLinks = document.querySelectorAll('a[href*="web-profiles"]');
      if (categoryLinks.length > 0) {
        setIsWebProfile(true);
        return;
      }
      // Check breadcrumb or category text
      const breadcrumb = document.querySelector('.breadcrumb, [class*="breadcrumb"]');
      if (breadcrumb && breadcrumb.textContent.toLowerCase().includes('web profile')) {
        setIsWebProfile(true);
        return;
      }
      // Check category badge/button
      const categoryBadge = document.querySelector('[class*="post-cat"], [class*="category"]');
      if (categoryBadge && categoryBadge.textContent.toLowerCase().includes('web profile')) {
        setIsWebProfile(true);
        return;
      }
    };

    // Check immediately and after a short delay for dynamic content
    checkWebProfile();
    const timer = setTimeout(checkWebProfile, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // For web profile posts: show YouTube, Instagram, and LinkedIn
  // For other posts: show LinkedIn only (Facebook, Twitter, Pinterest removed)
  if (isWebProfile) {
    return (
      <div className="post-details__social-share mt-2">
        <ul className="social-share social-share__with-bg social-share__vertical">
          <li>
            <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.yt.icon} />
            </a>
          </li>
          <li>
            <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.instagram.icon} />
            </a>
          </li>
          <li>
            <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer">
              <i className={SocialLink.linked.icon} />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="post-details__social-share mt-2">
      <ul className="social-share social-share__with-bg social-share__vertical">
        <li>
          <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
            <i className={SocialLink.yt.icon} />
          </a>
        </li>
        <li>
          <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer">
            <i className={SocialLink.instagram.icon} />
          </a>
        </li>
        <li>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${windowPath}`}
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialShareSide;
