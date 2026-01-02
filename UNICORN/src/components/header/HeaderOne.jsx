import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { client } from "../../client";
import NavbarLogo from "../../assest/1766492936158.png";
 
import SocialLink from "../../data/social/SocialLink.json";

const HeaderOne = () => {
 


  // Header Search
  const [searchshow, setSearchShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [industriesOpen, setIndustriesOpen] = useState(false);

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
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".nav-dropdown")) return;
      setIndustriesOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
    
    if (query.trim().length > 0) {
      // Global search through entire website content
      const searchTerm = query.toLowerCase();
      const results = [];

      // Global search function that works across all pages
      const performGlobalSearch = (searchTerm) => {
        // Search in all headings across the website
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
          if (heading.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'heading',
              element: heading,
              text: heading.textContent,
              id: `heading-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in all paragraphs
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach((paragraph, index) => {
          if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'paragraph',
              element: paragraph,
              text: paragraph.textContent.substring(0, 100) + '...',
              id: `paragraph-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in all links
        const links = document.querySelectorAll('a');
        links.forEach((link, index) => {
          if (link.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'link',
              element: link,
              text: link.textContent,
              href: link.href,
              id: `link-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in all images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
          const altText = img.alt || '';
          const title = img.title || '';
          if (altText.toLowerCase().includes(searchTerm) || title.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'image',
              element: img,
              text: altText || title || 'Image content',
              id: `image-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in all content areas
        const contentAreas = document.querySelectorAll('.content, .post-content, .article-content, .magazine-content, .blog-content, .page-content');
        contentAreas.forEach((area, index) => {
          if (area.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'content',
              element: area,
              text: area.textContent.substring(0, 100) + '...',
              id: `content-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in all text elements
        const textElements = document.querySelectorAll('span, div, strong, em, li, td, th');
        textElements.forEach((element, index) => {
          if (element.textContent.toLowerCase().includes(searchTerm) && 
              element.textContent.trim().length > 0 && 
              element.textContent.trim().length < 150) {
            results.push({
              type: 'text',
              element: element,
              text: element.textContent.trim(),
              id: `text-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in navigation and menu items
        const navItems = document.querySelectorAll('nav a, .nav-link, .menu-item, .navbar-nav a');
        navItems.forEach((item, index) => {
          if (item.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'navigation',
              element: item,
              text: item.textContent,
              href: item.href,
              id: `nav-${index}`,
              page: getCurrentPageName()
            });
          }
        });

        // Search in buttons and interactive elements
        const buttons = document.querySelectorAll('button, .btn, .button');
        buttons.forEach((button, index) => {
          if (button.textContent.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'button',
              element: button,
              text: button.textContent,
              id: `button-${index}`,
              page: getCurrentPageName()
            });
          }
        });
      };

      // Get current page name for context
      const getCurrentPageName = () => {
        const path = window.location.pathname;
        if (path === '/') return 'Home';
        if (path === '/magazines') return 'Magazines';
        if (path === '/blogs') return 'Blogs';
        if (path === '/about-us') return 'About Us';
        if (path === '/contact') return 'Contact';
        if (path === '/advertise-with-us') return 'Advertise';
        return 'Page';
      };

      // Perform global search
      performGlobalSearch(searchTerm);

      // Enhanced search in magazine cards and carousel items
      const magazineCards = document.querySelectorAll('.magazine-card, .carousel-item, .post-container, .carousel-track .carousel-item, [class*="magazine"], [class*="post"]');
      magazineCards.forEach((card, index) => {
        if (card.textContent.toLowerCase().includes(searchTerm)) {
          // Extract magazine title or person name
          const titleElement = card.querySelector('h1, h2, h3, h4, h5, h6, .title, .magazine-title, .post-title');
          const imageElement = card.querySelector('img');
          const magazineTitle = titleElement ? titleElement.textContent.trim() : 
                               card.textContent.trim().split('\n')[0] || 
                               card.textContent.trim().substring(0, 50);
          
          results.push({
            type: 'magazine',
            element: card,
            text: magazineTitle,
            id: `magazine-${index}`,
            page: getCurrentPageName(),
            hasImage: !!imageElement,
            imageSrc: imageElement ? imageElement.src : null,
            imageAlt: imageElement ? imageElement.alt : null
          });
        }
      });

      // Search specifically in magazine hero carousel
      const heroCarousel = document.querySelectorAll('.carousel-track .carousel-item, .magazine-card');
      heroCarousel.forEach((item, index) => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
          const personName = item.textContent.trim().split('\n')[0] || item.textContent.trim().substring(0, 50);
          results.push({
            type: 'hero-magazine',
            element: item,
            text: personName,
            id: `hero-magazine-${index}`
          });
        }
      });

      // Search in image alt text and titles
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        const altText = img.alt || '';
        const title = img.title || '';
        if (altText.toLowerCase().includes(searchTerm) || title.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'image',
            element: img,
            text: altText || title || 'Image content',
            id: `image-${index}`
          });
        }
      });

      // Search in specific content areas
      const contentAreas = document.querySelectorAll('.content, .post-content, .article-content, .magazine-content');
      contentAreas.forEach((area, index) => {
        if (area.textContent.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'content',
            element: area,
            text: area.textContent.substring(0, 80) + '...',
            id: `content-${index}`
          });
        }
      });

      // Search in spans and divs for person names
      const textElements = document.querySelectorAll('span, div, strong, em');
      textElements.forEach((element, index) => {
        if (element.textContent.toLowerCase().includes(searchTerm) && 
            element.textContent.trim().length > 0 && 
            element.textContent.trim().length < 100) {
          results.push({
            type: 'text',
            element: element,
            text: element.textContent.trim(),
            id: `text-${index}`
          });
        }
      });

      // Search ALL magazine people from the carousel data
      const allMagazinePeople = [
        'Anchel Gupta', 'Jorden', 'Manuel', 'Suzanne', 'Nilmini', 
        'Shabnam', 'Valenia', 'Ross', 'Khalid'
      ];
      
      // Always show ALL magazine people that match the search
      allMagazinePeople.forEach((person, index) => {
        if (person.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'magazine-person',
            element: null,
            text: person,
            id: `magazine-person-${index}`,
            description: getPersonDescription(person)
          });
        }
      });

      // Search for client magazines - look for magazine content related to the search term
      const searchForClientMagazines = (searchTerm) => {
        // Look for magazine cards and carousel items that contain the search term
        const magazineElements = document.querySelectorAll('.magazine-card, .carousel-item, .post-container, .carousel-track .carousel-item');
        
        magazineElements.forEach((element, index) => {
          const elementText = element.textContent.toLowerCase();
          const elementHTML = element.innerHTML.toLowerCase();
          
          // Check if the search term appears in the magazine content
          if (elementText.includes(searchTerm) || elementHTML.includes(searchTerm)) {
            // Extract the magazine title/name
            const titleElement = element.querySelector('h1, h2, h3, h4, h5, h6, .title, .magazine-title');
            const magazineTitle = titleElement ? titleElement.textContent.trim() : elementText.substring(0, 50);
            
            results.push({
              type: 'client-magazine',
              element: element,
              text: magazineTitle,
              id: `client-magazine-${index}`,
              description: 'Client Magazine'
            });
          }
        });

        // Also search in image alt text for magazine names
        const magazineImages = document.querySelectorAll('img[alt*="' + searchTerm + '"], img[title*="' + searchTerm + '"]');
        magazineImages.forEach((img, index) => {
          const altText = img.alt || img.title || '';
          if (altText.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'client-magazine',
              element: img,
              text: altText,
              id: `client-magazine-img-${index}`,
              description: 'Client Magazine Image'
            });
          }
        });
      };

      // Search for client magazines
      searchForClientMagazines(searchTerm);

      // Enhanced search for magazines page specifically
      const searchMagazinesPage = (searchTerm) => {
        // Look for magazine grid items and post containers
        const magazineGridItems = document.querySelectorAll('[style*="grid"], .post-container, [class*="magazine"], [class*="post"]');
        
        magazineGridItems.forEach((item, index) => {
          if (item.textContent.toLowerCase().includes(searchTerm)) {
            const imageElement = item.querySelector('img');
            const titleElement = item.querySelector('h1, h2, h3, h4, h5, h6, .title');
            
            results.push({
              type: 'magazine-grid',
              element: item,
              text: titleElement ? titleElement.textContent.trim() : item.textContent.trim().substring(0, 50),
              id: `magazine-grid-${index}`,
              page: getCurrentPageName(),
              hasImage: !!imageElement,
              imageSrc: imageElement ? imageElement.src : null,
              imageAlt: imageElement ? imageElement.alt : null
            });
          }
        });

        // Search in magazine images specifically
        const magazineImages = document.querySelectorAll('img[src*="magazine"], img[alt*="magazine"], img[src*="magzine"]');
        magazineImages.forEach((img, index) => {
          if (img.alt && img.alt.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'magazine-image',
              element: img,
              text: img.alt,
              id: `magazine-img-${index}`,
              page: getCurrentPageName(),
              hasImage: true,
              imageSrc: img.src,
              imageAlt: img.alt
            });
          }
        });
      };

      // Search magazines page content
      searchMagazinesPage(searchTerm);

      // Enhanced search for magazine content - search in all magazine-related elements
      const searchMagazineContent = (searchTerm) => {
        // Search in all elements that might contain magazine information
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach((element, index) => {
          if (element.textContent && 
              element.textContent.toLowerCase().includes(searchTerm) && 
              element.textContent.trim().length > 0 && 
              element.textContent.trim().length < 200) {
            
            // Check if it's magazine-related content
            const isMagazineContent = element.closest('.magazine-card, .carousel-item, .post-container, .carousel-track, .magazine-hero, .carousel-container, .magazine-content, .magazine-section');
            
            if (isMagazineContent) {
              results.push({
                type: 'client-magazine',
                element: element,
                text: element.textContent.trim(),
                id: `magazine-content-${Date.now()}-${index}`,
                description: 'Magazine Content'
              });
            }
          }
        });
      };

      // Search magazine content
      searchMagazineContent(searchTerm);

      // Direct search for magazine titles in the DOM
      const magazineTitles = document.querySelectorAll('[title*="' + searchTerm + '"], [alt*="' + searchTerm + '"]');
      magazineTitles.forEach((element, index) => {
        const title = element.title || element.alt || '';
        if (title.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'magazine',
            element: element,
            text: title,
            id: `magazine-title-${index}`
          });
        }
      });

      // Search in all text nodes for magazine people
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(searchTerm)) {
          const parent = node.parentNode;
          if (parent && parent.textContent.trim().length < 100) {
            // Check if it's in a magazine-related container
            const isInMagazine = parent.closest('.carousel-item, .magazine-card, .carousel-track, .magazine-hero, .carousel-container');
            if (isInMagazine) {
              results.push({
                type: 'magazine',
                element: parent,
                text: parent.textContent.trim(),
                id: `magazine-text-${Date.now()}-${index}`
              });
            }
          }
        }
      }

      // Enhanced search for magazine content - look for any text containing the search term
      const allElements = document.querySelectorAll('*');
      allElements.forEach((element, index) => {
        if (element.textContent && 
            element.textContent.toLowerCase().includes(searchTerm) && 
            element.textContent.trim().length > 0 && 
            element.textContent.trim().length < 200 &&
            !element.querySelector('*')) { // Only leaf nodes to avoid duplicates
          
          // Check if it's magazine-related content
          const isMagazineContent = element.closest('.carousel-item, .magazine-card, .carousel-track, .magazine-hero');
          
          if (isMagazineContent) {
            results.push({
              type: 'magazine',
              element: element,
              text: element.textContent.trim(),
              id: `magazine-content-${index}`
            });
          }
        }
      });

      // Search in home page specific sections
      const homePageSections = document.querySelectorAll('.hero-section, .magazine-hero, .slider-section, .magazines-section');
      homePageSections.forEach((section, index) => {
        if (section.textContent.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'home-page',
            element: section,
            text: section.textContent.substring(0, 80) + '...',
            id: `home-page-${index}`
          });
        }
      });

      // If no results found, try a more lenient search
      if (results.length === 0) {
        // Try searching for partial matches
        const partialMatches = [];
        
        // Search for partial matches in all text content
        const allTextElements = document.querySelectorAll('*');
        allTextElements.forEach((element, index) => {
          if (element.textContent && 
              element.textContent.toLowerCase().includes(searchTerm.substring(0, 3)) && 
              element.textContent.trim().length > 0 && 
              element.textContent.trim().length < 200) {
            partialMatches.push({
              type: 'partial-match',
              element: element,
              text: element.textContent.trim().substring(0, 50) + '...',
              id: `partial-${index}`,
              page: getCurrentPageName()
            });
          }
        });
        
        // If still no results, add some default suggestions
        if (partialMatches.length === 0) {
          const defaultSuggestions = [
            { type: 'suggestion', text: 'Try searching for "Anchel" or "Jorden"', id: 'suggestion-1' },
            { type: 'suggestion', text: 'Search for "Home" or "About" pages', id: 'suggestion-2' },
            { type: 'suggestion', text: 'Look for magazine content', id: 'suggestion-3' }
          ];
          results.push(...defaultSuggestions);
        } else {
          results.push(...partialMatches.slice(0, 5));
        }
      }

      // Remove duplicates and sort by relevance
      const uniqueResults = results.filter((result, index, self) => 
        index === self.findIndex(r => r.text === result.text)
      );

      // Sort by type priority: magazine-person > client-magazine > magazine-grid > magazine-image > hero-magazine > heading > magazine > home-page > content > paragraph > text > link > image > partial-match > suggestion
      const typePriority = {
        'magazine-person': 1,
        'client-magazine': 2,
        'magazine-grid': 3,
        'magazine-image': 4,
        'hero-magazine': 5,
        'heading': 6,
        'magazine': 7,
        'home-page': 8,
        'content': 9,
        'paragraph': 10,
        'text': 11,
        'link': 12,
        'image': 13,
        'partial-match': 14,
        'suggestion': 15
      };

      uniqueResults.sort((a, b) => {
        const aPriority = typePriority[a.type] || 8;
        const bPriority = typePriority[b.type] || 8;
        return aPriority - bPriority;
      });

      // Debug: Log what we found
      console.log('Search term:', searchTerm);
      console.log('All results found:', results);
      console.log('Unique results:', uniqueResults);

      setSearchResults(uniqueResults.slice(0, 8)); // Show up to 8 results
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
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
      <header className="page-header sticky-top">
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
            </div>
          </div>
        </div>
        <nav className="navbar bg-black">
          <div className="container">
            <div className="navbar-inner">
              <div className="brand-logo-container">
                <Link href="/">
                  <Image
                    src={NavbarLogo}
                    alt="chronicles-logo"
                    width={300}
                    height={90}
                    style={{ objectFit: "contain", transform: "translateY(-0.5px) scale(1.35)", transformOrigin: "left center" }}
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
                    aria-expanded={industriesOpen}
                    onClick={() => {
                      setIndustriesOpen((v) => !v);
                    }}
                  >
                    Industries
                  </button>
                  <div className={`nav-dropdown-menu ${industriesOpen ? "is-open" : ""}`.trim()}>
                    <Link
                      href="/industries/healthcare"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setIndustriesOpen(false);
                      }}
                    >
                      Healthcare
                    </Link>
                    <Link
                      href="/industries/legal"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setIndustriesOpen(false);
                      }}
                    >
                      Legal
                    </Link>

                    <Link
                      href="/industries/tech-ai"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setIndustriesOpen(false);
                      }}
                    >
                      Tech/AI
                    </Link>

                    <Link
                      href="/industries/manufacturing-products"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setIndustriesOpen(false);
                      }}
                    >
                      Manufacturing/Products
                    </Link>
                    <Link
                      href="/industries/transportation"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setIndustriesOpen(false);
                      }}
                    >
                      Transportation
                    </Link>
                  </div>
                </div>
                <span className="nav-link nav-link--disabled" aria-disabled="true">Media Kit</span>
                <span className="nav-link nav-link--disabled" aria-disabled="true">Podcast</span>
                {/* <Link href="/about-us" className="nav-link">About Us</Link> */}
                <Link href="/contact" className="nav-link">Contact</Link>
                <Link href="/advertise-with-us" className="nav-link">Advertise</Link>
              </div>

              {/* Search and Mobile Menu */}
              <div className="navbar-extra-features">
                <form
                  onSubmit={handleSearch}
                  className={`navbar-search ${
                    searchshow ? "show-nav-search" : ""
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
              <div className="mobile-nav-group">
                <div className="mobile-nav-group-title">Industries</div>
                <Link href="/industries/healthcare" className="mobile-nav-link" onClick={closeMobileMenu}>Healthcare</Link>
                <Link href="/industries/legal" className="mobile-nav-link" onClick={closeMobileMenu}>Legal</Link>
                <Link href="/industries/tech-ai" className="mobile-nav-link" onClick={closeMobileMenu}>Tech/AI</Link>
                <Link href="/industries/manufacturing-products" className="mobile-nav-link" onClick={closeMobileMenu}>Manufacturing/Products</Link>
                <Link href="/industries/transportation" className="mobile-nav-link" onClick={closeMobileMenu}>Transportation</Link>
              </div>
              <span className="mobile-nav-link mobile-nav-link--disabled" aria-disabled="true">Media Kit</span>
              <span className="mobile-nav-link mobile-nav-link--disabled" aria-disabled="true">Podcast</span>
              {/* <Link href="/about-us" className="mobile-nav-link" onClick={closeMobileMenu}>About Us</Link> */}
              <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
              <Link href="/advertise-with-us" className="mobile-nav-link" onClick={closeMobileMenu}>Advertise With Us</Link>
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
        .navbar {
          background-color: #000 !important;
          border-bottom: 1px solid #333;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .brand-logo-container {
          flex-shrink: 0;
          margin-left: 0;
          padding-left: 0;
        }

        .navbar-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: flex-end;
          margin-right: 20px;
        }

        .navbar-nav-links .nav-link {
          color: #fff !important;
          font-size: 14px !important;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 10px 8px;
          display: block;
          position: relative;
        }

        .navbar-nav-links .nav-link:hover {
          color: #D4AF37 !important;
          text-decoration: none;
        }

        .nav-link--disabled {
          opacity: 0.45;
          cursor: not-allowed;
          pointer-events: none;
        }

        .nav-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-dropdown-toggle {
          user-select: none;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 180px;
          background: #000;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 8px;
          display: none;
          flex-direction: column;
          z-index: 2000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .nav-dropdown-menu.is-open {
          display: flex;
        }

        .nav-submenu {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .nav-submenu-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-submenu-arrow {
          opacity: 0.9;
          margin-left: 10px;
        }

        .nav-submenu-menu {
          position: absolute;
          top: 0;
          left: calc(100% + 8px);
          min-width: 200px;
          background: #000;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 8px;
          display: none;
          flex-direction: column;
          z-index: 2100;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .nav-submenu-menu.is-open {
          display: flex;
        }

        .nav-dropdown-item {
          color: #fff !important;
          font-size: 14px !important;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-dropdown-item:hover {
          color: #D4AF37 !important;
          background: rgba(212, 175, 55, 0.08);
          text-decoration: none;
        }

        .navbar-extra-features {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
        }

        .navbar-extra-features button {
          color: #fff !important;
        }

        .navbar-extra-features button:hover,
        .navbar .nav-search-field-toggler:hover {
          color: #D4AF37 !important;
        }

        .navbar .navbar-search-field {
          background-color: #000 !important;
          background: #000 !important;
          color: #fff !important;
          border: 1px solid #333 !important;
        }

        .navbar .navbar-search-field:focus {
          background-color: #000 !important;
          background: #000 !important;
          color: #fff !important;
          border: 1px solid #333 !important;
          outline: none !important;
        }

        .navbar .navbar-search-field::placeholder {
          color: #999 !important;
        }

        .navbar .navbar-search-field::-webkit-input-placeholder {
          color: #999 !important;
        }

        .navbar .navbar-search-field::-moz-placeholder {
          color: #999 !important;
        }

        .navbar .navbar-search-field:-ms-input-placeholder {
          color: #999 !important;
        }

        .navbar .navbar-search-btn {
          color: #fff !important;
        }

        .navbar .navbar-search-btn:hover {
          color: #D4AF37 !important;
        }

        /* Search Suggestions Dropdown */
        .search-suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #000;
          border: 1px solid #333;
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
          border-bottom: 1px solid #333;
        }

        .search-suggestions-header h4 {
          color: #fff;
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
          border-bottom: 1px solid #222;
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
          background: #333;
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
          background-color: #111;
          transform: translateX(5px);
        }

        .search-suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-type {
          color: #D4AF37;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Different colors for different content types */
        .search-suggestion-item[data-type="heading"] .suggestion-type {
          color: #FFD700;
        }

        .search-suggestion-item[data-type="magazine"] .suggestion-type {
          color: #FF6B35;
        }

        .search-suggestion-item[data-type="content"] .suggestion-type {
          color: #4ECDC4;
        }

        .search-suggestion-item[data-type="text"] .suggestion-type {
          color: #45B7D1;
        }

        .search-suggestion-item[data-type="image"] .suggestion-type {
          color: #96CEB4;
        }

        .search-suggestion-item[data-type="magazine-person"] .suggestion-type {
          color: #FFD700;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="hero-magazine"] .suggestion-type {
          color: #FF6B35;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="home-page"] .suggestion-type {
          color: #9B59B6;
        }

        .search-suggestion-item[data-type="client-magazine"] .suggestion-type {
          color: #E74C3C;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="navigation"] .suggestion-type {
          color: #9B59B6;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="button"] .suggestion-type {
          color: #F39C12;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="magazine-grid"] .suggestion-type {
          color: #E67E22;
          font-weight: bold;
        }

        .search-suggestion-item[data-type="magazine-image"] .suggestion-type {
          color: #8E44AD;
          font-weight: bold;
        }

        .suggestion-text {
          color: #fff;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 500;
        }

        .suggestion-link {
          margin-top: 2px;
        }

        .suggestion-link span {
          color: #999;
          font-size: 11px;
          text-decoration: none;
        }

        .suggestion-description {
          margin-top: 2px;
        }

        .suggestion-description span {
          color: #D4AF37;
          font-size: 12px;
          font-style: italic;
        }

        .suggestion-page {
          margin-top: 2px;
        }

        .suggestion-page span {
          color: #4ECDC4;
          font-size: 11px;
          font-weight: 500;
        }

        .no-suggestions {
          padding: 20px;
          text-align: center;
        }

        .no-suggestions p {
          color: #999;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        
        .search-tips {
          margin-top: 15px;
          padding: 10px;
          background: #111;
          border-radius: 5px;
          border: 1px solid #333;
        }
        
        .search-tips p {
          color: #D4AF37;
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
          color: #ccc;
          font-size: 11px;
          margin: 4px 0;
          padding-left: 5px;
        }

        /* Search Highlight */
        .search-highlight {
          background-color: #D4AF37;
          color: #000;
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
          background: #fff;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
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
          background: #000;
          border-top: 1px solid #333;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-menu-content {
          padding: 20px 0;
        }
        
        .mobile-nav-link {
          display: block;
          padding: 15px 20px;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid #222;
          transition: all 0.3s ease;
        }
        
        .mobile-nav-link:hover {
          background: #111;
          color: #D4AF37;
          padding-left: 30px;
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .navbar-nav-links.desktop-nav {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: block;
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

      `}</style>
    </>
  );
};

export default HeaderOne;
