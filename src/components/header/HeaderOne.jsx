import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { client } from "../../client";

import SocialLink from "../../data/social/SocialLink.json";

// Logo import with fallback
let UnicornLogo;
try {
  UnicornLogo = "/assest/Logo_The Unicorn Times_1 (1).jpg";
  console.log("Logo loaded successfully:", UnicornLogo);
} catch (error) {
  console.error("Error loading logo:", error);
  UnicornLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='84' viewBox='0 0 420 84'%3E%3Crect width='420' height='84' fill='%23ffffff'/%3E%3Ctext x='210' y='50' text-anchor='middle' fill='%23000000' font-family='Arial' font-size='16' font-weight='bold'%3EThe Unicorn Times%3C/text%3E%3C/svg%3E";
}

const HeaderOne = () => {

  // Header Search
  const [searchshow, setSearchShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileTechAiOpen, setMobileTechAiOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const headerSearchShow = () => {
    setSearchShow(true);
  };
  const headerSearchClose = () => {
    setSearchShow(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Mobile Menu Functions
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileIndustriesOpen(false);
    setMobileTechAiOpen(false);
  };

  const toggleMobileIndustries = () => {
    setMobileIndustriesOpen((v) => !v);
    setMobileTechAiOpen(false);
  };

  const toggleMobileTechAi = () => {
    setMobileTechAiOpen((v) => !v);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If we have magazine results, go to the first one
    if (searchResults && searchResults[0] && searchResults[0].slug) {
      router.push(`/magazine/${searchResults[0].slug}`);
      setSearchShow(false);
      setSearchQuery("");
      setShowResults(false);
      return;
    }

    // Find first match and scroll to it
    const firstMatch = findFirstMatch(searchQuery.toLowerCase());
    if (firstMatch) {
      firstMatch.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    // Close search after scrolling
    setSearchShow(false);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Simple: search ONLY magazines by title from Sanity, show suggestions, navigate on click
    if (query.trim().length > 0) {
      const pattern = `*${query}*`;
      client
        .fetch(
          `*[_type == "magazine" && title match $q][0...8]{title, 'slug': slug.current, 'image': mainImage.asset->url}`,
          { q: pattern }
        )
        .then((res) => {
          const mapped = (res || []).map((m, i) => ({
            id: `mag-${i}`,
            type: 'magazine',
            text: m.title,
            slug: m.slug,
            hasImage: !!m.image,
            imageSrc: m.image,
          }));
          setSearchResults(mapped);
          setShowResults(true);
        });
      return; // Skip the old global search logic below
    } else {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
  };

  const findFirstMatch = (searchTerm) => {
    // Search in headings first
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let heading of headings) {
      if (heading.textContent.toLowerCase().includes(searchTerm)) {
        return heading;
      }
    }

    // Then search in paragraphs
    const paragraphs = document.querySelectorAll('p');
    for (let paragraph of paragraphs) {
      if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
        return paragraph;
      }
    }

    return null;
  };

  const getPersonDescription = (personName) => {
    const descriptions = {
      'Anchel Gupta': 'Featured Entrepreneur',
      'Jorden': 'Business Leader',
      'Manuel': 'Innovation Expert',
      'Suzanne': 'Tech Pioneer',
      'Nilmini': 'Startup Founder',
      'Shabnam': 'Industry Leader',
      'Valenia': 'Visionary CEO',
      'Ross': 'Business Strategist',
      'Khalid': 'Market Innovator'
    };
    return descriptions[personName] || 'Magazine Featured Person';
  };

  const handleSuggestionClick = (result) => {
    if (result?.slug) {
      router.push(`/magazine/${result.slug}`);
      setSearchShow(false);
      setSearchQuery("");
      setSearchResults([]);
      setShowResults(false);
      return;
    }
  };

  const highlightSearchResults = (searchTerm) => {
    // Remove previous highlights
    const previousHighlights = document.querySelectorAll('.search-highlight');
    previousHighlights.forEach(el => {
      el.classList.remove('search-highlight');
    });

    // Add new highlights
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.toLowerCase().includes(searchTerm)) {
        textNodes.push(node);
      }
    }

    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE' && parent.tagName !== 'HEAD') {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = textNode.textContent.replace(regex, '<span class="search-highlight">$1</span>');
        parent.innerHTML = parent.innerHTML.replace(textNode.textContent, highlightedText);
      }
    });
  };

  const clearHighlights = () => {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  };


  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Navigation Links */}
            <div className="top-nav-links" style={{ display: 'flex', gap: '2rem', marginRight: 'auto' }}>
              <Link href="/about-us" className="top-nav-link" style={{ color: '#ffffff', textDecoration: 'none' }}>About Us</Link>
              <Link href="/contact" className="top-nav-link" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact Us</Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
              <a href="https://www.facebook.com/theunicorntimeswhere" target="_blank" rel="noopener noreferrer" className="social-icon facebook-icon">
                <img src="/assest/facebook.png" alt="Facebook" style={{ width: '18px', height: '18px' }} />
              </a>
              <a href="https://www.instagram.com/the.unicorntimes/" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon">
                <img src="/assest/instagram.png" alt="Instagram" style={{ width: '18px', height: '18px' }} />
              </a>
              <a href="https://www.linkedin.com/company/the-unicorn-times/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-icon linkedin-icon">
                <img src="/assest/linkedin.png" alt="LinkedIn" style={{ width: '18px', height: '18px' }} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube-icon">
                <img src="/assest/youtube.png" alt="YouTube" style={{ width: '18px', height: '18px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="page-header sticky-top">
        <nav className="navbar bg-black" style={{ paddingTop: '0.15rem', paddingBottom: '0.15rem', minHeight: 'auto', height: 'auto', lineHeight: '1' }}>
          <div className="container" style={{ paddingTop: '0.15rem', paddingBottom: '0.15rem' }}>
            <div className="navbar-inner" style={{ padding: '0', minHeight: 'auto', height: 'auto', lineHeight: '1' }}>
              <div className="brand-logo-container">
                <Link href="/" style={{ display: 'block', lineHeight: '0' }}>
                  <img
                    src="/assest/Logo_The Unicorn Times_1 (1).jpg"
                    alt="chronicles-logo"
                    width={420}
                    height={84}
                    className="header-logo"
                    style={{
                      objectFit: "contain",
                      height: "84px",
                      width: "auto",
                      maxWidth: "420px",
                      display: "block",
                      visibility: "visible",
                      opacity: 1
                    }}
                  />
                </Link>
              </div>

              {/* Navigation Links - Desktop Only */}
              <div className="navbar-nav-links desktop-nav">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/magazines" className="nav-link">Magazines</Link>
                <Link href="/blogs" className="nav-link">Blogs</Link>
                <div className="nav-dropdown">

                  <button
                    type="button"
                    className="nav-link nav-dropdown-toggle"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    Industries
                    <span className="nav-caret" />
                  </button>

                  <div className="nav-dropdown-menu">
                    <Link href="/industry/finance" className="nav-dropdown-item">Finance</Link>
                    <Link href="/industry/healthcare" className="nav-dropdown-item">Healthcare</Link>
                    <Link href="/industry/legal" className="nav-dropdown-item">Legal</Link>
                    <div className="nav-dropdown-sub">
                      <div
                        className="nav-dropdown-item nav-dropdown-sub-toggle"
                        role="button"
                      >
                        Tech/AI
                        <span className="nav-caret-sub" />
                      </div>

                      <div className="nav-dropdown-submenu">
                        <Link href="/industry/tech-ai/ai" className="nav-dropdown-item">AI</Link>
                        <Link href="/industry/tech-ai/cybersecurity" className="nav-dropdown-item">Cybersecurity</Link>
                        <Link href="/industry/tech-ai/security" className="nav-dropdown-item">Security</Link>
                        <Link href="/industry/tech-ai/robotics" className="nav-dropdown-item">Robotics</Link>
                      </div>
                    </div>

                    <Link href="/industry/manufacturing-products" className="nav-dropdown-item">Manufacturing/Products</Link>
                    <Link href="/industry/tech-ai/e-commerce" className="nav-dropdown-item">Retail/E-commerce</Link>
                    <Link href="/industry/transportation" className="nav-dropdown-item">Transportation</Link>
                  </div>
                </div>
                <Link href="/about-us" className="nav-link">About Us</Link>
                <Link href="/contact" className="nav-link">Contact</Link>
                <Link href="/media-kit" className="nav-link">Media Kit</Link>
              </div>

              {/* Search and Mobile Menu */}
              <div className="navbar-extra-features">
                <form
                  onSubmit={handleSearch}
                  className={`navbar-search ${searchshow ? "show-nav-search" : ""
                    }`}
                >
                  <div className="search-field">
                    <input
                      type="text"
                      className="navbar-search-field"
                      placeholder="Search entire website..."
                      value={searchQuery}
                      onChange={handleSearchInput}
                    />
                    <button className="navbar-search-btn" type="submit">
                      <i className="fal fa-search" />
                    </button>
                  </div>
                  <span
                    className="navbar-search-close"
                    onClick={headerSearchClose}
                  >
                    <i className="fal fa-times" />
                  </span>
                </form>

                <button
                  className="nav-search-field-toggler"
                  onClick={headerSearchShow}
                >
                  <i className="far fa-search" />
                </button>

                {/* Mobile Hamburger Menu */}
                <button
                  className="mobile-menu-toggle"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <div className="mobile-menu-content">
              <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
              <Link href="/magazines" className="mobile-nav-link" onClick={closeMobileMenu}>Magazines</Link>
              <Link href="/blogs" className="mobile-nav-link" onClick={closeMobileMenu}>Blogs</Link>

              <button
                type="button"
                className={`mobile-nav-link mobile-nav-dropdown-toggle mobile-nav-dropdown-toggle--industries ${mobileIndustriesOpen ? "open" : ""}`}
                onClick={toggleMobileIndustries}
                aria-expanded={mobileIndustriesOpen}
              >
                Industries
                <span className="mobile-nav-caret" />
              </button>

              {mobileIndustriesOpen && (
                <div className="mobile-nav-submenu">
                  <Link href="/industry/finance" className="mobile-nav-sublink" onClick={closeMobileMenu}>Finance</Link>
                  <Link href="/industry/healthcare" className="mobile-nav-sublink" onClick={closeMobileMenu}>Healthcare</Link>
                  <Link href="/industry/legal" className="mobile-nav-sublink" onClick={closeMobileMenu}>Legal</Link>

                  <button
                    type="button"
                    className={`mobile-nav-sublink mobile-nav-subdropdown-toggle ${mobileTechAiOpen ? "open" : ""}`}
                    onClick={toggleMobileTechAi}
                    aria-expanded={mobileTechAiOpen}
                  >
                    Tech/AI
                    <span className="mobile-nav-caret" />
                  </button>

                  {mobileTechAiOpen && (
                    <div className="mobile-nav-subsubmenu">
                      <Link href="/industry/tech-ai/ai" className="mobile-nav-subsublink" onClick={closeMobileMenu}>AI</Link>
                      <Link href="/industry/tech-ai/cybersecurity" className="mobile-nav-subsublink" onClick={closeMobileMenu}>Cybersecurity</Link>
                      <Link href="/industry/tech-ai/e-commerce" className="mobile-nav-subsublink" onClick={closeMobileMenu}>E-commerce</Link>
                      <Link href="/industry/tech-ai/security" className="mobile-nav-subsublink" onClick={closeMobileMenu}>Security</Link>
                      <Link href="/industry/tech-ai/robotics" className="mobile-nav-subsublink" onClick={closeMobileMenu}>Robotics</Link>
                    </div>
                  )}

                  <Link href="/industry/manufacturing-products" className="mobile-nav-sublink" onClick={closeMobileMenu}>Manufacturing/Products</Link>
                  <Link href="/industry/transportation" className="mobile-nav-sublink" onClick={closeMobileMenu}>Transportation</Link>
                </div>
              )}

              <Link href="/about-us" className="mobile-nav-link" onClick={closeMobileMenu}>About Us</Link>
              <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
              <Link href="/media-kit" className="mobile-nav-link" onClick={closeMobileMenu}>Media Kit</Link>
            </div>
          </div>
        )}

        {/* Search Suggestions Dropdown */}
        {searchshow && showResults && searchResults.length > 0 && (
          <div className="search-suggestions-dropdown">
            <div className="search-suggestions-header">
              <h4>Suggestions ({searchResults.length})</h4>
            </div>
            <div className="search-suggestions-list">
              {searchResults.map((result, index) => (
                <div
                  key={result.id}
                  className="search-suggestion-item"
                  data-type={result.type}
                  onClick={() => handleSuggestionClick(result)}
                >
                  <div className="suggestion-content">
                    {result.hasImage && result.imageSrc && (
                      <div className="suggestion-image">
                        <img
                          src={result.imageSrc}
                          alt={result.imageAlt || result.text}
                          className="suggestion-img"
                        />
                      </div>
                    )}
                    <div className="suggestion-details">
                      <div className="suggestion-type">{result.type}</div>
                      <div className="suggestion-text">{result.text}</div>
                      {result.page && (
                        <div className="suggestion-page">
                          <span>📍 {result.page}</span>
                        </div>
                      )}
                      {result.description && (
                        <div className="suggestion-description">
                          <span>{result.description}</span>
                        </div>
                      )}
                      {result.href && (
                        <div className="suggestion-link">
                          <span>{result.href}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchshow && showResults && searchResults.length === 0 && searchQuery.trim().length > 0 && (
          <div className="search-suggestions-dropdown">
            <div className="search-suggestions-header">
              <h4>No Results Found</h4>
            </div>
            <div className="search-suggestions-list">
              <div className="no-suggestions">
                <p>No content found matching &quot;{searchQuery}&quot;</p>
                <div className="search-tips">
                  <p>Try searching for:</p>
                  <ul>
                    <li>• Magazine names (Anchel, Jorden, Manuel, etc.)</li>
                    <li>• Page sections (Home, About, Contact)</li>
                    <li>• General keywords</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx global>{`
        .page-header,
        header.page-header {
          margin-top: 0 !important;
        }
        
        .navbar,
        nav.navbar,
        .page-header .navbar,
        .bg-black.navbar,
        nav.bg-black.navbar {
          background-color: #ffffff !important;
          border-bottom: 3px solid var(--primary-color) !important;
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
          min-height: auto !important;
          height: auto !important;
          line-height: 1 !important;
        }
        
        .navbar .container,
        nav.navbar .container,
        .page-header .navbar .container,
        nav.bg-black.navbar .container {
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        @media (min-width: 992px) {
          .navbar .container,
          nav.navbar .container,
          .page-header .navbar .container,
          nav.bg-black.navbar .container {
            max-width: 100% !important;
            width: 100% !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .navbar-inner {
            gap: 1.25rem;
          }

          .brand-logo-container {
            display: flex !important;
            align-items: center !important;
            flex: 0 0 auto !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
            margin-bottom: 0 !important;
          }

          .header-logo {
            max-width: 340px !important;
            height: 84px !important;
            max-height: 84px !important;
            width: auto !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            object-fit: contain !important;
          }

          .navbar-nav-links {
            margin-left: auto;
          }
        }
        
        .navbar-inner,
        .navbar .navbar-inner,
        nav.navbar .navbar-inner {
          padding: 0 !important;
          min-height: auto !important;
          height: auto !important;
          line-height: 1 !important;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 2rem;
        }

        .brand-logo-container {
          flex-shrink: 0;
          padding-left: 0;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 0;
        }
        
        .brand-logo-container img,
        .brand-logo-container Image,
        .brand-logo-container img[src*="chronicle"],
        .brand-logo-container Image[src*="chronicle"] {
          height: 84px !important;
          width: auto !important;
          max-height: 84px !important;
          object-fit: contain !important;
        }
        
        .navbar .container {
          padding-left: 16px !important;
        }
        
        @media (max-width: 991px) {
          .navbar,
          nav.navbar,
          .page-header .navbar,
          .bg-black.navbar,
          nav.bg-black.navbar {
            padding-top: 0.3rem !important;
            padding-bottom: 0.3rem !important;
          }
          
          .navbar .container,
          nav.navbar .container {
            padding-top: 0.3rem !important;
            padding-bottom: 0.3rem !important;
          }
        }

        .navbar-nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: flex-end;
          margin-left: auto;
          margin-right: 0;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .navbar-nav-links .nav-link {
          color: #000000 !important;
          font-size: 16px !important;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 8px 6px;
          display: block;
          position: relative;
          white-space: nowrap;
        }

        .navbar-nav-links button.nav-link {
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }

        .navbar-nav-links .nav-link:hover {
          color: #C6A054 !important;
          text-decoration: none;
        }

        .nav-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-dropdown-toggle {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          line-height: 1;
          white-space: nowrap;
        }

        .nav-caret {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 9px solid #000000;
          transition: border-color 0.15s ease;
        }

        .nav-dropdown:hover .nav-caret {
          border-bottom: 0;
          border-top: 9px solid #000000;
        }

        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 220px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          padding: 10px 0;
          display: none;
          z-index: 2000;
          gap:2rem;
        }

        .nav-dropdown-menu::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 0;
          right: 0;
          height: 10px;
          background: transparent;
        }

        .nav-dropdown:hover .nav-dropdown-menu {
          display: block;
        }

        .nav-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
        }

        .nav-dropdown-item:hover,
        .nav-dropdown-item:focus {
          background: rgba(187, 5, 5, 0.12);
          color: var(--primary-color) !important;
          -webkit-text-fill-color: var(--primary-color) !important;
        }

        .nav-dropdown-sub {
          position: relative;
        }

        .nav-caret-sub {
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid #000000;
          transition: transform 0.15s ease;
        }

        .nav-dropdown-submenu {
          position: absolute;
          top: 0;
          left: 100%;
          min-width: 220px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          padding: 10px 0;
          display: none;
          z-index: 2001;
        }

        .nav-dropdown-sub:hover .nav-dropdown-submenu {
          display: block;
        }

        .nav-dropdown-sub:hover .nav-caret-sub {
          transform: translateX(2px);
        }

        .navbar-extra-features {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .navbar-extra-features button {
          color: #000000 !important;
        }

        .navbar-extra-features button i,
        .nav-search-field-toggler i {
          color: #000000 !important;
        }

        .navbar-extra-features button:hover,
        .navbar .nav-search-field-toggler:hover {
          color: var(--primary-color) !important;
        }

        .navbar-extra-features button:hover i,
        .navbar .nav-search-field-toggler:hover i {
          color: var(--primary-color) !important;
        }

        .navbar .navbar-search-field {
          background-color: #ffffff !important;
          background: #ffffff !important;
          color: #000000 !important;
          border: 1px solid rgba(0, 0, 0, 0.25) !important;
        }

        .navbar .navbar-search-field:focus {
          background-color: #ffffff !important;
          background: #ffffff !important;
          color: #000000 !important;
          border: 1px solid rgba(0, 0, 0, 0.35) !important;
          outline: none !important;
        }

        .navbar .navbar-search-field::placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
        }

        .navbar .navbar-search-field::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
        }

        .navbar .navbar-search-field::-moz-placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
        }

        .navbar .navbar-search-field:-ms-input-placeholder {
          color: rgba(0, 0, 0, 0.55) !important;
        }

        .navbar .navbar-search-btn {
          color: #000000 !important;
        }

        .navbar .navbar-search-btn:hover {
          color: var(--primary-color) !important;
        }

        .navbar-search-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          margin-left: 6px;
          border-radius: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          flex: 0 0 auto;
        }

        .navbar-search-close i {
          color: #ffffff !important;
        }

        .navbar-search-close:hover {
          background: transparent;
        }

        .navbar-search-close:hover i {
          color: var(--primary-color) !important;
        }

        @media (max-width: 768px) {
          .navbar-search-close {
            border: 1px solid rgba(0, 0, 0, 0.18);
            background: rgba(255, 255, 255, 0.9);
          }

          .navbar-search-close i {
            color: #000000 !important;
          }

          .navbar-search-close:hover {
            border-color: var(--primary-color);
            background: rgba(187, 5, 5, 0.1);
          }

          .navbar-search-close:hover i {
            color: var(--primary-color) !important;
          }
        }

        /* Search Suggestions Dropdown */
        .search-suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-top: none;
          max-height: 300px;
          overflow-y: auto;
          z-index: 1000;
          /* Hide scrollbar for Chrome, Safari and Opera */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .search-suggestions-dropdown::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .search-suggestions-header {
          padding: 10px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }

        .search-suggestions-header h4 {
          color: #000000;
          margin: 0;
          font-size: 14px;
        }

        .search-suggestions-list {
          max-height: 250px;
          overflow-y: auto;
          /* Hide scrollbar for Chrome, Safari and Opera */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .search-suggestions-list::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .search-suggestion-item {
          padding: 12px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .suggestion-image {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.04);
        }

        .suggestion-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .suggestion-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .search-suggestion-item:hover {
          background-color: rgba(0, 0, 0, 0.05);
          transform: translateX(5px);
        }

        .search-suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-type {
          color: var(--primary-color);
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Different colors for different content types */
        .search-suggestion-item[data-type="heading"] .suggestion-type {
          color: var(--primary-color);
        }

        .search-suggestion-item[data-type="magazine"] .suggestion-type {
          color: var(--primary-color);
        }

        .search-suggestion-item[data-type="content"] .suggestion-type {
          color: var(--primary-light);
        }

        .search-suggestion-item[data-type="text"] .suggestion-type {
          color: var(--primary-light);
        }

        .search-suggestion-item[data-type="image"] .suggestion-type {
          color: var(--primary-light);
        }

        .search-suggestion-item[data-type="magazine-person"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="hero-magazine"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="home-page"] .suggestion-type {
          color: var(--primary-color);
        }

        .search-suggestion-item[data-type="client-magazine"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="navigation"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="button"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="magazine-grid"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .search-suggestion-item[data-type="magazine-image"] .suggestion-type {
          color: var(--primary-color);
          font-weight: bold;
        }

        .suggestion-text {
          color: #000000;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 500;
        }

        .suggestion-link {
          margin-top: 2px;
        }

        .suggestion-link span {
          color: rgba(0, 0, 0, 0.55);
          font-size: 11px;
          text-decoration: none;
        }

        .suggestion-description {
          margin-top: 2px;
        }

        .suggestion-description span {
          color: var(--primary-color);
          font-size: 12px;
          font-style: italic;
        }

        .suggestion-page {
          margin-top: 2px;
        }

        .suggestion-page span {
          color: var(--primary-light);
          font-size: 11px;
          font-weight: 500;
        }

        .no-suggestions {
          padding: 20px;
          text-align: center;
        }

        .no-suggestions p {
          color: rgba(0, 0, 0, 0.55);
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        
        .search-tips {
          margin-top: 15px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }
        
        .search-tips p {
          color: var(--primary-color);
          font-size: 12px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }
        
        .search-tips ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .search-tips li {
          color: var(--text-secondary);
          font-size: 11px;
          margin: 4px 0;
          padding-left: 5px;
        }

        /* Search Highlight */
        .search-highlight {
          background-color: var(--primary-color);
          color: var(--text-dark);
          padding: 2px 4px;
          border-radius: 2px;
          font-weight: bold;
        }

        /* Mobile Menu Styles */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 1001;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          width: 25px;
          height: 20px;
          position: relative;
        }
        
        .hamburger span {
          display: block;
          height: 3px;
          width: 100%;
          background: #000000;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .mobile-menu-toggle:hover .hamburger span {
          background: #000000;
        }
        
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .mobile-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--background);
          border-top: 1px solid var(--border);
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-menu-content {
          padding: 20px 0;
        }
        
        .mobile-nav-link {
          display: block;
          padding: 15px 20px;
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        
        .mobile-nav-link:hover {
          background: var(--background-dark);
          color: var(--primary-color);
          -webkit-text-fill-color: var(--primary-color);
          padding-left: 30px;
        }

        .mobile-nav-dropdown-toggle {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 0;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-nav-dropdown-toggle--industries {
          border-bottom: 1px solid var(--border);
        }

        .mobile-nav-subdropdown-toggle {
          background: transparent;
          border: none;
          padding: 0;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-nav-caret {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #ffffff;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .mobile-nav-dropdown-toggle.open .mobile-nav-caret {
          transform: rotate(180deg);
        }

        .mobile-nav-link:hover .mobile-nav-caret {
          border-top-color: var(--primary-color);
        }

        .mobile-nav-submenu {
          padding: 8px 0;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border);
        }

        .mobile-nav-subsubmenu {
          padding: 6px 0 10px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-nav-subsublink {
          display: block;
          padding: 11px 20px 11px 52px;
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .mobile-nav-subsublink:hover {
          color: var(--primary-color);
          -webkit-text-fill-color: var(--primary-color);
          background: var(--background-dark);
          padding-left: 60px;
        }

        .mobile-nav-sublink {
          display: block;
          padding: 12px 20px 12px 34px;
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .mobile-nav-sublink:hover {
          color: var(--primary-color);
          -webkit-text-fill-color: var(--primary-color);
          background: var(--background-dark);
          padding-left: 42px;
        }
        
        .mobile-nav-link:last-child {
          border-bottom: none;
        }

        /* Prevent horizontal scrolling and fix hero section */
        body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        
        .hero-section {
          position: relative !important;
          width: 100vw !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
          left: 0 !important;
          right: 0 !important;
          transform: none !important;
        }
        
        .hero-content {
          position: relative !important;
          width: 100% !important;
          max-width: 100% !important;
          left: 0 !important;
          right: 0 !important;
          transform: none !important;
        }

        /* Universal Logo Visibility - Override All Media Queries */
        .brand-logo-container .header-logo,
        .brand-logo-container img,
        .brand-logo-container Image,
        .page-header .brand-logo-container .header-logo {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          height: 84px !important;
          width: auto !important;
          max-height: 84px !important;
         
          object-fit: contain !important;
          position: relative !important;
          z-index: 10 !important;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .navbar-nav-links.desktop-nav {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
          
          .navbar-inner {
            justify-content: space-between;
          }
          
          .navbar-inner {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
          }

          .brand-logo-container {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            margin-right: auto;
            margin-left: 0 !important;
            max-width: 62vw;
          }

          .navbar-extra-features {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            margin-left: auto;
            flex-wrap: nowrap;
          }

          .header-logo {
            height: 56px !important;
            max-height: 56px !important;
            width: auto !important;
            max-width: 230px !important;
          }
          
          /* Hero Section Mobile Responsive */
          .hero-section {
            padding: 2rem 1rem !important;
            min-height: 60vh !important;
            position: relative !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
          }
          
          .hero-title {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.2rem !important;
            line-height: 1.4 !important;
            margin-bottom: 1.5rem !important;
          }
          
          .hero-content {
            padding: 1rem !important;
            max-width: 100% !important;
            position: relative !important;
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
          }
          
          .hero-buttons {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: center !important;
          }
          
          .hero-button {
            width: 100% !important;
            max-width: 280px !important;
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          .header-logo {
            height: 40px !important;
            max-height: 40px !important;
            width: auto !important;
            max-width: 180px !important;
          }

          .mobile-nav-link {
            padding: 12px 15px;
            font-size: 14px;
          }
          
          /* Hero Section Small Mobile Responsive */
          .hero-section {
            padding: 1.5rem 0.5rem !important;
            min-height: 50vh !important;
            position: relative !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
          }
          
          .hero-title {
            font-size: 2rem !important;
            line-height: 1.1 !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
            line-height: 1.3 !important;
            margin-bottom: 1.2rem !important;
          }
          
          .hero-content {
            padding: 0.8rem !important;
            position: relative !important;
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
          }
          
          .hero-button {
            padding: 10px 20px !important;
            font-size: 13px !important;
          }
        }

        /* Top Bar Styles */
        .top-bar {
          background: #000000 !important;
          padding: 0.5rem 0 !important;
          border-bottom: 1px solid #333333 !important;
          display: block !important;
          visibility: visible !important;
        }

        /* Top Bar Layout - Higher Specificity */
        .top-bar .container .top-bar-inner {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          width: 100% !important;
          padding: 0 2rem !important;
        }

        .top-bar .container .top-bar-inner .social-icons {
          display: flex !important;
          gap: 1rem !important;
          order: 2;
          margin-left: auto !important;
          flex-shrink: 0 !important;
        }

        .top-bar .container .top-bar-inner .top-nav-links {
          display: flex !important;
          gap: 2rem !important;
          order: 1;
          margin-right: auto !important;
          flex-shrink: 0 !important;
        }

        /* Tablet View (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .top-bar .container .top-bar-inner {
            padding: 0 1.5rem !important;
          }

          .top-bar .container .top-bar-inner .social-icons {
            gap: 0.75rem !important;
          }

          .top-bar .container .top-bar-inner .top-nav-links {
            gap: 1.5rem !important;
          }

          .top-bar .container .top-bar-inner .social-icons img {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* Mobile View (up to 768px) */
        @media (max-width: 768px) {
          .top-bar .container .top-bar-inner {
            flex-direction: row !important;
            gap: 0.75rem !important;
            padding: 0.75rem 1rem !important;
            justify-content: center !important;
          }

          .top-bar .container .top-bar-inner .social-icons {
            order: 2 !important;
            gap: 0.75rem !important;
          }

          .top-bar .container .top-bar-inner .top-nav-links {
            order: 1 !important;
            margin-right: 0 !important;
            gap: 1.5rem !important;
          }

          .top-bar .container .top-bar-inner .social-icons img {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* Small Mobile View (up to 480px) */
        @media (max-width: 480px) {
          .top-bar .container .top-bar-inner {
            padding: 0.5rem 0.75rem !important;
            gap: 0.5rem !important;
          }

          .top-bar .container .top-bar-inner .social-icons {
            gap: 0.5rem !important;
          }

          .top-bar .container .top-bar-inner .top-nav-links {
            gap: 1rem !important;
          }

          .top-bar .container .top-bar-inner .social-icons img {
            width: 14px !important;
            height: 14px !important;
          }

          .top-bar .container .top-bar-inner .top-nav-links {
            font-size: 0.875rem !important;
          }
        }

        .social-icon {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 32px !important;
          height: 32px !important;
          background: transparent !important;
          color: #ffffff !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
          font-size: 14px !important;
          visibility: visible !important;
        }

        .social-icon span {
          color: #ffffff !important;
          visibility: visible !important;
        }

        .social-icon:hover {
          transform: translateY(-2px);
        }

        .facebook-icon:hover {
          color: #1877f2 !important;
        }

        .facebook-icon:hover span {
          color: #1877f2 !important;
        }

        .instagram-icon:hover {
          color: #e4405f !important;
        }

        .instagram-icon:hover span {
          color: #e4405f !important;
        }

        .linkedin-icon:hover {
          color: #0077b5 !important;
        }

        .linkedin-icon:hover span {
          color: #0077b5 !important;
        }

        .youtube-icon:hover {
          color: #ff0000 !important;
        }

        .youtube-icon:hover span {
          color: #ff0000 !important;
        }

        .top-nav-links {
          display: flex;
          gap: 2rem;
        }

        .top-nav-link,
        .top-bar .top-nav-link,
        .top-bar .container .top-bar-inner .top-nav-links .top-nav-link,
        a.top-nav-link,
        .top-bar a.top-nav-link {
          color: #ffffff !important;
          text-decoration: none !important;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.2s ease;
          padding: 0.25rem 0;
          display: inline-block;
        }

        .top-nav-link:hover,
        .top-bar .top-nav-link:hover,
        a.top-nav-link:hover {
          color: #bb0505 !important;
        }

        .top-nav-link:visited,
        .top-nav-link:focus,
        .top-bar .top-nav-link:visited,
        .top-bar .top-nav-link:focus {
          color: #ffffff !important;
        }

        /* Navbar Social Icons - Higher Specificity */
        .navbar-nav-links .navbar-social-icons {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          margin-left: auto !important;
        }

        .navbar-nav-links .navbar-social-icon {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 28px !important;
          height: 28px !important;
          background: transparent !important;
          color: #ffffff !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
          font-size: 14px !important;
          visibility: visible !important;
        }

        .navbar-nav-links .navbar-social-icon span {
          color: #ffffff !important;
          visibility: visible !important;
        }

        .navbar-nav-links .navbar-social-icon:hover {
          transform: translateY(-2px);
        }

        .navbar-nav-links .navbar-social-icon.facebook-icon:hover {
          color: #1877f2 !important;
        }

        .navbar-nav-links .navbar-social-icon.facebook-icon:hover span {
          color: #1877f2 !important;
        }

        .navbar-nav-links .navbar-social-icon.instagram-icon:hover {
          color: #e4405f !important;
        }

        .navbar-nav-links .navbar-social-icon.instagram-icon:hover span {
          color: #e4405f !important;
        }

        .navbar-nav-links .navbar-social-icon.linkedin-icon:hover {
          color: #0077b5 !important;
        }

        .navbar-nav-links .navbar-social-icon.linkedin-icon:hover span {
          color: #0077b5 !important;
        }

        .navbar-nav-links .navbar-social-icon.youtube-icon:hover {
          color: #ff0000 !important;
        }

        .navbar-nav-links .navbar-social-icon.youtube-icon:hover span {
          color: #ff0000 !important;
        }
        .navbar-social-icons {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          margin-left: auto !important;
        }

        .navbar-social-icon {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 28px !important;
          height: 28px !important;
          background: transparent !important;
          color: #ffffff !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
          font-size: 14px !important;
          visibility: visible !important;
        }

        .navbar-social-icon span {
          color: #ffffff !important;
          visibility: visible !important;
        }

        .navbar-social-icon:hover {
          transform: translateY(-2px);
        }

        .navbar-social-icon.facebook-icon:hover {
          color: #1877f2 !important;
        }

        .navbar-social-icon.facebook-icon:hover span {
          color: #1877f2 !important;
        }

        .navbar-social-icon.instagram-icon:hover {
          color: #e4405f !important;
        }

        .navbar-social-icon.instagram-icon:hover span {
          color: #e4405f !important;
        }

        .navbar-social-icon.linkedin-icon:hover {
          color: #0077b5 !important;
        }

        .navbar-social-icon.linkedin-icon:hover span {
          color: #0077b5 !important;
        }

        .navbar-social-icon.youtube-icon:hover {
          color: #ff0000 !important;
        }

        .navbar-social-icon.youtube-icon:hover span {
          color: #ff0000 !important;
        }

        /* Responsive Navbar Social Icons */
        @media (max-width: 768px) {
          .navbar-social-icons {
            gap: 0.75rem !important;
          }

          .navbar-social-icon {
            width: 24px !important;
            height: 24px !important;
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-social-icons {
            gap: 0.5rem !important;
          }

          .navbar-social-icon {
            width: 20px !important;
            height: 20px !important;
            font-size: 11px !important;
          }
        }
        @media (max-width: 768px) {
          .top-bar-inner {
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.75rem 1.5rem;
          }

          .social-icons {
            order: 2;
          }

          .top-nav-links {
            order: 1;
            gap: 1.5rem;
          }

          .social-icon {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .top-nav-link,
          .top-bar .top-nav-link,
          .top-bar .container .top-bar-inner .top-nav-links .top-nav-link,
          a.top-nav-link {
            font-size: 13px;
            color: #ffffff !important;
          }
        }

        @media (max-width: 480px) {
          .top-bar-inner {
            padding: 0.5rem 1rem;
          }

          .social-icons {
            gap: 0.75rem;
          }

          .top-nav-links {
            gap: 1rem;
          }

          .social-icon {
            width: 24px;
            height: 24px;
            font-size: 11px;
          }

          .top-nav-link,
          .top-bar .top-nav-link,
          .top-bar .container .top-bar-inner .top-nav-links .top-nav-link,
          a.top-nav-link {
            font-size: 12px;
            color: #ffffff !important;
          }
        }

      `}</style>
    </>
  );
};

export default HeaderOne;
